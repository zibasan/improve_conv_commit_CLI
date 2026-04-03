import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import * as prompt from '@clack/prompts';
import parse from '@commitlint/parse';
import chalk from 'chalk';
import clipboard from 'clipboardy';
import { runCommitMsgPrompt } from '../prompts.js';
import { error, info, success, warn } from '../utils/symbols.js';

export async function checkCommit(filePath?: string, options: { noCommit?: boolean } = {}) {
  try {
    const gitDir = execSync('git rev-parse --git-dir', { encoding: 'utf-8' }).trim();
    const isMerge = fs.existsSync(path.join(gitDir, 'MERGE_HEAD'));
    const isRebase =
      fs.existsSync(path.join(gitDir, 'rebase-merge')) ||
      fs.existsSync(path.join(gitDir, 'rebase-apply'));
    const isCherryPick = fs.existsSync(path.join(gitDir, 'CHERRY_PICK_HEAD'));
    const isSpecialGitOperation = isMerge || isRebase || isCherryPick;

    if (!isSpecialGitOperation) {
      const staged = execSync('git diff --cached --name-only', { encoding: 'utf-8' }).trim();
      const unstagedTracked = execSync('git diff --name-only', { encoding: 'utf-8' }).trim();
      const untracked = execSync('git ls-files --others --exclude-standard', {
        encoding: 'utf-8',
      }).trim();
      const unstaged = [unstagedTracked, untracked].filter(Boolean).join('\n');

      const stagedFiles = staged.split('\n');
      const unstagedFiles = unstagedTracked.split('\n');
      const hasPartiallyStaged = stagedFiles.some((file) => unstagedFiles.includes(file));

      if (!staged && !unstaged) {
        // [1] If there are no changes
        const proceed = await prompt.confirm({
          message: chalk.yellow(
            'No changes detected. Do you want to proceed with this empty commit?'
          ),
          initialValue: false,
        });
        if (!proceed || prompt.isCancel(proceed)) {
          prompt.cancel(chalk.bgYellow.black(' CANCELED ') + chalk.yellow(' Commit was aborted.'));
          process.exit(1);
        }
      } else if (!filePath) {
        if (!staged && unstaged) {
          // [2] If user have changes but none are staged
          const action = await prompt.select({
            message: chalk.yellow('Changes detected but nothing is staged. Run `git add .`?'),
            options: [
              { value: 'add', label: 'Yes, run `git add .`' },
              { value: 'ignore', label: 'No, proceed without adding (the commit will be empty)' },
              { value: 'cancel', label: 'Cancel commit' },
            ],
          });
          if (prompt.isCancel(action) || action === 'cancel') {
            prompt.cancel(
              chalk.bgYellow.black(' CANCELED ') + chalk.yellow(' Commit was aborted.')
            );
            process.exit(1);
          }
          if (action === 'add') {
            try {
              execSync('git add -A', { stdio: 'inherit' });
              prompt.log.success(success + chalk.green(' All files have been staged!'));
            } catch {
              prompt.cancel(
                error +
                  chalk.red(
                    ' Failed to stage files. (If you ran `git commit`, the index is locked. Please cancel, run `git add` manually, and try again.)'
                  )
              );
              process.exit(1);
            }
          }
        } else if (staged && unstaged) {
          // [3] If there is a mix of staged and unstaged
          const msg = hasPartiallyStaged
            ? chalk.red(
                'Partially staged files detected (`git add -p`). Running `git add .` will stage all lines.\n'
              ) + chalk.yellow('Do you want to stage all changes with `git add .`?')
            : chalk.yellow(
                'Staged and unstaged changes detected. Run `git add .` to stage all changes?'
              );

          const action = await prompt.select({
            message: msg,
            options: [
              { value: 'add', label: 'Yes, run `git add .`' },
              { value: 'ignore', label: 'No, proceed with currently staged files' },
              { value: 'cancel', label: 'Cancel commit' },
            ],
          });
          if (prompt.isCancel(action) || action === 'cancel') {
            prompt.cancel(
              chalk.bgYellow.black(' CANCELED ') + chalk.yellow(' Commit was aborted.')
            );
            process.exit(1);
          }
          if (action === 'add') {
            try {
              execSync('git add -A', { stdio: 'inherit' });
              prompt.log.success(success + chalk.green(' All files have been stage'));
            } catch {
              prompt.cancel(
                error +
                  chalk.red(
                    ' Failed to stage file (If you ran `git commit`, the index is locked. Please cancel, run `git add` manually, and try again.)'
                  )
              );
              process.exit(1);
            }
          }
        }
      }
    } else {
      prompt.log.info(
        info +
          chalk.cyan.italic(
            ' Special Git operation: merge, rebase, or cherry-pick in progress. Skipping staging checks.'
          )
      );
    }

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

        if (!process.stdout.isTTY) {
          console.error(
            '[WARN] Interactive prompts are not supported in this environment (e.g., GUI Git client).' +
              ' Please correct the message in your Git client, or use the terminal to commit.'
          );
          process.exit(1);
        }

        // 3. Display a prompt if the terms are violated
        console.log(
          warn + chalk.yellow(' The commit message is not compliant with Conventional Commits.')
        );
        console.log(chalk.cyan(`Current message: ${message}\n`));
        console.log(chalk.cyan(`Please create a new commit message.\n`));
      } else {
        if (!process.stdout.isTTY) {
          console.error(
            '[WARN] Interactive prompts are not supported in this environment(e.g., GUI Git client). Please provide a message.'
          );
          process.exit(1);
        }

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
      prompt.cancel(chalk.bgYellow.black(' CANCELED ') + chalk.yellow(' Commit was aborted.'));
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
          success +
            chalk.green(' Files were staged and "git commit" will be executed successfully.')
        );
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
