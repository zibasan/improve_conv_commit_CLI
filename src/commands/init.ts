import { exec } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';
import chalk from 'chalk';
import ora from 'ora';
import { info, success } from '../utils/symbols.js';

const execAsync = promisify(exec);

export async function initHusky() {
  console.log(`\n${info} ${chalk.blue('Setting up the magic...')}`);

  const targetDir = process.cwd();
  const huskyDir = path.join(targetDir, '.husky');

  // 1. Runs automatically if Husky is not initialized
  if (!fs.existsSync(huskyDir)) {
    console.log(chalk.yellow('Husky is not initialized. Initializing now...\n'));
    const spinner = ora(
      chalk.bgBlue.white(' RUN ') + chalk.blue(' Running "npx husky init"...')
    ).start();
    try {
      // Run asynchronously
      await execAsync('npx husky init', { cwd: targetDir });
      const preCommitPath = path.join(huskyDir, 'pre-commit');

      if (fs.existsSync(preCommitPath)) {
        fs.unlinkSync(preCommitPath);
      }
      spinner.succeed(chalk.green('Husky initialized successfully.'));
    } catch (_e) {
      spinner.fail(
        chalk.red('Failed to run "husky init". Please ensure git is initialized (git init).')
      );
      process.exit(1);
    }
  }

  // 2. Creating the commit-msg hook
  const hookSpinner = ora(
    chalk.bgBlue.white(' CREATE ') + chalk.blue('Creating commit-msg hook...')
  ).start();
  try {
    const hookPath = path.join(huskyDir, 'commit-msg');
    const hookContent = `if [ -t 1 ]; then\nexec < /dev/tty\nfi\nnpx cw "$1"\n`;

    fs.writeFileSync(hookPath, hookContent, { encoding: 'utf-8', mode: 0o755 });

    hookSpinner.succeed(chalk.green('Successfully created .husky/commit-msg hook!'));
    console.log(
      `\n${success} ${chalk.green("You are all set! Just run 'git commit' or 'git commit -m \"\"' normally, and the wand will appear!\n")}`
    );
    process.exit(0);
  } catch (err) {
    hookSpinner.fail(chalk.red('An error occurred during initialization.'));
    console.error(err);
    process.exit(1);
  }
}
