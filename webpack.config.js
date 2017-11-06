const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: './public/liber.js'
  },
  module: {
	  rules: [
		{
		  test: /\.js$/,
		  use: {
			loader: 'babel-loader',
			options: {
			  presets: ['env']
			}
		  }
		},
		{
			test: /\.css$/,
			use: [ 'style-loader', 'css-loader' ]
		},
		{
		  test: /\.ejs$/,
		  use: {
			loader: 'ejs-compiled-loader'
		  }
		}
	  ]
  }
  //plugins: [
	  //new UglifyJSPlugin({
		  //sourceMap: true
	  //})
  //]

};

