import { execSync } from 'node:child_process';

/**
 * Infers the most likely scope from staged change files
 */
export function getInferredScope(): string | undefined {
  try {
    // Get a list of staged (to be committed) files
    const output = execSync('git diff --cached --name-only', { encoding: 'utf-8', stdio: 'pipe' });
    const files = output.trim().split('\n').filter(Boolean);

    if (files.length === 0) return undefined;

    const scopeScores: Record<string, number> = {};

    for (const file of files) {
      const parts = file.split('/');
      const fileNameWithExt = parts[parts.length - 1];
      const fileName = fileNameWithExt.split('.')[0];

      if (parts[0] === 'src') {
        if (parts.length === 2) {
          scopeScores[fileName] = (scopeScores[fileName] || 0) + 100;
        } else if (parts.length >= 3) {
          const dirName = parts[1];

          if (dirName === 'utils' || dirName === 'util') {
            scopeScores.utils = (scopeScores.utils || 0) + 10;
          } else {
            scopeScores[fileName] = (scopeScores[fileName] || 0) + 50;

            scopeScores[dirName] = (scopeScores[dirName] || 0) + 30;
          }
        }
      } else {
        scopeScores[fileName] = (scopeScores[fileName] || 0) + 1;
      }
    }

    if (Object.keys(scopeScores).length === 0) return undefined;

    const inferred = Object.keys(scopeScores).reduce((a, b) =>
      scopeScores[a] > scopeScores[b] ? a : b
    );

    return inferred;
  } catch (_err) {
    return undefined;
  }
}
