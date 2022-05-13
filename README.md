# filters-pr-checker

## Description
Checks pull requests in the filtering repository running extension instance and adding screenshots before and after pull request

## Usage
### Add GitHub action

[//]: # (TODO update action title)
```
name: "Check pull request"
on:
  pull_request:

jobs:
  run-action:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: maximtop/filters-pr-checker@v1
        with:
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          imgur_client_id: ${{ secrets.IMGUR_CLIENT_ID }}
```

Add IMGUR_CLIENT_ID in the repository secrets. Action requires it in order to publish screenshots (GitHub doesn't allow to upload screenshots in the comments via api). How to register application and get client id can be read here https://api.imgur.com

### Don't forget during pull request creation add url to the website
`url: https://example.org`
