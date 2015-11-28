module.exports = {
	entry: './client.js',
	output: {
		filename: 'static/js/bundle.js'
	},
	module: {
		loaders: [
			{test: /\.js$/, loader: 'babel-loader'}
		]
	}
};
