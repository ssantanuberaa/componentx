const path = require('path');

module.exports = {
	watch : true,
	mode : "development",
	entry: './index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'build'),
	},
	resolve: {
		alias: {
			x: "javasx"
		}
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["css-loader"],
			},
		],
	},
	optimization: {
        minimize: true
    },
};