/**
 * Live smoke test: drives a real Chrome against a running build and fails if any
 * route is blank, throws, logs an error, or 404s an asset.
 *
 * This is the layer that catches "the deploy went out and the site was down".
 *
 *   npm run test:smoke                    # build + preview + check
 *   npm run test:smoke -- --url https://… # check an already-deployed site
 *   npm run test:smoke -- --mobile        # also re-check primary routes at 390x844
 *   npm run test:smoke -- --headed        # watch it happen
 */
import { spawn, type ChildProcess } from 'node:child_process';
import { chromium, type Browser, type Page } from 'playwright-core';
import { ALL_ROUTES, PRIMARY_ROUTES, type RouteCheck } from '../routes.ts';

const argv = process.argv.slice(2);
const flag = (name: string) => argv.includes(`--${name}`);
const value = (name: string) => {
  const index = argv.indexOf(`--${name}`);
  return index >= 0 ? argv[index + 1] : undefined;
};

const PREVIEW_PORT = Number(value('port') ?? 4173);
const EXTERNAL_URL = value('url');
const BASE_URL = (EXTERNAL_URL ?? `http://127.0.0.1:${PREVIEW_PORT}`).replace(/\/$/, '');
const HEADED = flag('headed');
const CHECK_MOBILE = flag('mobile');

/** The splash in App.tsx blocks the router for 2s, so every wait must clear it. */
const SPLASH_MS = 2000;
const MARKER_TIMEOUT_MS = SPLASH_MS + 10_000;

type Failure = { route: string; viewport: string; reason: string };
type Result = { route: string; viewport: string; ok: boolean; ms: number; failures: string[] };

const failures: Failure[] = [];
const results: Result[] = [];

/** Noise we never want to fail a deploy over. */
const IGNORED_CONSOLE = [
  /Download the React DevTools/i,
  /googletagmanager|google-analytics|gtag/i,
  /fonts\.(googleapis|gstatic)\.com/i,
  /favicon\.ico/i,
];
const isIgnorable = (text: string) => IGNORED_CONSOLE.some((pattern) => pattern.test(text));

async function startPreviewServer(): Promise<ChildProcess> {
  process.stdout.write(`• starting vite preview on :${PREVIEW_PORT}\n`);
  const child = spawn(
    'npx',
    ['vite', 'preview', '--host', '127.0.0.1', '--port', String(PREVIEW_PORT), '--strictPort'],
    { stdio: ['ignore', 'pipe', 'pipe'] }
  );

  await new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('vite preview did not start within 30s')), 30_000);
    const onData = (chunk: Buffer) => {
      if (chunk.toString().includes(String(PREVIEW_PORT))) {
        clearTimeout(timer);
        resolve();
      }
    };
    child.stdout?.on('data', onData);
    child.stderr?.on('data', onData);
    child.on('exit', (code) => {
      clearTimeout(timer);
      reject(new Error(`vite preview exited early with code ${code}`));
    });
  });

  return child;
}

