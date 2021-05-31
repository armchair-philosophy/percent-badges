# cobertura-coverage-xml-badges

Serverless coverage badge from cobertura XML coverage file with Github Actions.

![build](https://raw.githubusercontent.com/action-badges/cobertura-coverage-xml-badges/badges/.badges/main/build-status.svg)
![coverage](https://raw.githubusercontent.com/action-badges/cobertura-coverage-xml-badges/badges/.badges/main/coverage.svg)
![tag](https://raw.githubusercontent.com/action-badges/cobertura-coverage-xml-badges/badges/.badges/github-tag.svg)
![license](https://raw.githubusercontent.com/action-badges/cobertura-coverage-xml-badges/badges/.badges/main/package-license.svg)
![node](https://raw.githubusercontent.com/action-badges/cobertura-coverage-xml-badges/badges/.badges/main/package-node-version.svg)

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
      - name: Checkout
        uses: actions/checkout@v2

      - name: Make Coverage Badge
        uses: action-badges/cobertura-coverage-xml-badges@0.1.0
        with:
          file-name: coverage.svg
          github-token: '${{ secrets.GITHUB_TOKEN }}'
          coverage-file-name: ./coverage.xml
```

All of the standard action-badges [parameters](https://github.com/action-badges/core/blob/main/docs/github-action.md#parameters) can also be used.
