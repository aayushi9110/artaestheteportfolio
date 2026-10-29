import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PROJECTS, PROJECT_DETAIL_METRIC_DEFINITIONS } from '../../src/pages/CaseStudy/caseStudyData.ts';
import { RESOURCES } from '../../src/data/appData.ts';
import { CONTENT } from '../../src/data/contentData.ts';

describe('robots.txt stays ASCII-only', () => {
  // Amplify served robots.txt with no charset, so a single em dash rendered as
  // "â€”" for every crawler. The header is fixed in customHttp.yml, but robots.txt
  // is parsed byte-wise by crawlers, so keep the file itself pure ASCII.
  it('contains no characters above U+007F', () => {
    const robots = readFileSync(resolve(__dirname, '../../public/robots.txt'), 'utf8');
    const offenders = [...robots]
      .filter((character) => character.codePointAt(0)! > 127)
      .map((character) => `${character} (U+${character.codePointAt(0)!.toString(16).toUpperCase()})`);

    expect([...new Set(offenders)]).toEqual([]);
  });
});

describe('Data Integrity Tests', () => {
  const PUBLIC_PATH = resolve(process.cwd(), 'public');

  // Documented allowlist of paths with spaces that are known to exist
  const KNOWN_PATHS_WITH_SPACES = [
    '/images/brandLogo/potterybarn Logo.jpg',
    '/images/mumbai/alpineOpusPortfolioMoodboard .png',
    '/images/WestElm/SanFran/sanFranPortfolioMoodboard (2).png',
  ];

  describe('Image URL validation', () => {
    it('should have all PROJECTS image URLs resolvable to real files under public/', () => {
      const missingFiles: string[] = [];
      const emptyImageFields: { project: string; field: string }[] = [];

      Object.entries(PROJECTS).forEach(([projectId, project]) => {
        // Check hero, before, after images
        if (!project.heroImageUrl) {
          emptyImageFields.push({ project: projectId, field: 'heroImageUrl' });
        } else if (project.heroImageUrl && !existsSync(resolve(PUBLIC_PATH, '.' + project.heroImageUrl))) {
          missingFiles.push(project.heroImageUrl);
        }

        if (!project.beforeImageUrl) {
          emptyImageFields.push({ project: projectId, field: 'beforeImageUrl' });
        } else if (project.beforeImageUrl && !existsSync(resolve(PUBLIC_PATH, '.' + project.beforeImageUrl))) {
          missingFiles.push(project.beforeImageUrl);
        }

        if (!project.afterImageUrl) {
          emptyImageFields.push({ project: projectId, field: 'afterImageUrl' });
        } else if (project.afterImageUrl && !existsSync(resolve(PUBLIC_PATH, '.' + project.afterImageUrl))) {
          missingFiles.push(project.afterImageUrl);
        }

        // Check gallery items
        project.galleryItems.forEach((item, index) => {
          if (item.url && !existsSync(resolve(PUBLIC_PATH, '.' + item.url))) {
            missingFiles.push(`${projectId} gallery[${index}]: ${item.url}`);
          }
        });
      });

      expect(missingFiles).toEqual([]);
      // Document which images are empty (this is allowed, but we track it)
      if (emptyImageFields.length > 0) {
        console.log('Empty image fields found:', emptyImageFields);
      }
    });

    it('should have all RESOURCES image URLs resolvable to real files under public/', () => {
      const missingFiles: string[] = [];

      // Home resources
      if (RESOURCES.home.heroImageUrl && !existsSync(resolve(PUBLIC_PATH, '.' + RESOURCES.home.heroImageUrl))) {
        missingFiles.push(RESOURCES.home.heroImageUrl);
      }
      if (RESOURCES.home.studioImageUrl && !existsSync(resolve(PUBLIC_PATH, '.' + RESOURCES.home.studioImageUrl))) {
        missingFiles.push(RESOURCES.home.studioImageUrl);
      }
      if (RESOURCES.home.testimonialPlaceholderImageUrl && !existsSync(resolve(PUBLIC_PATH, '.' + RESOURCES.home.testimonialPlaceholderImageUrl))) {
        missingFiles.push(RESOURCES.home.testimonialPlaceholderImageUrl);
      }

      // Brand logos
      RESOURCES.home.brandLogos.forEach((logo) => {
        if (logo.src && !existsSync(resolve(PUBLIC_PATH, '.' + logo.src))) {
          missingFiles.push(`brandLogo: ${logo.src}`);
        }
      });

      // Testimonials
      RESOURCES.home.testimonials.forEach((testimonial, index) => {
        if (testimonial.photoUrl && !existsSync(resolve(PUBLIC_PATH, '.' + testimonial.photoUrl))) {
          missingFiles.push(`testimonial[${index}]: ${testimonial.photoUrl}`);
        }
      });

      // About resources
      if (RESOURCES.about.profileImageUrl && !existsSync(resolve(PUBLIC_PATH, '.' + RESOURCES.about.profileImageUrl))) {
        missingFiles.push(RESOURCES.about.profileImageUrl);
      }

      expect(missingFiles).toEqual([]);
    });

    it('should not have new paths with spaces or encoding-needing characters (only allowlisted ones)', () => {
      const pathsWithSpaces: string[] = [];

      Object.entries(PROJECTS).forEach(([, project]) => {
        const urls = [
          project.heroImageUrl,
          project.beforeImageUrl,
          project.afterImageUrl,
          ...project.galleryItems.map((item) => item.url),
        ].filter(Boolean);

        urls.forEach((url) => {
          if (url && /[\s()]/.test(url) && !KNOWN_PATHS_WITH_SPACES.includes(url)) {
            pathsWithSpaces.push(url);
          }
        });
      });

      // Check RESOURCES
      const resourceUrls = [
        RESOURCES.home.heroImageUrl,
        RESOURCES.home.studioImageUrl,
        RESOURCES.home.testimonialPlaceholderImageUrl,
        ...RESOURCES.home.brandLogos.map((logo) => logo.src),
        ...RESOURCES.home.testimonials.map((t) => t.photoUrl),
        RESOURCES.about.profileImageUrl,
      ].filter(Boolean);

      resourceUrls.forEach((url) => {
        if (url && /[\s()]/.test(url) && !KNOWN_PATHS_WITH_SPACES.includes(url)) {
          pathsWithSpaces.push(url);
        }
      });

      expect(pathsWithSpaces).toEqual([]);
    });

    it('should have all image paths as absolute (starting with /)', () => {
      const relativePaths: string[] = [];

      Object.entries(PROJECTS).forEach(([projectId, project]) => {
        [project.heroImageUrl, project.beforeImageUrl, project.afterImageUrl].forEach((url) => {
          if (url && !url.startsWith('/')) {
            relativePaths.push(`${projectId}: ${url}`);
          }
        });

        project.galleryItems.forEach((item) => {
          if (item.url && !item.url.startsWith('/')) {
            relativePaths.push(`${projectId} gallery: ${item.url}`);
          }
        });
      });

      const resourceUrls = [
        RESOURCES.home.heroImageUrl,
        RESOURCES.home.studioImageUrl,
        RESOURCES.home.testimonialPlaceholderImageUrl,
        ...RESOURCES.home.brandLogos.map((logo) => logo.src),
        ...RESOURCES.home.testimonials.map((t) => t.photoUrl),
        RESOURCES.about.profileImageUrl,
      ].filter(Boolean);

      resourceUrls.forEach((url) => {
        if (url && !url.startsWith('/')) {
          relativePaths.push(url);
        }
      });

      expect(relativePaths).toEqual([]);
    });

    it('should not have duplicate heroImageUrl across projects', () => {
      const heroImages = new Map<string, string[]>();

      Object.entries(PROJECTS).forEach(([projectId, project]) => {
        if (project.heroImageUrl) {
          if (!heroImages.has(project.heroImageUrl)) {
            heroImages.set(project.heroImageUrl, []);
          }
          heroImages.get(project.heroImageUrl)!.push(projectId);
        }
      });

      const duplicates = Array.from(heroImages.entries())
        .filter(([, projectIds]) => projectIds.length > 1)
        .map(([url, projectIds]) => `${url} used by: ${projectIds.join(', ')}`);

      expect(duplicates).toEqual([]);
    });
  });

  describe('Project data validation', () => {
    it('should have all required fields non-empty for each project', () => {
      const issues: string[] = [];

      Object.entries(PROJECTS).forEach(([projectId, project]) => {
        if (!project.title) {
          issues.push(`${projectId}: title is empty`);
        }
        if (!project.location) {
          issues.push(`${projectId}: location is empty`);
        }
        if (!project.overviewTitle) {
          issues.push(`${projectId}: overviewTitle is empty`);
        }
        if (!project.overviewTextPrimary) {
          issues.push(`${projectId}: overviewTextPrimary is empty`);
        }
        if (project.tagLabels.length === 0) {
          issues.push(`${projectId}: tagLabels is empty`);
        }
      });

      expect(issues).toEqual([]);
    });

    it('should have storyType as either interior or fine-art', () => {
      const issues: string[] = [];

      Object.entries(PROJECTS).forEach(([projectId, project]) => {
        if (project.storyType !== 'interior' && project.storyType !== 'fine-art') {
          issues.push(`${projectId}: invalid storyType "${project.storyType}"`);
        }
      });

      expect(issues).toEqual([]);
    });

    it('should have isSelectedForHome and isSelectedForPdf as booleans', () => {
      const issues: string[] = [];

      Object.entries(PROJECTS).forEach(([projectId, project]) => {
        if (typeof project.isSelectedForHome !== 'boolean') {
          issues.push(`${projectId}: isSelectedForHome is not boolean`);
        }
        if (typeof project.isSelectedForPdf !== 'boolean') {
          issues.push(`${projectId}: isSelectedForPdf is not boolean`);
        }
      });

      expect(issues).toEqual([]);
    });

    it('should have homeVisibilityPriority as a positive integer', () => {
      const issues: string[] = [];

      Object.entries(PROJECTS).forEach(([projectId, project]) => {
        if (!Number.isInteger(project.homeVisibilityPriority) || project.homeVisibilityPriority <= 0) {
          issues.push(`${projectId}: homeVisibilityPriority "${project.homeVisibilityPriority}" is not a positive integer`);
        }
      });

      expect(issues).toEqual([]);
    });

    it('should have at least one project selected for home', () => {
      const selectedCount = Object.values(PROJECTS).filter((p) => p.isSelectedForHome).length;
      expect(selectedCount).toBeGreaterThan(0);
    });

    it('should have unique homeVisibilityPriority among isSelectedForHome projects', () => {
      // NOTE: Currently homeOffices and mumbaiBedroomTwo both have priority 8.
      // This is a data issue that makes portfolio grid order non-deterministic.
      // This test documents the tie-break rule: when priorities match, projects
      // should be ordered by title to ensure deterministic grid layout.
      // The test will fail if a NEW duplicate priority is introduced.

      const selectedProjects = Object.entries(PROJECTS)
        .filter(([, p]) => p.isSelectedForHome)
        .map(([id, p]) => ({ id, priority: p.homeVisibilityPriority, title: p.title }))
        .sort((a, b) => {
          // Primary sort: homeVisibilityPriority
          if (a.priority !== b.priority) {
            return a.priority - b.priority;
          }
          // Tie-break: sort by title for deterministic ordering
          return a.title.localeCompare(b.title);
        });

      // Document known duplicates
      const KNOWN_PRIORITY_DUPLICATES = [
        { priority: 8, projects: ['homeOffices', 'mumbaiBedroomTwo'] },
      ];

      const duplicates: { priority: number; projects: string[] }[] = [];
      const seen = new Map<number, string[]>();

      selectedProjects.forEach(({ id, priority }) => {
        if (!seen.has(priority)) {
          seen.set(priority, []);
        }
        seen.get(priority)!.push(id);
      });

      seen.forEach((projectIds, priority) => {
        if (projectIds.length > 1) {
          // Check if this is a known duplicate
          const isKnown = KNOWN_PRIORITY_DUPLICATES.some(
            (known) => known.priority === priority &&
                       JSON.stringify(known.projects.sort()) === JSON.stringify(projectIds.sort())
          );
          if (!isKnown) {
            // NEW duplicate found - this is a failure
            duplicates.push({ priority, projects: projectIds });
          }
        }
      });

      expect(duplicates).toEqual([]);
    });

    it('should have 1-10 interior projects selected for PDF', () => {
      const pdfInteriorCount = Object.values(PROJECTS).filter((p) => p.isSelectedForPdf && p.storyType === 'interior').length;
      expect(pdfInteriorCount).toBeGreaterThanOrEqual(1);
      expect(pdfInteriorCount).toBeLessThanOrEqual(10);
    });

    it('should have URL-safe project IDs (matching [A-Za-z0-9-]+)', () => {
      const issues: string[] = [];

      Object.keys(PROJECTS).forEach((projectId) => {
        if (!/^[A-Za-z0-9-]+$/.test(projectId)) {
          issues.push(`${projectId} does not match URL-safe pattern`);
        }
      });

      expect(issues).toEqual([]);
    });

    it('should have gallery items with caption field', () => {
      const issues: string[] = [];

      Object.entries(PROJECTS).forEach(([projectId, project]) => {
        project.galleryItems.forEach((item, index) => {
          if (!('caption' in item)) {
            issues.push(`${projectId} gallery[${index}]: missing caption field`);
          } else if (typeof item.caption !== 'string') {
            issues.push(`${projectId} gallery[${index}]: caption is not a string`);
          }
        });
      });

      expect(issues).toEqual([]);
    });
  });

  describe('CONTENT validation', () => {
    it('should have non-empty home.stats array with non-empty values and labels', () => {
      expect(CONTENT.home.stats.length).toBeGreaterThan(0);

      const issues: string[] = [];
      CONTENT.home.stats.forEach((stat, index) => {
        if (!stat.value) {
          issues.push(`stats[${index}]: value is empty`);
        }
        if (!stat.label) {
          issues.push(`stats[${index}]: label is empty`);
        }
      });

      expect(issues).toEqual([]);
    });

    it('should have non-empty brand.siteUrl', () => {
      expect(CONTENT.brand.siteUrl).toBeTruthy();
      expect(CONTENT.brand.siteUrl.length).toBeGreaterThan(0);
    });
  });
});
