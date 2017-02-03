// Special thanks to Simon Breiter!
const path = require('path');
module.exports = {
    entry: path.resolve('./src/main.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/assets/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                excluder: /node-modules/,
                loaders: ['react-hot/webpack', 'babel-loader']
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader'
            }
        ]
    },
    devServer: {

    }
}