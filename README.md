# percentage-badges

Serverless coverage badge from cobertura XML coverage file with Github Actions.

![build](https://raw.githubusercontent.com/action-badges/percentage-badges/badges/.badges/main/build-status.svg)
![coverage](https://raw.githubusercontent.com/action-badges/percentage-badges/badges/.badges/main/coverage.svg)
![tag](https://raw.githubusercontent.com/action-badges/percentage-badges/badges/.badges/github-tag.svg)
![license](https://raw.githubusercontent.com/action-badges/percentage-badges/badges/.badges/main/package-license.svg)
![node](https://raw.githubusercontent.com/action-badges/percentage-badges/badges/.badges/main/package-node-version.svg)

Example:

```yaml
name: Make Coverage Badge
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: action-badges/create-orphan-branch@0.1.1
        with:
          branch-name: badges

      - name: Make Coverage Badge
        uses: action-badges/percentage-badges@0.3.1
        with:
          file-name: coverage.svg
          badge-branch: badges
          github-token: '${{ secrets.GITHUB_TOKEN }}'
          coverage-file-name: ./coverage.xml
```

All of the standard action-badges [parameters](https://github.com/action-badges/core/blob/main/docs/github-action.md#parameters) can also be used.
