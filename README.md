# aryas

Simple Electron app updates, plus a GitHub Action that publishes the releases it reads.

- [`packages/aryas`](./packages/aryas) — the updater library.
- [`packages/cli`](./packages/cli) — `aryas-cli`, which creates/updates a GitHub Release, uploads a zip and its `.sha256`.
- [`action.yml`](./action.yml) — a composite action wrapping the CLI.

## Publishing releases

Build the app zip exactly like the updater expects (the zip must contain `AppName.app` at its
root; electron-builder's macOS `zip` target does this), then hand it to the action:

```yaml
name: Release
on:
    push:
        tags: ['v*']

permissions:
    contents: write

jobs:
    release:
        runs-on: macos-latest
        steps:
            - uses: actions/checkout@v5
            - uses: pnpm/action-setup@v4
            - uses: actions/setup-node@v5
              with:
                  node-version: 24
                  cache: pnpm

            - run: pnpm install --frozen-lockfile
            - run: pnpm build:mac

            - uses: TheCommieAxolotl/aryas@v1
              with:
                  zip: dist/MyApp-${{ github.ref_name }}-arm64-mac.zip
                  token: ${{ secrets.GITHUB_TOKEN }}
                  # optional
                  # version: ${{ github.ref_name }}   # defaults to the ref name
                  # tag-prefix: ''                    # e.g. 'v' or 'pico-'
                  # repo: owner/releases              # defaults to the current repo
                  # notes: |
                  #     What changed
                  # draft: false
                  # prerelease: false
```

The action creates the tag/Release if it is missing, refreshes its name/body if it exists, then
replaces the zip and `.sha256` assets. Matrix jobs can publish in parallel: a concurrent
`createRelease` (422) falls back to the release another job just made, and only same-named assets
are replaced.

Inputs map to environment variables, so the CLI can also be used directly:

```bash
GITHUB_TOKEN=... GITHUB_REPO=owner/repo \
    node packages/cli/dist/index.js --version 1.2.3 --tag-prefix v --zip dist/MyApp-1.2.3-arm64-mac.zip
```

`packages/cli/dist` is committed because composite actions run straight from the checkout. CI
rebuilds it and fails if it is stale (`.github/workflows/ci.yml`).

### Publishing to a separate releases repository

`GITHUB_TOKEN` can only write to the repository running the workflow. To publish elsewhere (like
`thecommieaxolotl/releases` for Pico), pass a PAT:

```yaml
- uses: TheCommieAxolotl/aryas@v1
  with:
      repo: thecommieaxolotl/releases
      token: ${{ secrets.RELEASES_TOKEN }}
      tag-prefix: pico-
      version: ${{ github.ref_name }}
      zip: dist/Pico-${{ github.ref_name }}-arm64-mac.zip
```
