var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	//devtool: 'cheap-module-eval-source-map',
	//https://github.com/webpack/webpack/issues/91
	devtool: '#eval-source-map',
	entry: [
		'eventsource-polyfill', // necessary for hot reloading with IE
		'webpack-hot-middleware/client',
		'./src/index'
	],
	resolve: {
		extensions: ["", ".js", ".jsx", ".css"]
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin("css", "style.css")
	],
	module: {
		loaders: [{
			test: /\.jsx?/,
			include: path.join(__dirname, 'src'),
			loader: 'babel'
		}, {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract("style-loader", "css-loader")
		}]
	}
};