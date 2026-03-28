# 🪄 commit-wand (cw)

[![npm version](https://img.shields.io/npm/v/commit-wand.svg?color=blue)](https://www.npmjs.com/package/commit-wand)
[![npm downloads](https://img.shields.io/npm/dt/commit-wand.svg)](https://www.npmjs.com/package/commit-wand)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm unpacked size](https://img.shields.io/npm/unpacked-size/commit-wand.svg)](https://www.npmjs.com/package/commit-wand)
[![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Biome](https://img.shields.io/badge/-Biome-60A5FA?logo=biome&logoColor=white)](https://biomejs.dev/)
[![GitHub stars](https://img.shields.io/github/stars/zibasan/commit-wand.svg?style=social)](https://github.com/zibasan/commit-wand/stargazers)

A magical CLI wand to check and fix Conventional Commits interactively.

Stop wrestling with git hooks that just yell at you. `commit-wand` catches your invalid commit messages and gently guides you to fix them via an interactive prompt—so you never have to type `git commit --amend` again.

## ✨ Features

- **Interactive Fixes:** If your commit message fails the [Conventional Commits](https://www.conventionalcommits.org/) spec, it prompts you to fix it on the fly.
- **Full Spec Support:** Supports custom types, scopes, multi-line bodies, and `BREAKING CHANGE` footers.
- **Zero Config:** Works out of the box with reasonable defaults.
- **Husky Ready:** Perfectly integrates with `commit-msg` git hooks.

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

## 🚀 Usage (with Husky)

The best way to use `commit-wand` is by integrating it with [Husky](https://typicode.github.io/husky/) to automatically run on the `commit-msg` hook.

1. Initialize husky (if you haven't already):

```bash
# Using your package manager's execute command

npx husky init
```

> [!NOTE]
> If your project does not already have Husky installed, install it and run it.

2. Add `commit-wand` to the `commit-msg` hook:
   ```bash
   cw init
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

You can also run it manually to check any text file containing a commit message:

```bash
npx cw path/to/message.txt
# or use the full command name
npx commit-wand path/to/message.txt
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
