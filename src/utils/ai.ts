import { execSync } from 'node:child_process';
import { GoogleGenAI } from '@google/genai';
import { getApiKey } from './config.js';
import { getInferredScope, getInferredSubject, getRecentCommits } from './git.js';

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
export async function getAIInference(): Promise<{
  scope: string | undefined;
  subject: string | undefined;
  error?: string;
  tokens?: { prompt: number; candidate: number; total: number };
  isAI: boolean;
}> {
  if (!API_KEY) {
    return { scope: getInferredScope(), subject: getInferredSubject(), isAI: false };
  }

  try {
    const diff = execSync('git diff --cached', {
      encoding: 'utf-8',
      stdio: 'pipe',
      maxBuffer: 10 * 1024 * 1024,
    });
    if (!diff.trim()) return { scope: undefined, subject: getInferredSubject(), isAI: false };

    const truncatedDiff = diff.length > 3000 ? diff.slice(0, 3000) + '\n...[truncated]' : diff;

    const recentCommits = getRecentCommits(30);
    const historyContext = recentCommits
      ? `\n\n【Past commit history of the project (for reference)】\nAnalyze the following commit history and language to make inferences that fit this project:\n${recentCommits}`
      : '';

    const systemInstruction =
      `You are a senior engineer. Infer the "scope" and "Subject" (summary) of Conventional Commits from git diff and past history.
    Please be sure to output only the following JSON format (no markdown decoration required).
    {
      "scope": "a lowercase English word. null if not applicable",
      "subject": "Commit title (up to 50 characters)"
    }\n${historyContext}`.trim();

    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Diff:\n${truncatedDiff}`,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.1,
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text?.trim() || '{}';
    let inferredScope: string | undefined;
    let inferredSubject: string | undefined;

    try {
      const parsed = JSON.parse(responseText);
      inferredScope =
        parsed.scope && parsed.scope !== 'null' ? String(parsed.scope).toLowerCase() : undefined;
      inferredSubject =
        parsed.subject && parsed.subject !== 'null' ? String(parsed.subject) : undefined;
    } catch {
      return {
        scope: getInferredScope(),
        subject: getInferredSubject(),
        isAI: false,
        error: 'Failed to parse AI response as JSON.',
      };
    }

    const usage = response.usageMetadata;
    const tokens = usage
      ? {
          prompt: usage.promptTokenCount ?? 0,
          candidate: usage.candidatesTokenCount ?? 0,
          total: usage.totalTokenCount ?? 0,
        }
      : undefined;

    return { scope: inferredScope, subject: inferredSubject, tokens, isAI: true };
  } catch (error) {
    const errorMessage = parseGeminiError(error);
    return {
      scope: getInferredScope(),
      subject: getInferredSubject(),
      isAI: false,
      error: errorMessage,
    };
  }
}
