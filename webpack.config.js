const path = require('path');

module.exports = {
    entry: './src/client.js',
    watch: true,
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};