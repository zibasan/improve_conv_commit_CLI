import { execSync } from 'node:child_process';
import fs from 'node:fs';
import * as prompt from '@clack/prompts';
import parse from '@commitlint/parse';
import chalk from 'chalk';
import clipboard from 'clipboardy';
import { runCommitMsgPrompt } from '../prompts.js';
import { error, info, success, warn } from '../utils/symbols.js';

export async function checkCommit(filePath?: string, options: { noCommit?: boolean } = {}) {
  try {
    let message: string | null = null;

    if (filePath) {
      // 1. Read the file passed from Git (.git/COMMIT_EDITMSG)
      const rawMessage = fs.readFileSync(filePath, 'utf-8');
      message = rawMessage
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
            success +
              chalk.green(' Commit messages comply with the rules! Continue with the commit.')
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
    } else {
      if (options.noCommit) {
        console.log(info + chalk.cyan(' Starting interactive commit mode (no committing) ...\n'));
      } else {
        console.log(info + chalk.cyan(' Starting interactive commit mode...\n'));
      }
    }

    const newMessage = await runCommitMsgPrompt(message);

    const confirmMessage = filePath
      ? 'Do you want to commit with this message?'
      : options.noCommit
        ? 'Are you sure you want this commit message? (Will be copied to clipboard instead of committing)'
        : 'Do you want to commit with this commit message?';

    const confirm = await prompt.confirm({
      message: confirmMessage,
      initialValue: true,
    });

    if (prompt.isCancel(confirm) || !confirm) {
      prompt.cancel(chalk.bgYellow.black(' CANCELED ') + chalk.yellow(' Commit has been aborted.'));
      process.exit(1);
    }

    if (filePath) {
      // hook mode
      // Save the file
      fs.writeFileSync(filePath, newMessage, 'utf-8');
      prompt.outro(
        '\n' + success + chalk.green(' Modify the commit message and continue with the commit!')
      );
    } else if (options.noCommit) {
      // interactive mode with --no-commit
      await prompt.text({
        message: info + ' Press Enter to copy the generated commit message to clipboard...',
      });
      await clipboard.write(newMessage);
      prompt.outro(success + chalk.green(' Commit message was copied to clipboard successfully.'));
    } else {
      try {
        prompt.outro(
          success + chalk.green('Files were staged and "git commit" will be executed successfully.')
        );
        execSync(`git add .`, { stdio: 'inherit' });
        execSync(`git commit -m "${newMessage}"`, { stdio: 'inherit' });
      } catch (_execErr) {
        console.error(error + chalk.red(' Failed to execute git commit.'));
        process.exit(1);
      }
    }
  } catch (err) {
    console.error(error + chalk.red(' An error has occurred:'), err);
    process.exit(1);
  }
}
