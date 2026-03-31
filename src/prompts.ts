import * as prompt from '@clack/prompts';
import chalk from 'chalk';
import { error } from './utils/symbols.js';

const handleCancel = () => {
  prompt.cancel(chalk.bgYellow.black(' CANCELED ') + chalk.yellow(' Commit has been aborted.'));
  process.exit(1);
};

export async function runCommitMsgPrompt(message: string | null) {
  prompt.intro(chalk.magenta('🪄  commit-wand') + chalk.gray(' Welcome to commit-wand!'));

  const answers = await prompt.group(
    {
      type: () =>
        prompt.select({
          message: 'Choose a commit type:',
          initialValue: 'feat',
          options: [
            { value: 'feat', label: 'feat', hint: 'A new feature' },
            { value: 'fix', label: 'fix', hint: 'A bug fix' },
            { value: 'docs', label: 'docs', hint: 'Documentation only changes' },
            {
              value: 'style',
              label: 'style',
              hint: 'Changes that do not affect the meaning of the code',
            },
            {
              value: 'refactor',
              label: 'refactor',
              hint: 'A code change that neither fixes a bug nor adds a feature',
            },
            { value: 'perf', label: 'perf', hint: 'A code change that improves performance' },
            {
              value: 'test',
              label: 'test',
              hint: 'Adding missing tests or correcting existing tests',
            },
            {
              value: 'build',
              label: 'build',
              hint: 'Changes that affect the build system or external dependencies',
            },
            { value: 'ci', label: 'ci', hint: 'Changes to our CI configuration files and scripts' },
            {
              value: 'chore',
              label: 'chore',
              hint: "Other changes that don't modify src or test files",
            },
            { value: 'revert', label: 'revert', hint: 'Reverts a previous commit' },
            {
              value: 'custom',
              label: chalk.italic('Custom...'),
              hint: 'Enter a custom commit type',
            },
          ],
        }),

      customType: ({ results }) =>
        results.type === 'custom'
          ? prompt.text({
              message: 'Enter your custom type:',
              placeholder: 'e.g., add, delete, etc...',
              validate: (value) => {
                if (!value) {
                  return error + chalk.red('Please enter a type.');
                }
                if (!/^[a-z]+$/.test(value)) {
                  return error + chalk.red('Custom type can only contain lowercase letters.');
                }
              },
            })
          : Promise.resolve(undefined),

      scope: () =>
        prompt.text({
          message: 'Please enter scope (optional):',
          placeholder: 'e.g., ui, core, components',
        }),

      subject: () =>
        prompt.text({
          message: 'Please enter a commit summary (subject):',
          placeholder: 'e.g., add login button',
          initialValue: message?.split('\n')[0] || undefined,
          validate: (value) => {
            if (!value) {
              return error + chalk.red('Please enter a non-empty string for the commit summary.');
            }
            if (value.length > 50) {
              return error + chalk.red('Please limit the subject to 50 characters.');
            }
          },
        }),
    },
    {
      onCancel: handleCancel,
    }
  );

  console.log(chalk.gray('│'));
  console.log(
    chalk.gray('│  ') +
      chalk.bgBlue.whiteBright(' NEXT >> ') +
      chalk.cyanBright(' Enter a longer description (body) (optional).') +
      chalk.italic.gray('\n│  Press Enter on an empty line to finish.')
  );
  /*
  prompt.note(
    chalk.bgBlue.whiteBright(' NEXT >> ') +
      chalk.cyanBright(' Enter a longer description (body) (optional).') +
      chalk.italic.gray('\n Press Enter on an empty line to finish.')
  );
  */

  const bodyLines: string[] = [];
  while (true) {
    const line = await prompt.text({
      message: `Line ${bodyLines.length + 1}:`,
      placeholder: bodyLines.length === 0 ? '(empty to skip)' : undefined,
    });

    if (prompt.isCancel(line)) {
      handleCancel();
    }

    if (!line) {
      break;
    }

    bodyLines.push(line as string);
  }
  const body = bodyLines.join('\n');

  const footerAnswers = await prompt.group(
    {
      isBreakingChange: () =>
        prompt.confirm({
          message: 'Are there any BREAKING changes?',
          initialValue: false,
        }),
      breakingDesc: ({ results }) =>
        results.isBreakingChange
          ? prompt.text({
              message: 'Describe the breaking changes:',
              validate: (value) => {
                if (!value) {
                  return error + chalk.red(' Breaking change description cannot be empty.');
                }
              },
            })
          : Promise.resolve(undefined),
      issueRef: () =>
        prompt.text({
          message: 'Does this commit close any issues? (e.g., Closes #123) (optional):',
        }),
    },
    {
      onCancel: handleCancel,
    }
  );
  const finalType = answers.customType || answers.type;
  const cleanScope = (answers.scope as string).replace(/[()]/g, '').trim();
  const scopeStr = cleanScope ? `(${cleanScope})` : '';
  const breakingMarker = footerAnswers.isBreakingChange ? '!' : '';
  const subject = answers.subject as string;

  let newMessage = `${finalType}${scopeStr}${breakingMarker}: ${subject}`;

  if (body.trim() !== '') {
    newMessage += `\n\n${body.trim()}`;
  }

  // Add footers
  const footers = [];
  if (footerAnswers.isBreakingChange) {
    footers.push(`BREAKING CHANGE: ${(footerAnswers.breakingDesc as string).trim()}`);
  }
  if ((footerAnswers.issueRef as string).trim() !== '') {
    footers.push((footerAnswers.issueRef as string).trim());
  }

  if (footers.length > 0) {
    newMessage += `\n\n${footers.join('\n')}`;
  }

  console.log(chalk.gray('│'));
  console.log(chalk.gray('│  ') + chalk.cyan('Generated message:'));
  const messageLines = newMessage.split('\n');
  for (const msgLine of messageLines) {
    console.log(chalk.gray('│  ') + chalk.green.bold(msgLine));
  }
  console.log(chalk.gray('│'));

  return newMessage;
}
