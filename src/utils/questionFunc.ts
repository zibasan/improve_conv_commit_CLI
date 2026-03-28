import chalk from 'chalk';
import Enquirer from 'enquirer';

// Extract the Enquirer class (cast with any to avoid type errors)
// biome-ignore lint/suspicious/noExplicitAny: Enquirer type definition is incomplete
const { Input, Select, Confirm } = Enquirer as any;

/**
 * プロンプトの実行に使う関数
 */
// biome-ignore lint/suspicious/noExplicitAny: Due to incomplete type definition
export async function runPrompt(prompt: any): Promise<unknown> {
  try {
    return await prompt.run();
  } catch (e) {
    if (e === '') {
      // 空文字エラーはCtrl+Cとみなし、SIGINTシグナルを発火
      process.emit('SIGINT');
      // process.exit()が呼ばれるまで永遠に待機し、後続の処理をストップさせる
      return new Promise(() => {});
    }
    throw e;
  }
}

/**
 * テキストを入力させるプロンプト (初期値のサポート)
 * @param message プロンプトのメッセージ
 * @param initial 初期値(オプション)
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
 * 選択肢から１つ選択させるプロンプト
 * @param message プロンプトのメッセージ
 * @param choices 選択肢<string[]>
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
 * Yes/Noを選択させる確認プロンプト
 */
export async function askConfirm(message: string, initial = true): Promise<boolean> {
  const prompt = new Confirm({
    name: 'confirm',
    message: chalk.cyan(message),
    initial: initial,
  });

  return (await runPrompt(prompt)) as boolean;
}