async function checkRoute(page: Page, route: RouteCheck, viewport: string): Promise<void> {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const badResponses: string[] = [];
  const routeFailures: string[] = [];
  const started = Date.now();

  const onConsole = (message: { type: () => string; text: () => string }) => {
    if (message.type() !== 'error') return;
    const text = message.text();
    if (!isIgnorable(text)) consoleErrors.push(text);
  };
  const onPageError = (error: Error) => pageErrors.push(error.message);
  const onResponse = (response: { status: () => number; url: () => string }) => {
    const status = response.status();
    const url = response.url();
    if (status >= 400 && !isIgnorable(url)) badResponses.push(`${status} ${url}`);
  };

  page.on('console', onConsole);
  page.on('pageerror', onPageError);
  page.on('response', onResponse);

  try {
    const response = await page.goto(`${BASE_URL}${route.path}`, {
      waitUntil: 'domcontentloaded',
      timeout: 30_000,
    });

    const status = response?.status() ?? 0;
    if (status >= 400) {
      routeFailures.push(`document returned HTTP ${status}`);
    }

    // The marker proves the route actually rendered rather than white-screening.
    try {
      await page.waitForSelector(route.marker, { state: 'attached', timeout: MARKER_TIMEOUT_MS });
    } catch {
      routeFailures.push(`marker "${route.marker}" never appeared (blank or crashed render)`);
    }

    // Blank-page guard, independent of the marker.
    const rootChildren = await page.evaluate(
      () => document.getElementById('root')?.childElementCount ?? 0
    );
    if (rootChildren === 0) {
      routeFailures.push('#root rendered no children');
    }

    if (route.redirectsTo) {
      const landed = new URL(page.url()).pathname;
      if (landed !== route.redirectsTo) {
        routeFailures.push(`expected redirect to ${route.redirectsTo}, landed on ${landed}`);
      }
    }

    if (route.expectText) {
      const body = (await page.textContent('body')) ?? '';
      if (!body.includes(route.expectText)) {
        routeFailures.push(`copy "${route.expectText}" missing from page`);
      }
    }

    // App shell: present everywhere except the deliberately bare PDF route.
    const shell = await page.evaluate(() => ({
      header: Boolean(document.querySelector('header, .hdr, nav')),
      footer: Boolean(document.querySelector('footer')),
    }));
    if (route.bareShell) {
      if (shell.footer) routeFailures.push('bare route unexpectedly rendered the site footer');
    } else {
      if (!shell.header) routeFailures.push('site header missing');
      if (!shell.footer) routeFailures.push('site footer missing');
    }

    // Broken <img> detection — a renamed file under public/images shows up here.
    const brokenImages: string[] = await page.evaluate(() =>
      Array.from(document.images)
        .filter((img) => img.currentSrc && img.complete && img.naturalWidth === 0)
        .map((img) => img.currentSrc)
        .slice(0, 5)
    );
    for (const src of brokenImages) {
      routeFailures.push(`image failed to load: ${src}`);
    }

    for (const error of pageErrors) routeFailures.push(`uncaught error: ${error}`);
    for (const error of consoleErrors) routeFailures.push(`console error: ${error}`);
    for (const bad of [...new Set(badResponses)]) routeFailures.push(`request failed: ${bad}`);
  } catch (error) {
    routeFailures.push(`navigation threw: ${(error as Error).message}`);
  } finally {
    page.off('console', onConsole);
    page.off('pageerror', onPageError);
    page.off('response', onResponse);
  }

  const ms = Date.now() - started;
  results.push({ route: route.path, viewport, ok: routeFailures.length === 0, ms, failures: routeFailures });
  for (const reason of routeFailures) {
    failures.push({ route: `${route.name} (${route.path})`, viewport, reason });
  }

  const mark = routeFailures.length === 0 ? '✓' : '✗';
  process.stdout.write(`  ${mark} ${route.path.padEnd(42)} ${viewport.padEnd(8)} ${ms}ms\n`);
}

async function run(): Promise<void> {
  let preview: ChildProcess | undefined;
  let browser: Browser | undefined;

  try {
    if (!EXTERNAL_URL) {
      preview = await startPreviewServer();
    }

    process.stdout.write(`\n  Smoke test → ${BASE_URL}\n\n`);
    browser = await chromium.launch({ channel: 'chrome', headless: !HEADED });

    const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const desktopPage = await desktop.newPage();
    for (const route of ALL_ROUTES) {
      await checkRoute(desktopPage, route, 'desktop');
    }
    await desktop.close();

    if (CHECK_MOBILE) {
      process.stdout.write('\n');
      const mobile = await browser.newContext({
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 3,
      });
      const mobilePage = await mobile.newPage();
      for (const route of PRIMARY_ROUTES) {
        await checkRoute(mobilePage, route, 'mobile');
      }
      await mobile.close();
    }
  } finally {
    await browser?.close();
    preview?.kill('SIGTERM');
  }

  const passed = results.filter((result) => result.ok).length;
  process.stdout.write(`\n  ${passed}/${results.length} checks passed\n`);

  if (failures.length > 0) {
    process.stdout.write('\n  FAILURES\n');
    for (const failure of failures) {
      process.stdout.write(`  ✗ ${failure.route} [${failure.viewport}]\n      ${failure.reason}\n`);
    }
    process.stdout.write('\n  DO NOT DEPLOY.\n\n');
    process.exitCode = 1;
    return;
  }

  process.stdout.write('\n  All routes render, no console errors, no broken assets.\n\n');
}

run().catch((error) => {
  process.stderr.write(`\nSmoke test crashed: ${(error as Error).stack}\n`);
  process.exitCode = 1;
});
