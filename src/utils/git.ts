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

/**
 * Retrieves the most recent Git commits
 * @returns subjects of the most recent commits, separated by newlines
 */
export function getRecentCommits(limit = 30): string {
  try {
    const output = execSync(`git log -n ${limit} --no-merges --pretty=format:"%s"`, {
      encoding: 'utf-8',
      stdio: 'pipe',
    });
    return output.trim();
  } catch {
    return '';
  }
}

export function getInferredSubject(): string | undefined {
  try {
    const branchName = execSync('git rev-parse --abbrev-ref HEAD', {
      encoding: 'utf-8',
      stdio: 'pipe',
    }).trim();
    if (/^(main|master|dev|develop|staging)$/i.test(branchName)) return undefined;

    let subject = branchName.replace(
      /^(feature|feat|fix|bugfix|bug|chore|docs|refactor|test|style|ci|perf)\//i,
      ''
    );
    subject = subject.replace(/^([A-Z]+-\d+-?|\d+-?)/i, '');
    subject = subject.replace(/[-_]/g, ' ').trim();

    return subject.length > 0 ? subject : undefined;
  } catch {
    return undefined;
  }
}
