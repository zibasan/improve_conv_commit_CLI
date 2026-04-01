#!/usr/bin/env node
import chalk from 'chalk';
import { Command } from 'commander';
import { checkCommit } from './commands/check.js';
import { initHusky } from './commands/init.js';
import { saveApiKey } from './utils/config.js';
import { error, success } from './utils/symbols.js';

process.on('SIGINT', () => {
  console.log(
    chalk.bgYellow.black(' CANCELED ') +
      chalk.yellow(' Processing has been canceled. Abort the commit.')
  );
  process.exit(1);
});

const program = new Command();
program.name('cw').version('1.0.21').description('A CLI to check and fix Conventional Commits');
program.argument('[file]', 'Path to the commit message file');
program.option(
  '--no-commit',
  'If provided, copy the generated message instead of committing (Interactive mode only).'
);
program.action(async (file, options) => {
  if (file && options.commit === false) {
    console.error(
      error +
        chalk.red(' "--no-commit" option cannot be used in Hook mode (when a file is specified).')
    );
    process.exit(1);
  }

  await checkCommit(file, { noCommit: options.commit === false });
});

program
  .command('init')
  .description('Initialize Husky and setup the commit-msg hook automatically')
  .action(async () => {
    await initHusky();
  });

const configCmd = program.command('config').description('Manage commit-wand configuration');

configCmd
  .command('set-key <key>')
  .description('Set your Gemini API key for AI features')
  .action((key) => {
    saveApiKey(key);
    console.log(success + chalk.green(' API Key has been saved successfully to config.'));
    console.log(
      chalk.gray(
        'You can now use the AI auto-scoping feature without setting environment variables.'
      )
    );
  });

program.parse(process.argv);
