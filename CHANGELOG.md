# Changelog

## [2.0.71](https://github.com/zibasan/commit-wand/compare/v2.0.7...v2.0.71) (2026-04-04)


### Continuous Integration

* update node to 24 for npm OIDC; release v2.0.71 ([99ef13c](https://github.com/zibasan/commit-wand/commit/99ef13c5506498595620f4a0206f66da8fb75414))

## [2.0.7](https://github.com/zibasan/commit-wand/compare/v2.0.68...v2.0.7) (2026-04-04)


### Bug Fixes

* workflow file - 8; release v2.0.7 ([52af172](https://github.com/zibasan/commit-wand/commit/52af172a515b701315e977b547691f68adf4256d))

## [2.0.68](https://github.com/zibasan/commit-wand/compare/v2.0.67...v2.0.68) (2026-04-04)


### Bug Fixes

* workflow file - 7; release v2.0.68 ([89cd5b4](https://github.com/zibasan/commit-wand/commit/89cd5b4885e7656430cb4d4385ae12ff89dc89d4))

## [2.0.67](https://github.com/zibasan/commit-wand/compare/v2.0.65...v2.0.67) (2026-04-04)


### Bug Fixes

* workflow file - 5; release v2.0.66 ([e7364f9](https://github.com/zibasan/commit-wand/commit/e7364f9fe45b95de6997fcd75b9a30ebbd6ab6b6))
* workflow file - 5; release v2.0.67 ([9cbad40](https://github.com/zibasan/commit-wand/commit/9cbad40dc1a7a12e05f624de12dd7b593abbee58))

## [2.0.65](https://github.com/zibasan/commit-wand/compare/v2.0.64...v2.0.65) (2026-04-04)


### Bug Fixes

* workflow file - 4; release v2.0.65 ([8daa006](https://github.com/zibasan/commit-wand/commit/8daa006dae29ff5588c9a30d2171702a37953879))

## [2.0.64](https://github.com/zibasan/commit-wand/compare/v2.0.61...v2.0.64) (2026-04-04)


### Bug Fixes

* workflow file - 2; release v2.0.63 ([ae337f7](https://github.com/zibasan/commit-wand/commit/ae337f7c732cd8033bc8c05985687563c08c49b5))
* workflow file - 3; release v2.0.64 ([a4be93f](https://github.com/zibasan/commit-wand/commit/a4be93f8833c3eb86fad847aff7fa9905a560e7f))


### Miscellaneous Chores

* trigger release v2.0.62 ([397b7ad](https://github.com/zibasan/commit-wand/commit/397b7ad06d3905a5bb4b8412dd64e199c6d556ad))

## [2.0.61](https://github.com/zibasan/commit-wand/compare/v2.0.6...v2.0.61) (2026-04-04)


### Bug Fixes

* workflow file name ([000e021](https://github.com/zibasan/commit-wand/commit/000e021862c3f09533c141cab5e9fa258efb2c75))

## [2.0.6](https://github.com/zibasan/commit-wand/compare/v2.0.5...v2.0.6) (2026-04-04)


### ⚠ BREAKING CHANGES

* **check:** Refreshed husky hook command. User will need to run `npx cw init`.
* **Node.js-version:** Changed the supported Node.js version. This means, it will not work with versions older than v22.
* **husky:** Included code to remove `.husky/pre-commit`, so please run `cw init` again or remove it manually.

### Features

* **ai:** add scope suggestion with Gemini ([7243fa2](https://github.com/zibasan/commit-wand/commit/7243fa2555612eab9a17e00b688cd1e32ff77f35))
* **ai:** add scope suggestion with Gemini ([5460d96](https://github.com/zibasan/commit-wand/commit/5460d9613f84acbeb606452cfe31f71d4bfa465f))
* **check-and-init:** Add init command && Prepare publish ([85701e8](https://github.com/zibasan/commit-wand/commit/85701e8f05e8252ce09f9d11abc2ba65aa036423))
* **check:** Add check before commit ([c4beb55](https://github.com/zibasan/commit-wand/commit/c4beb55943dbd93ddc651458e15b9e584dcc8cee))
* **check:** Add prompt body, breaking changes etc. ([baac3a5](https://github.com/zibasan/commit-wand/commit/baac3a539032a5f6a591419d5124bc369abf2fec))
* **config:** add configuration for API Key ([327950c](https://github.com/zibasan/commit-wand/commit/327950cf63a69f552f4815e5a6dffcf3af885de6))
* **prompt:** add suggestion of commit summary ([c6c4621](https://github.com/zibasan/commit-wand/commit/c6c46216e5d2b77d58578bdf83ea7bbab83ad600))
* **prompt:** change interactive question library ([ff2b291](https://github.com/zibasan/commit-wand/commit/ff2b2917813c651742a6b12b1099908f110b030d))
* **prompts:** add suggestion of scope ([058c3fb](https://github.com/zibasan/commit-wand/commit/058c3fb5b98b2ce884fd7ce57e63de0fa208325e))
* **prompts:** add suggestion of scope ([b59e036](https://github.com/zibasan/commit-wand/commit/b59e03626899403c038f6d4ea34eab83b18e2dc0))


### Bug Fixes

* add registry-url back for npm OIDC ([1f6f3d6](https://github.com/zibasan/commit-wand/commit/1f6f3d6b7ad50c2685312b98f4c7b925ee91289d))
* **check-git:** The commit action precedes the prompt ([2d8284e](https://github.com/zibasan/commit-wand/commit/2d8284e63ee7c569261c350313b7f073ee993964))
* **check-git:** The commit process cannot be canceled when the CLI is canceled ([18f14cf](https://github.com/zibasan/commit-wand/commit/18f14cf684af2d1021df0b1d7f10435e0a9379e9))
* **check:** fatal vulnerability in check.ts and Code that causes crashes in ai.ts ([a32492b](https://github.com/zibasan/commit-wand/commit/a32492ba817eb331f48d47060677d4ad7e563cac))
* **check:** The commit message during amend is not being passed correctly ([50cc567](https://github.com/zibasan/commit-wand/commit/50cc56785f27acd95e71c634c41a397f7ac4aa09))
* correctly configure OIDC provenance for npm ([eeea3de](https://github.com/zibasan/commit-wand/commit/eeea3deb97259f2ffcd947fe3a6a104469a62646))
* **husky:** Fatal problem; the 'pre-commit' generated by 'husky init' prevents the CLI from starting ([165a193](https://github.com/zibasan/commit-wand/commit/165a193c1e3cd84f882140dfe41ef2e03e683f44))
* Merge https://github.com/zibasan/improve_conv_commit_CLI ([124a231](https://github.com/zibasan/commit-wand/commit/124a231ff00de0a43c21804fa11c734e4eb13d96))
* migrate to npm trusted publishing ([a5f2f1f](https://github.com/zibasan/commit-wand/commit/a5f2f1f9ceaf9ed643515f4c7a1a7f1ffdf0ad0b))
* **Node.js-version:** Change the supported Node.js version (&gt;= v22) ([dd7724f](https://github.com/zibasan/commit-wand/commit/dd7724f3d5eadb1fa96d4881f8260beca681c0b9))
* **package:** read version dynamically from package.json ([1ab814b](https://github.com/zibasan/commit-wand/commit/1ab814bbb7882b606c22a27f699898d6493dea6c))
* use npm publish instead of pnpm for OIDC ([95747d6](https://github.com/zibasan/commit-wand/commit/95747d6f04b5d0cc72afa794106496b2459dc848))


### Miscellaneous Chores

* **check:** Prevent staging prompts when commiting ([cac0bc2](https://github.com/zibasan/commit-wand/commit/cac0bc26e24138c781482515c24bc99b1983b2bd))
* release v2.0.6 ([6ba19f8](https://github.com/zibasan/commit-wand/commit/6ba19f8d6638f95bbfb9f795face23b305ed3f85))
* trigger Actions ([a2ddda9](https://github.com/zibasan/commit-wand/commit/a2ddda99143402a9d5604997ceede8fdf82d36ca))


### Continuous Integration

* update release-please action to googleapis ([e2ee47b](https://github.com/zibasan/commit-wand/commit/e2ee47bf539eed59e670ec6335903f71d265bdad))

## [2.0.5](https://github.com/zibasan/commit-wand/compare/v2.0.5...v2.0.5) (2026-04-04)


### ⚠ BREAKING CHANGES

* **check:** Refreshed husky hook command. User will need to run `npx cw init`.
* **Node.js-version:** Changed the supported Node.js version. This means, it will not work with versions older than v22.
* **husky:** Included code to remove `.husky/pre-commit`, so please run `cw init` again or remove it manually.

### Features

* **ai:** add scope suggestion with Gemini ([7243fa2](https://github.com/zibasan/commit-wand/commit/7243fa2555612eab9a17e00b688cd1e32ff77f35))
* **ai:** add scope suggestion with Gemini ([5460d96](https://github.com/zibasan/commit-wand/commit/5460d9613f84acbeb606452cfe31f71d4bfa465f))
* **check-and-init:** Add init command && Prepare publish ([85701e8](https://github.com/zibasan/commit-wand/commit/85701e8f05e8252ce09f9d11abc2ba65aa036423))
* **check:** Add check before commit ([c4beb55](https://github.com/zibasan/commit-wand/commit/c4beb55943dbd93ddc651458e15b9e584dcc8cee))
* **check:** Add prompt body, breaking changes etc. ([baac3a5](https://github.com/zibasan/commit-wand/commit/baac3a539032a5f6a591419d5124bc369abf2fec))
* **config:** add configuration for API Key ([327950c](https://github.com/zibasan/commit-wand/commit/327950cf63a69f552f4815e5a6dffcf3af885de6))
* **prompt:** add suggestion of commit summary ([c6c4621](https://github.com/zibasan/commit-wand/commit/c6c46216e5d2b77d58578bdf83ea7bbab83ad600))
* **prompt:** change interactive question library ([ff2b291](https://github.com/zibasan/commit-wand/commit/ff2b2917813c651742a6b12b1099908f110b030d))
* **prompts:** add suggestion of scope ([058c3fb](https://github.com/zibasan/commit-wand/commit/058c3fb5b98b2ce884fd7ce57e63de0fa208325e))
* **prompts:** add suggestion of scope ([b59e036](https://github.com/zibasan/commit-wand/commit/b59e03626899403c038f6d4ea34eab83b18e2dc0))


### Bug Fixes

* add registry-url back for npm OIDC ([1f6f3d6](https://github.com/zibasan/commit-wand/commit/1f6f3d6b7ad50c2685312b98f4c7b925ee91289d))
* **check-git:** The commit action precedes the prompt ([2d8284e](https://github.com/zibasan/commit-wand/commit/2d8284e63ee7c569261c350313b7f073ee993964))
* **check-git:** The commit process cannot be canceled when the CLI is canceled ([18f14cf](https://github.com/zibasan/commit-wand/commit/18f14cf684af2d1021df0b1d7f10435e0a9379e9))
* **check:** fatal vulnerability in check.ts and Code that causes crashes in ai.ts ([a32492b](https://github.com/zibasan/commit-wand/commit/a32492ba817eb331f48d47060677d4ad7e563cac))
* **check:** The commit message during amend is not being passed correctly ([50cc567](https://github.com/zibasan/commit-wand/commit/50cc56785f27acd95e71c634c41a397f7ac4aa09))
* correctly configure OIDC provenance for npm ([eeea3de](https://github.com/zibasan/commit-wand/commit/eeea3deb97259f2ffcd947fe3a6a104469a62646))
* **husky:** Fatal problem; the 'pre-commit' generated by 'husky init' prevents the CLI from starting ([165a193](https://github.com/zibasan/commit-wand/commit/165a193c1e3cd84f882140dfe41ef2e03e683f44))
* Merge https://github.com/zibasan/improve_conv_commit_CLI ([124a231](https://github.com/zibasan/commit-wand/commit/124a231ff00de0a43c21804fa11c734e4eb13d96))
* migrate to npm trusted publishing ([a5f2f1f](https://github.com/zibasan/commit-wand/commit/a5f2f1f9ceaf9ed643515f4c7a1a7f1ffdf0ad0b))
* **Node.js-version:** Change the supported Node.js version (&gt;= v22) ([dd7724f](https://github.com/zibasan/commit-wand/commit/dd7724f3d5eadb1fa96d4881f8260beca681c0b9))
* **package:** read version dynamically from package.json ([1ab814b](https://github.com/zibasan/commit-wand/commit/1ab814bbb7882b606c22a27f699898d6493dea6c))
* use npm publish instead of pnpm for OIDC ([95747d6](https://github.com/zibasan/commit-wand/commit/95747d6f04b5d0cc72afa794106496b2459dc848))


### Miscellaneous Chores

* **check:** Prevent staging prompts when commiting ([cac0bc2](https://github.com/zibasan/commit-wand/commit/cac0bc26e24138c781482515c24bc99b1983b2bd))
* trigger Actions ([a2ddda9](https://github.com/zibasan/commit-wand/commit/a2ddda99143402a9d5604997ceede8fdf82d36ca))


### Continuous Integration

* update release-please action to googleapis ([e2ee47b](https://github.com/zibasan/commit-wand/commit/e2ee47bf539eed59e670ec6335903f71d265bdad))

## [2.0.5](https://github.com/zibasan/commit-wand/compare/v2.0.4...v2.0.5) (2026-04-04)


### Bug Fixes

* add registry-url back for npm OIDC ([1f6f3d6](https://github.com/zibasan/commit-wand/commit/1f6f3d6b7ad50c2685312b98f4c7b925ee91289d))

## [2.0.4](https://github.com/zibasan/commit-wand/compare/v2.0.2...v2.0.4) (2026-04-04)


### Bug Fixes

* correctly configure OIDC provenance for npm ([eeea3de](https://github.com/zibasan/commit-wand/commit/eeea3deb97259f2ffcd947fe3a6a104469a62646))
* use npm publish instead of pnpm for OIDC ([95747d6](https://github.com/zibasan/commit-wand/commit/95747d6f04b5d0cc72afa794106496b2459dc848))

## [2.0.2](https://github.com/zibasan/commit-wand/compare/v2.0.1...v2.0.2) (2026-04-04)


### Bug Fixes

* Merge https://github.com/zibasan/improve_conv_commit_CLI ([124a231](https://github.com/zibasan/commit-wand/commit/124a231ff00de0a43c21804fa11c734e4eb13d96))
* migrate to npm trusted publishing ([a5f2f1f](https://github.com/zibasan/commit-wand/commit/a5f2f1f9ceaf9ed643515f4c7a1a7f1ffdf0ad0b))


### Miscellaneous Chores

* trigger Actions ([a2ddda9](https://github.com/zibasan/commit-wand/commit/a2ddda99143402a9d5604997ceede8fdf82d36ca))

## [2.0.1](https://github.com/zibasan/commit-wand/compare/v2.0.0...v2.0.1) (2026-04-03)


### ⚠ BREAKING CHANGES

* **check:** Refreshed husky hook command. User will need to run `npx cw init`.
* **Node.js-version:** Changed the supported Node.js version. This means, it will not work with versions older than v22.
* **husky:** Included code to remove `.husky/pre-commit`, so please run `cw init` again or remove it manually.

### Features

* **ai:** add scope suggestion with Gemini ([7243fa2](https://github.com/zibasan/commit-wand/commit/7243fa2555612eab9a17e00b688cd1e32ff77f35))
* **ai:** add scope suggestion with Gemini ([5460d96](https://github.com/zibasan/commit-wand/commit/5460d9613f84acbeb606452cfe31f71d4bfa465f))
* **check-and-init:** Add init command && Prepare publish ([85701e8](https://github.com/zibasan/commit-wand/commit/85701e8f05e8252ce09f9d11abc2ba65aa036423))
* **check:** Add check before commit ([c4beb55](https://github.com/zibasan/commit-wand/commit/c4beb55943dbd93ddc651458e15b9e584dcc8cee))
* **check:** Add prompt body, breaking changes etc. ([baac3a5](https://github.com/zibasan/commit-wand/commit/baac3a539032a5f6a591419d5124bc369abf2fec))
* **config:** add configuration for API Key ([327950c](https://github.com/zibasan/commit-wand/commit/327950cf63a69f552f4815e5a6dffcf3af885de6))
* **prompt:** add suggestion of commit summary ([c6c4621](https://github.com/zibasan/commit-wand/commit/c6c46216e5d2b77d58578bdf83ea7bbab83ad600))
* **prompt:** change interactive question library ([ff2b291](https://github.com/zibasan/commit-wand/commit/ff2b2917813c651742a6b12b1099908f110b030d))
* **prompts:** add suggestion of scope ([058c3fb](https://github.com/zibasan/commit-wand/commit/058c3fb5b98b2ce884fd7ce57e63de0fa208325e))
* **prompts:** add suggestion of scope ([b59e036](https://github.com/zibasan/commit-wand/commit/b59e03626899403c038f6d4ea34eab83b18e2dc0))


### Bug Fixes

* **check-git:** The commit action precedes the prompt ([2d8284e](https://github.com/zibasan/commit-wand/commit/2d8284e63ee7c569261c350313b7f073ee993964))
* **check-git:** The commit process cannot be canceled when the CLI is canceled ([18f14cf](https://github.com/zibasan/commit-wand/commit/18f14cf684af2d1021df0b1d7f10435e0a9379e9))
* **check:** fatal vulnerability in check.ts and Code that causes crashes in ai.ts ([a32492b](https://github.com/zibasan/commit-wand/commit/a32492ba817eb331f48d47060677d4ad7e563cac))
* **check:** The commit message during amend is not being passed correctly ([50cc567](https://github.com/zibasan/commit-wand/commit/50cc56785f27acd95e71c634c41a397f7ac4aa09))
* **husky:** Fatal problem; the 'pre-commit' generated by 'husky init' prevents the CLI from starting ([165a193](https://github.com/zibasan/commit-wand/commit/165a193c1e3cd84f882140dfe41ef2e03e683f44))
* **Node.js-version:** Change the supported Node.js version (&gt;= v22) ([dd7724f](https://github.com/zibasan/commit-wand/commit/dd7724f3d5eadb1fa96d4881f8260beca681c0b9))
* **package:** read version dynamically from package.json ([1ab814b](https://github.com/zibasan/commit-wand/commit/1ab814bbb7882b606c22a27f699898d6493dea6c))


### Miscellaneous Chores

* **check:** Prevent staging prompts when commiting ([cac0bc2](https://github.com/zibasan/commit-wand/commit/cac0bc26e24138c781482515c24bc99b1983b2bd))


### Continuous Integration

* update release-please action to googleapis ([e2ee47b](https://github.com/zibasan/commit-wand/commit/e2ee47bf539eed59e670ec6335903f71d265bdad))

## [2.0.0](https://github.com/zibasan/commit-wand/compare/v1.0.22...v2.0.0) (2026-04-03)


### ⚠ BREAKING CHANGES

* **check:** Refreshed husky hook command. User will need to run `npx cw init`.

### Features

* **ai:** add scope suggestion with Gemini ([5460d96](https://github.com/zibasan/commit-wand/commit/5460d9613f84acbeb606452cfe31f71d4bfa465f))
* **config:** add configuration for API Key ([327950c](https://github.com/zibasan/commit-wand/commit/327950cf63a69f552f4815e5a6dffcf3af885de6))
* **prompt:** add suggestion of commit summary ([c6c4621](https://github.com/zibasan/commit-wand/commit/c6c46216e5d2b77d58578bdf83ea7bbab83ad600))
* **prompt:** change interactive question library ([ff2b291](https://github.com/zibasan/commit-wand/commit/ff2b2917813c651742a6b12b1099908f110b030d))
* **prompts:** add suggestion of scope ([b59e036](https://github.com/zibasan/commit-wand/commit/b59e03626899403c038f6d4ea34eab83b18e2dc0))


### Bug Fixes

* **check:** fatal vulnerability in check.ts and Code that causes crashes in ai.ts ([a32492b](https://github.com/zibasan/commit-wand/commit/a32492ba817eb331f48d47060677d4ad7e563cac))


### Miscellaneous Chores

* **check:** Prevent staging prompts when commiting ([cac0bc2](https://github.com/zibasan/commit-wand/commit/cac0bc26e24138c781482515c24bc99b1983b2bd))
