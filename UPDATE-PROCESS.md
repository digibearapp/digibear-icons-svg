# Update process

- Bump version number in package.json
- Update all dependencies to latest version
  —> double check newly updated versions
- Run `yarn` in the command line
- Run `yarn generate-icons`
- Run `yarn build`
- Run `npm publish --access public`
- Run `yarn update-git`
