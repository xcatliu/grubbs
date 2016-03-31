#!/bin/bash
set -e

rm -rf deploy-gh-pages
git clone git@github.com:xcatliu/grubbs.git deploy-gh-pages
cd deploy-gh-pages

git checkout gh-pages
git checkout master site

# http://askubuntu.com/questions/269775/mv-directory-not-empty
rsync -a site/ ./
rm -rf site

git add :
git commit -m 'Update gh-pages'
git push origin gh-pages

cd ..
rm -rf deploy-gh-pages
