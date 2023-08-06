if [ "$1" == "r" ]; then
    npm run build && rm -rf dist
elif [ "$1" == "n" ]; then
    npx vite build && rm -rf dist
elif [ "$1" == "c" ]; then
    npm run coverage
else
    npm run build
fi