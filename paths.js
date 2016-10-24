const path = require('path');

const build = './build';
const src = './src';
const staticFiles = path.join(src, 'static', '**/*');

const entryPoints = {
    inject: './src/inject/index.js',
    popup: './src/popup/index.js'
};

module.exports = {
    build,
    src,
    staticFiles,
    entryPoints,
}
