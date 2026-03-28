#!/usr/bin/env node
import chalk from 'chalk';
import { Command } from 'commander';
import { checkCommit } from './commands/check.js';

// SIGINT (Ctrl+C) のハンドリング
// questionsFunc.ts で発火したシグナルをここで受け止め、安全に終了します。
process.on('SIGINT', () => {
  console.log(
    chalk.bgYellow.black(' CANCELED ') +
      chalk.yellow(' Processing has been canceled. Abort the commit.')
  );
  process.exit(0);
});

const program = new Command();
program
  .name('convcommit')
  .version('1.0.0')
  .description('A CLI to check and fix Conventional Commits');
program.argument('<file>', 'Path to the commit message file').action(async (file) => {
  await checkCommit(file);
});
program.parse(process.argv);
