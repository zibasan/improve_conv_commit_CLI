import fs from 'node:fs';
import * as prompt from '@clack/prompts';
import parse from '@commitlint/parse';
import chalk from 'chalk';
import { runCommitMsgPrompt } from '../prompts.js';
import { error, info, success, warn } from '../utils/symbols.js';

export async function checkCommit(filePath: string) {
  try {
    // 1. Read the file passed from Git (.git/COMMIT_EDITMSG)
    const rawMessage = fs.readFileSync(filePath, 'utf-8');
    const message = rawMessage
      .replace(/\r\n/g, '\n') // replace CRLF with LF
      .split('\n') // split into lines
      .filter((line) => !line.startsWith('#')) // remove comment lines
      .join('\n')
      .trim(); // trim leading/trailing whitespace

    const parserOpts = {
      headerPattern: /^(\w*)(?:\((.*)\))?(!?): (.*)$/,
      headerCorrespondence: ['type', 'scope', 'break', 'subject'],
    };

    if (message) {
      const parsed = await parse(message, undefined, parserOpts);

      const hasValidStructure = parsed.type !== null && parsed.subject !== null;
      const isValidType = parsed.type ? /^[a-z]+$/.test(parsed.type) : false;

      if (hasValidStructure && isValidType) {
        // 2. Check
        console.log(
          success + chalk.green(' Commit messages comply with the rules! Continue with the commit.')
        );
        process.exit(0); // Successful completion (committed as is)
      }

      // 3. Display a prompt if the terms are violated
      console.log(
        warn + chalk.yellow(' The commit message is not compliant with Conventional Commits.')
      );
      console.log(chalk.cyan(`Current message: ${message}\n`));
      console.log(chalk.cyan(`Please create a new commit message.\n`));
    } else {
      console.log(info + chalk.blue(" No commit message provided. Let's create one!\n"));
    }

    const newMessage = await runCommitMsgPrompt(message);

    const confirm = await prompt.confirm({
      message: 'Do you want to commit with this message?',
      initialValue: true,
    });

    if (prompt.isCancel(confirm) || !confirm) {
      prompt.cancel(chalk.bgYellow.black(' CANCELED ') + chalk.yellow(' Commit has been aborted.'));
      process.exit(1);
    }

    // Save the file
    fs.writeFileSync(filePath, newMessage, 'utf-8');
    prompt.outro(
      '\n' + success + chalk.green(' Modify the commit message and continue with the commit!')
    );
    process.exit(0);
  } catch (err) {
    console.error(error + chalk.red(' An error has occurred:'), err);
    process.exit(1);
  }
}
