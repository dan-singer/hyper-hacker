const path = require('path');

module.exports = {
    module: {
        rules: [
            // Sass
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            // Babel + React
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ],
    },
    // https://www.robinwieruch.de/minimal-react-webpack-babel-setup
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist/js')
    }
};