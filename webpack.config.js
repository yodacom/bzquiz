var path = require('path');
var webpack = require('webpack');


module.exports = {
    entry: "./js/app.js",
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /styl$/,
            loader: ['style-loader', 'css-loader', 'stylus-loader']
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]

};
