const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './client/main.jsx',
	output: {
		path: path.join(__dirname, '/build'),
		filename: 'bundle.js',
		publicPath: '/',
	},

	module: {
		rules: [
			{
				test: /\.jsx?/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: ['@babel/env', '@babel/react'],
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'], // Note the order here is important
			},
		],
	},

	devServer: {
		static: {
			directory: path.join(__dirname, 'client'),
		},
		compress: true,
		historyApiFallback: true, // This will redirect 404s to /index.html
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: 'Cave',
			template: './client/index.html',
		}),
	],
};

// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//     entry: './client/main.jsx',

//     output: {
//         path: path.join(__dirname, 'build'),
//         filename: 'bundle.js'
//     },

//     module: {
//         rules: [
//             {
//                 test: /\.(js|jsx)$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: 'babel-loader'
//                 }
//             },
//             {
//                 test: /\.css$/,
//                 use: ['style-loader', 'css-loader']
//             }
//         ]
//     },

//     resolve: {
//         extensions: ['.js', '.jsx']
//     },

//     plugins: [
//         new HtmlWebpackPlugin({
//             template: './index.html'
//         })
//     ],

//     devServer: {
//         compress: true,
//         port: 8080,
//         proxy: {
//             '/api': 'http://localhost:3000'
//         },
//         static: {
//             directory: path.join(__dirname, 'public'),
//         },
//         open: true
//     }
// };
