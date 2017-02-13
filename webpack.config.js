var path = require('path');
var webpack = require('webpack');


module.exports = {
    entry: "./js/app.js",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js",
        publicPath: "/build",
    },
    module: {
        loaders: [{
            test: /styl$/,
            loader: ['style-loader', 'css-loader', 'stylus-loader']
        },
            {
                test: /\.html$/,
                loader: 'html-loader',
                query: {
                    minimize: true
                }
            }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]

};
