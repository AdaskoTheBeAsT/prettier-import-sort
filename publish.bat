xcopy .\LICENSE .\dist\libs\prettier-import-sort\ /Y
xcopy .\README.md .\dist\libs\prettier-import-sort\ /Y
cd dist/libs/prettier-import-sort
npm publish --tag=latest --access public
cd ../../..
