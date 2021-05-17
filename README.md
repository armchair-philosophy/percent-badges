# cobertura-coverage-xml-badges

Serverless coverage badge from cobertura XML coverage file with Github Actions.

[![Run tests](https://github.com/action-badges/cobertura-coverage-xml-badges/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/action-badges/cobertura-coverage-xml-badges/actions/workflows/test.yml)
[![Build Dist](https://github.com/action-badges/cobertura-coverage-xml-badges/actions/workflows/build-dist.yml/badge.svg?branch=main)](https://github.com/action-badges/cobertura-coverage-xml-badges/actions/workflows/build-dist.yml)

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
        uses: action-badges/cobertura-coverage-xml-badges@master
        with:
          file-name: coverage.svg
          github-token: '${{ secrets.GITHUB_TOKEN }}'
          coverage-file-name: ./coverage.xml
```

All of the standard action-badges [parameters](https://github.com/action-badges/core/blob/main/docs/github-action.md#parameters) can also be used.
