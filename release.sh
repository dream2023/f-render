#!/bin/bash
npm run lint
npm run build
npx standard-version
npm publish --registry http://registry.npmjs.org
git push --follow-tags origin master
git push gitee
npx gren release --override
