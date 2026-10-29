import { useEffect } from 'react';
import { SITE } from './siteConfig.ts';
import { absoluteUrl } from './siteConfig.ts';
import { seoForPathname } from './routes.ts';

const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const setCanonical = (href: string) => {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
};

/**
 * The pre-rendered <head> is correct for the first page a visitor lands on, but a
 * client-side navigation never reloads the document. This keeps the title,
 * description, canonical and OG tags in step with the current route.
 */
export const useDocumentMeta = (pathname: string): void => {
  useEffect(() => {
    const seo = seoForPathname(pathname);
    if (!seo) {
      document.title = `${SITE.name} — ${SITE.tagline}`;
      return;
    }

    const url = absoluteUrl(seo.path);
    const image = absoluteUrl(seo.image);

    document.title = seo.title;
    setMeta('meta[name="description"]', 'name', 'description', seo.description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', seo.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', seo.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[property="og:image"]', 'property', 'og:image', image);
    setMeta('meta[property="og:type"]', 'property', 'og:type', seo.ogType);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', seo.title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', seo.description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image);
    setCanonical(url);
  }, [pathname]);
};
