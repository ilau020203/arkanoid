const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')


const isDev = true



const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`



const plugins = () => {
  const base = [
    new HTMLWebpackPlugin({
      template: './index.html',

    }),
    new CleanWebpackPlugin(),
    
  ]


  return base
}

module.exports = {
  mode: 'development',
  entry: {
    main: ['./public/js/index.js'],
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 4200,
    hot: isDev
  },
  devtool: isDev ? 'source-map' : '',
  plugins: plugins(),
 
 
}