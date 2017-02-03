var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
}).listen(8080, 'localhost', function(err, result) {
    if (err) {
        return console.log(err);
    }
    console.log('Listening at http://localhost:8080/');
});


/*
const express = require('express');
const path = require('path');
const app = express();


app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(8080, function () {
    console.log('app listening on port 8080!');
});

module.exports = app;
*/