import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const CONFIG_FILE = path.join(os.homedir(), '.commit-wand.json');

export function saveApiKey(key: string) {
  const config = { GEMINI_API_KEY: key };
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
}

export function getApiKey(): string | undefined {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
      const config = JSON.parse(data);
      return config.GEMINI_API_KEY;
    }
  } catch (_e) {
    return undefined;
  }
  return undefined;
}
