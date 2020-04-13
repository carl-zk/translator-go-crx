# just for build
sed -i -E 's/.*background\.js.*/    "scripts": ["background.js", "hot-reload.js"],/' dist/manifest.json