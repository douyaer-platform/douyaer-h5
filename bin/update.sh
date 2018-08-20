#!/bin/bash
git pull
npm run build
git add .
git commit -m 'bugfix'
git push