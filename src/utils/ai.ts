import { execSync } from 'node:child_process';
import { GoogleGenAI } from '@google/genai';
import { getApiKey } from './config.js';
import { getInferredScope } from './git.js';

// Check if the user has set the key in the environment variable
const API_KEY = process.env.CW_GEMINI_API_KEY || getApiKey();

/**
 * A helper function that extracts json from API errors and converts them into highly readable messages.
 */
function parseGeminiError(error: unknown): string {
  const rawMessage = error instanceof Error ? error.message : String(error);

  try {
    const jsonMatch = rawMessage.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);

      if (parsed.error?.message) {
        const code = parsed.error.code ? `[HTTP ${parsed.error.code}] ` : '';
        const status = parsed.error.status ? `(${parsed.error.status}) ` : '';
        return `${code}${status}${parsed.error.message}`;
      }
    }
  } catch (_e) {
    // do noting
  }

  return rawMessage
    .replace(/^\[?GoogleGenerativeAI Error\]?:?\s*/i, '') // SDK特有のプレフィックスを削除
    .trim();
}

/**
 * Use AI to infer scope from changes.
 * Fallback to rule-based inference when API key is missing or on error.
 */
export async function getAIScope(): Promise<{
  scope: string | undefined;
  error?: string;
  tokens?: { prompt: number; candidate: number; total: number };
}> {
  if (!API_KEY) {
    return { scope: getInferredScope() };
  }

  try {
    const diff = execSync('git diff --cached', { encoding: 'utf-8', stdio: 'pipe' });

    if (!diff.trim()) return { scope: undefined };

    const truncatedDiff = diff.length > 3000 ? diff.slice(0, 3000) + '\n...[truncated]' : diff;

    // 4. AIに投げる極秘のプロンプト（指示書）
    const systemInstruction = `
You are a senior engineer.
Analyze the following git diff and infer the most suitable English word for the "scope" in Conventional Commits.
- Use only lowercase letters (e.g., ui, auth, db, core, components)
- Do not include any explanations, markdown, or line breaks, just the word
    `.trim();

    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Diff:\n${truncatedDiff}`,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.1,
      },
    });

    const aiScope = response.text?.trim().toLowerCase();

    const usage = response.usageMetadata;
    const tokens = usage
      ? {
          prompt: usage.promptTokenCount ?? 0,
          candidate: usage.candidatesTokenCount ?? 0,
          total: usage.totalTokenCount ?? 0,
        }
      : undefined;

    if (!aiScope || aiScope.includes('\n') || aiScope.includes(' ')) {
      return {
        scope: getInferredScope(),
        error:
          'The AI-generated string was either missing or invalid, so commit-wand switched to rule-based scope inference.',
      };
    }

    return { scope: aiScope, tokens };
  } catch (error) {
    const errorMessage = parseGeminiError(error);
    return { scope: getInferredScope(), error: errorMessage };
  }
}
