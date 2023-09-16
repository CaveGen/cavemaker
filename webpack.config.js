const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		src: './client/App.jsx',
	},
	output: {
		path: path.resolve(__dirname, '/build'),
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
		host: 'localhost',
		port: 8080,
		hot: true,
		static: {
			directory: path.resolve(__dirname, 'build'),
		},
		proxy: {
			'/': 'http://localhost:3000',
		},
		compress: true,
		historyApiFallback: true, // This will redirect 404s to /index.html
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: 'Development',
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
