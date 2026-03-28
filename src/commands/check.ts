import fs from 'node:fs';
import parse from '@commitlint/parse';
import chalk from 'chalk';
import { askConfirm, askInput, selectType } from '../utils/questionFunc.js';
import { error, success, warn } from '../utils/symbols.js';

export async function checkCommit(filePath: string) {
  try {
    // 1. Read the file passed from Git (.git/COMMIT_EDITMSG)
    const message = fs.readFileSync(filePath, 'utf-8').trim();

    if (message.trim() === '') {
      console.log(error + chalk.red(' Commit message is empty. This commit will be aborted.'));
      process.exit(1); // Process end with error (aborts commit)
    }

    const parsed = await parse(message);

    const hasValidStructure = parsed.type !== null && parsed.subject !== null;
    const isValidType = parsed.type ? /^[a-z]+$/.test(parsed.type) : false;

    // 2. Check with regular expression
    if (hasValidStructure && isValidType) {
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

    // Type selection
    const types = [
      'feat',
      'fix',
      'docs',
      'style',
      'refactor',
      'perf',
      'test',
      'build',
      'ci',
      'chore',
      'revert',
      'custom',
    ];
    const selectedType = await selectType('Choose a commit type:', types);
    let customType = '';

    if (selectedType === 'custom') {
      while (true) {
        const inputCustomType = await askInput('Enter your custom type:');

        if (inputCustomType.trim() === '') {
          console.log(error + chalk.red(' Please enter a non-empty string for the custom type.\n'));
        } else if (!/^[a-z]+$/.test(inputCustomType)) {
          console.log(
            error + chalk.red(' Invalid type string. Please enter lowercase letters only.\n')
          );
        } else {
          customType = inputCustomType;
          break;
        }
      }
    }

    // Input scope (optional)
    const scope = await askInput('Please enter scope (optional):', '');
    scope.trim();

    // Enter the summary (subject) (set the original message as the initial value)
    let subject = '';
    while (true) {
      subject = await askInput('Please enter a commit summary (subject):', message);

      if (subject.trim() === '') {
        console.log(
          error + chalk.red(' Please enter a non-empty string for the commit summary.\n')
        );
      } else {
        break;
      }
    }

    // 4. Assembling a new message
    const cleanScope = scope.replace(/[()]/g, '').trim();
    const scopeStr = cleanScope ? `(${cleanScope})` : '';

    const newMessage = `${customType || selectedType}${scopeStr}: ${subject}`;

    console.log(`\nGenerated message: ${chalk.green(newMessage)}\n`);

    // 5. Final confirmation
    const confirm = await askConfirm('Do you want to commit with this message?', true);

    if (confirm) {
      // Save the file
      fs.writeFileSync(filePath, newMessage, 'utf-8');
      console.log(
        '\n' + success + chalk.green(' Modify the commit message and continue with the commit!')
      );
      process.exit(0);
    } else {
      console.log('\n' + error + chalk.red(' Commit has been aborted.'));
      process.exit(1); // Ended with error (aborts commit)
    }
  } catch (err) {
    console.error(error + chalk.red(' An error has occurred:'), err);
    process.exit(1);
  }
}
