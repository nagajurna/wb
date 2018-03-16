const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  module: {
	  rules: [
		{
		  test: /\.js$/,
		  exclude: /node_modules/,
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
		},
		{
		  test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
           'file-loader'
          ]
	    }
	  ]
  },
  plugins: [
	  new UglifyJSPlugin({
		  sourceMap: true
	  })
  ]

};

