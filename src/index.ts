#!/usr/bin/env node
import chalk from 'chalk';
import { Command } from 'commander';
import { checkCommit } from './commands/check.js';
import { initHusky } from './commands/init.js';

// SIGINT (Ctrl+C) のハンドリング
// questionsFunc.ts で発火したシグナルをここで受け止め、安全に終了します。
process.on('SIGINT', () => {
  console.log(
    chalk.bgYellow.black(' CANCELED ') +
      chalk.yellow(' Processing has been canceled. Abort the commit.')
  );
  process.exit(1);
});

const program = new Command();
program.name('cw').version('1.0.2').description('A CLI to check and fix Conventional Commits');
program.argument('<file>', 'Path to the commit message file').action(async (file) => {
  await checkCommit(file);
});
program
  .command('init')
  .description('Initialize Husky and setup the commit-msg hook automatically')
  .action(async () => {
    await initHusky();
  });

program.parse(process.argv);
