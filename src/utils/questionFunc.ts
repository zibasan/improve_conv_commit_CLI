import chalk from 'chalk';
import Enquirer from 'enquirer';

// Extract the Enquirer class (cast with any to avoid type errors)
// biome-ignore lint/suspicious/noExplicitAny: Enquirer type definition is incomplete
const { Input, Select, Confirm } = Enquirer as any;

/**
 * Functions used to execute prompts
 */
// biome-ignore lint/suspicious/noExplicitAny: Due to incomplete type definition
export async function runPrompt(prompt: any): Promise<unknown> {
  try {
    return await prompt.run();
  } catch (e) {
    if (e === '') {
      process.emit('SIGINT');
      return new Promise(() => {});
    }
    throw e;
  }
}

/**
 * Prompt for text (initial value support)
 *@param message prompt message
 *@param initial initial value (optional)
 */
export async function askInput(message: string, initial?: string): Promise<string> {
  const prompt = new Input({
    name: 'input',
    message: chalk.cyan(message),
    initial: initial,
  });

  return (await runPrompt(prompt)) as string;
}

/**
 * Prompt to choose one option
 * @param message prompt message
 * @param choices Choices <string[]>
 */
export async function selectType(message: string, choices: string[]): Promise<string> {
  const prompt = new Select({
    name: 'selected',
    message: chalk.cyan(message),
    choices: choices,
    limit: choices.length,
    footer: chalk.gray.italic('\n Use the Up/Down keys to select, and press Enter to confirm.'),
  });

  return (await runPrompt(prompt)) as string;
}

/**
 * Confirmation prompt to select Yes/No
 */
export async function askConfirm(message: string, initial = true): Promise<boolean> {
  const prompt = new Confirm({
    name: 'confirm',
    message: chalk.cyan(message),
    initial: initial,
  });

  return (await runPrompt(prompt)) as boolean;
}
