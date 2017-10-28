const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: './public/javascripts/bundle.js'
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
		  test: /\.(html)$/,
		  use: {
			loader: 'html-loader',
			options: {
				minimize: true
			}
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

