
// "build": "webpack --config webpack/webpack.config.js",

const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

const tools = require('../scripts/tools');

const dirPath = path.resolve(__dirname, `../src`);
const fileNames = {}
tools.readDirAll(dirPath, (file) => {
	if (file.match(/(\.js|\.ts)$/)) {
		// fileNames[`${(file.match(/[^\\/]+\.[^\\/]+$/) || []).pop()}`.slice(0, -3)] = ".\\" + path.relative(__dirname,file)
		fileNames[`${path.relative(dirPath, file)}`.slice(0, -3)] = ".\\" + path.relative(__dirname, file)
	}
});
console.log(fileNames)

let libs = [
	"https://pyscript.net/releases/2022.12.1/pyscript.css",
	"https://pyscript.net/releases/2022.12.1/pyscript.js"
]
const http = require('https'); // or 'https' for https:// URLs
const fs = require('fs');

for (let l of libs) {
	let filename = l.match(/[^\\/]+\.[^\\/]+$/).pop()
	let local_path = path.resolve(__dirname, `../public/loadLib`)
	// let filename = __dirname + filename
	if (!fs.existsSync(local_path + "/" + filename)) {
		console.log("create", filename)
		const file = fs.createWriteStream(local_path + "/" + filename, { autoClose: true });
		const request = http.get(l, function (response) {
			response.pipe(file);

			// after download completed close filestream
			file.on("finish", () => {
				file.close();
				console.log("Download Completed");
			});
		});
	}

}

module.exports = {
	mode: "production",
	entry: fileNames,
	output: {
		path: path.join(__dirname, "../dist"),
		filename: "[name].js",
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
		fallback: {
			// url: require.resolve("url/"),
			// stream: require.resolve("stream-browserify"),
			// os: require.resolve("os-browserify/browser"),
			// util: require.resolve("util/"),
			// path: require.resolve("path-browserify"),
			// child_process: false,
			// fs: require.resolve("browserify-fs"),
			// zlib: require.resolve("browserify-zlib"),
			// https: require.resolve("https-browserify"),
			// http: require.resolve("stream-http"),
			// net: require.resolve("net-browserify"),
			// crypto: require.resolve("crypto-browserify"),
			// tls: require.resolve("tls-browserify"),
			// assert: require.resolve("assert/"),
			// buffer: require.resolve("buffer"),
			// process: false
		}
	},
	externals: [
		// 'child_process'
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx|tsx|ts)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				exclude: /built/,
			},
			{
				test: /\.html$/,
				loader: "raw-loader",
			},
		],
	},
	plugins: [
		// new webpack.ProvidePlugin({
		// 	process: 'process/browser',
		// 	Buffer: ['buffer', 'Buffer'],
		// }),
		new CopyPlugin({
			patterns: [
				{ from: ".", to: ".", context: "public" },
				{ from: "./src/module/py", to: "./module/py" },
				// { from: "./src/loadLib", to: "./loadLib" },
			]
		}),
	],
};
