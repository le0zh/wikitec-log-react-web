var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        './src/entry/index'
    ],
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [{
            test: /\.jsx?/,
            include: path.join(__dirname, 'src'),
            loader: 'babel'
        }]
    }
};