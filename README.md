# 🪄 commit-wand (cw)

[![npm version](https://img.shields.io/npm/v/commit-wand.svg?color=blue)](https://www.npmjs.com/package/commit-wand)
[![node version](https://img.shields.io/node/v/commit-wand.svg)](https://www.npmjs.com/package/commit-wand)
[![npm downloads](https://img.shields.io/npm/dt/commit-wand.svg)](https://www.npmjs.com/package/commit-wand)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm unpacked size](https://img.shields.io/npm/unpacked-size/commit-wand.svg)](https://www.npmjs.com/package/commit-wand)
[![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Biome](https://img.shields.io/badge/-Biome-60A5FA?logo=biome&logoColor=white)](https://biomejs.dev/)
[![GitHub stars](https://img.shields.io/github/stars/zibasan/commit-wand.svg?style=social)](https://github.com/zibasan/commit-wand/stargazers)

A magical CLI wand to check and fix Conventional Commits interactively.

Stop wrestling with git hooks that just yell at you. `commit-wand` catches your invalid commit messages and gently guides you to fix them via an interactive prompt—so you never have to type `git commit --amend` again.

## ✨ Features

- **⚒️ Interactive Fixes:** If your commit message fails the [Conventional Commits](https://www.conventionalcommits.org/) spec, it prompts you to fix it on the fly.
- **🪄 AI Auto-Inference:** Analyzes your staged changes (`git diff`) and past commit history using the Gemini API to automatically suggest the perfect scope and subject.
- **🧠 Smart Fallback:** When the Gemini API is disabled or down, you can use rule-based inference for scopes and commit titles as a fallback.
- **🛡️ Staging Assistant:** Detects forgotten unstaged files and politely asks if you want to `git add` them before committing.
- **✅ Full Spec Support:** Supports custom types, scopes, multi-line bodies, and `BREAKING CHANGE` footers.
- **0️⃣ Zero Config:** Works out of the box with reasonable defaults.
- **🎛️ Husky Ready:** Perfectly integrates with `commit-msg` git hooks.

## 📦 Installation

Install `commit-wand` as a development dependency in your project:

```bash
# using npm
npm install -D commit-wand

# using pnpm
pnpm add -D commit-wand

# using yarn
yarn add -D commit-wand

# using bun
bun add -D commit-wand
```

## 🪄 AI Features Setup (Optional)

`commit-wand` can use Google's Gemini API to magically read your changes and suggest the perfect commit summary.

1. Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Set the key in the CLI:

```bash
npx cw config set-key <YOUR_GEMINI_API_KEY>
```

Alternatively, you can set the `CW_GEMINI_API_KEY` environment variable.
Search your favorite search engine for information on how to set environment variables.
_(Note: If no key is set, the wand will gracefully fall back to rule-based inference without any errors.)_

## 🚀 Usage (with Husky)

The best way to use `commit-wand` is by integrating it with [Husky](https://typicode.github.io/husky/) to automatically run on the `commit-msg` hook.

Run the following command to set up the wand:

```bash
# Execute command for your package manager
npx cw init
```

Now, just run `git commit` as you normally would. If your message is invalid, the wand will appear and guide you!

```text
# Example of an invalid commit
$ git commit -m "update login button"

⚠ The commit message is not compliant with Conventional Commits.
ℹ Current message: update login button

? Choose a commit type: (Use arrow keys)
❯ feat
  fix
  docs
  ...
```

## 💡 Manual Usage

You don't have to wait for a hook to fail! You can launch the wand directly to build your commit from scratch. It will even check if you forgot to `git add` your files:

```bash
npx cw
# or use the full command name. The '--no-commit' option allows you to only create a commit message and copy it, but do the commit yourself.
npx commit-wand --no-commit
```

## 📜 Command Reference

> [!NOTE]
>
> - Please use the execution command of your package manager.
> - Please use "cw" or "commit wand" as the execution command.

### init

```bash
npx cw init
```

### Run commit-wand

```bash
# The bottom two commands are in "Interactive Mode".

# normal execution
npx cw

# No commit, just create and copy messages
npx cw --no-commit

# The bottom command is in "Husky Hook Mode". Specifies a specific file and replaces the contents with the generated message, but this command is deprecated as it is a Husky Hook-specific command.
npx cw [<filePath>]
```

### Config

```bash
# Currently only Gemini API key settings are supported.

# Set Gemini API key for AI features
npx cw config set-key <GEMINI_API_KEY>
```

---

## 🐛 Bugs and Issues

If you find a bug or have a feature request, please [open an issue](https://github.com/zibasan/commit-wand/issues) on GitHub.
When reporting a bug, please include:

- `commit-wand` version
- Node.js and OS version
- Steps to reproduce the issue
- Terminal Log

## 🤝 Contributing

Contributions, issues, and feature requests are always welcome!
Feel free to check [issues page](https://github.com/zibasan/commit-wand/issues).

If you want to contribute to the code, please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on the process for submitting pull requests.

## 📄 License

MIT © [zibasan](https://github.com/zibasan)
