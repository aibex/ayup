# Releasing

This repository is in transition to `semantic-release` for release automation. This file is both steps for releasing currently, as well as remaining tasks on the way to 0-human releases.

# Current Status

Releases are ran manually using `npm run release`. The npm release script is using `semantic-release` under the hood.

# Remaining Steps

- [ ] Create a `next` branch for receiving merge requests
- [ ] Set `next` to the default PR target branch
- [ ] Add github job to auto-publish to npm @ `next` when the `next` branch passes all tests
- [ ] Add github job to auto-publish to npm @ `[version]` when the `master` branch passes all tests
  - [ ] Ensure `CHANGELOG.md` is being generated
