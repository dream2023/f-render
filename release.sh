#!/bin/bash
npm run lint
npm run build
npx standard-version
npm publish --registry http://registry.npmjs.org
git push
git checkout master
git merge develop
git push --follow-tags origin master
npx gren release --override
