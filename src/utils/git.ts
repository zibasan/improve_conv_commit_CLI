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
      const fileName = fileNameWithExt.split('.')[0]; // 拡張子を除外 (例: Button.tsx -> Button)

      if (parts[0] === 'src') {
        if (parts.length === 2) {
          // ① src直下のファイル名 (超高優先度)
          scopeScores[fileName] = (scopeScores[fileName] || 0) + 100;
        } else if (parts.length >= 3) {
          const dirName = parts[1]; // components, utils など

          if (dirName === 'utils' || dirName === 'util') {
            // ④ utilsディレクトリ関連 (低優先度)
            scopeScores.utils = (scopeScores.utils || 0) + 10;
          } else {
            // ② utils以外のディレクトリ内のファイル名
            scopeScores[fileName] = (scopeScores[fileName] || 0) + 50;

            // ③ utils以外のディレクトリ名
            // ※ 同じディレクトリのファイルが複数変更された場合、スコアが加算されて逆転します
            scopeScores[dirName] = (scopeScores[dirName] || 0) + 30;
          }
        }
      } else {
        // ⑤ src以外のファイル (package.jsonなど) は最低優先度
        scopeScores[fileName] = (scopeScores[fileName] || 0) + 1;
      }
    }

    if (Object.keys(scopeScores).length === 0) return undefined;

    // 一番スコア（優先度 × 変更頻度）が高いスコープを抽出して返す
    const inferred = Object.keys(scopeScores).reduce((a, b) =>
      scopeScores[a] > scopeScores[b] ? a : b
    );

    return inferred;
  } catch (_err) {
    return undefined;
  }
}
