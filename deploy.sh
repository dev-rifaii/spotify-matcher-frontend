
set -e

npm run build

cd dist

git init
git add -A
git commit -m 'Deploy'
git push -f git@github.com:dev-rifaii/spotify-matcher-frontend.git master:gh-pages

cd -