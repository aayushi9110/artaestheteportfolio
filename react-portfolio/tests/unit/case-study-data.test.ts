import { PROJECTS, PROJECT_DETAIL_METRICS, PROJECT_DETAIL_METRIC_DEFINITIONS } from '../../src/pages/CaseStudy/caseStudyData.ts';

describe('Case Study Data Validation', () => {
  describe('PROJECT_DETAIL_METRICS structure', () => {
    it('should have an entry for every key in PROJECTS', () => {
      const projectIds = Object.keys(PROJECTS);
      const metricsIds = Object.keys(PROJECT_DETAIL_METRICS);

      const missing = projectIds.filter((id) => !metricsIds.includes(id));
      const extra = metricsIds.filter((id) => !projectIds.includes(id));

      if (missing.length > 0) {
        console.error('Missing PROJECT_DETAIL_METRICS entries for:', missing);
      }
      if (extra.length > 0) {
        console.error('Extra PROJECT_DETAIL_METRICS entries:', extra);
      }

      expect(missing).toEqual([]);
      expect(extra).toEqual([]);
    });

    it('should map projects without detailMetrics to empty array (not undefined)', () => {
      const issues: string[] = [];

      Object.entries(PROJECT_DETAIL_METRICS).forEach(([projectId, metrics]) => {
        if (!Array.isArray(metrics)) {
          issues.push(`${projectId}: metrics is not an array`);
        } else if (metrics === undefined) {
          issues.push(`${projectId}: metrics is undefined`);
        }
      });

      expect(issues).toEqual([]);
    });

    it('should have valid metric entries with non-empty label and string value (value may be empty string)', () => {
      const issues: string[] = [];

      Object.entries(PROJECT_DETAIL_METRICS).forEach(([projectId, metrics]) => {
        metrics.forEach((metric, index) => {
          if (!metric.label) {
            issues.push(`${projectId} metric[${index}]: label is empty`);
          }
          if (typeof metric.label !== 'string') {
            issues.push(`${projectId} metric[${index}]: label is not a string`);
          }
          // Value can be empty string (as seen with Floor Area in some projects)
          if (typeof metric.value !== 'string') {
            issues.push(`${projectId} metric[${index}]: value is not a string`);
          }
        });
      });

      expect(issues).toEqual([]);
    });
  });

  describe('PROJECT_DETAIL_METRIC_DEFINITIONS structure', () => {
    it('should have non-empty outputLabel, aliases array, and fallbackValue for each definition', () => {
      const issues: string[] = [];

      PROJECT_DETAIL_METRIC_DEFINITIONS.forEach((def, index) => {
        if (!def.outputLabel) {
          issues.push(`definition[${index}]: outputLabel is empty`);
        }
        if (typeof def.outputLabel !== 'string') {
          issues.push(`definition[${index}]: outputLabel is not a string`);
        }

        if (!Array.isArray(def.aliases)) {
          issues.push(`definition[${index}] (${def.outputLabel}): aliases is not an array`);
        } else if (def.aliases.length === 0) {
          issues.push(`definition[${index}] (${def.outputLabel}): aliases is empty`);
        } else {
          def.aliases.forEach((alias, aliasIndex) => {
            if (typeof alias !== 'string') {
              issues.push(`definition[${index}] (${def.outputLabel}) alias[${aliasIndex}]: not a string`);
            } else if (!alias) {
              issues.push(`definition[${index}] (${def.outputLabel}) alias[${aliasIndex}]: empty string`);
            }
          });
        }

        if (!def.fallbackValue) {
          issues.push(`definition[${index}] (${def.outputLabel}): fallbackValue is empty`);
        }
        if (typeof def.fallbackValue !== 'string') {
          issues.push(`definition[${index}] (${def.outputLabel}): fallbackValue is not a string`);
        }
      });

      expect(issues).toEqual([]);
    });

    it('should have unique outputLabels across all definitions', () => {
      const labels = PROJECT_DETAIL_METRIC_DEFINITIONS.map((def) => def.outputLabel);
      const duplicates = labels.filter((label, index) => labels.indexOf(label) !== index);

      expect(duplicates).toEqual([]);
    });

    it('should have lowercase and unique aliases across all definitions', () => {
      const issues: string[] = [];
      const allAliases = new Map<string, number>();

      PROJECT_DETAIL_METRIC_DEFINITIONS.forEach((def) => {
        def.aliases.forEach((alias) => {
          // Check if lowercase
          if (alias !== alias.toLowerCase()) {
            issues.push(`Alias "${alias}" (in ${def.outputLabel}) is not lowercase`);
          }

          // Check for duplicates
          if (allAliases.has(alias)) {
            issues.push(`Alias "${alias}" is duplicated (in ${def.outputLabel} and another definition)`);
          } else {
            allAliases.set(alias, 1);
          }
        });
      });

      expect(issues).toEqual([]);
    });
  });
});
