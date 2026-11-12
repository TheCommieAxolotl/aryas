# aryas

Simple electron updates.

```ts
import * as aryas from 'aryas';

aryas.init({
    provider: 'github',
    currentVersion: packageJson.version,
    variables: {
        repo: 'relagit/relagit',
    },
});

const update = aryas.checkForUpdates();

if (update) {
    const artifact = await aryas.downloadUpdate(update);

    if (artifact) {
        await aryas.quitAndUpdate(artifact);
    }
}
```

Reads from github releases, downloads a zip of the .app

## Logging

Logs are prefixed with an `aryas:info` / `aryas:warn` / `aryas:error` tag. Info-level logs can be disabled via the runtime config:

```ts
aryas.init({
    provider: 'github',
    currentVersion: packageJson.version,
    variables: { repo: 'relagit/relagit' },
    log: { info: false },
});
```

Warnings and errors are always logged.

## Events

`download-progress` fires as the update zip streams in (throttled to ~once per percentage point):

```ts
aryas.emitter.on('download-progress', ({ version, received, total, percent }) => {
    console.log(`Downloading ${version}: ${Math.round(percent)}% (${received}/${total} bytes)`);
});
```
