var webpack = require('webpack')

module.exports = {
	entry: './index.js',
	output: {
		path: 'public',
		filename: 'bundle.js',
		publicPath: '/'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015']
				}
			}
		]
	}/*,
	plugins: process.env.NODE_ENV === 'production' ? [
		//new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin
	] : []*/
}
