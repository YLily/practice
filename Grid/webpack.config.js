module.exports = {
	entry: './js/grid.js',
	output:{
		path: './src/',
		filename: 'bundle.js'
	},
	devtool: 'source-map',
	externals: {
		'react': 'React'
	},
	module:{
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react']
				}
			}
		]
	}
}