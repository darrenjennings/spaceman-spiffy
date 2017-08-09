const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  context: __dirname,
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/ClientApp.jsx'
  ],
  devtool: 'cheap-eval-source-map',
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[hash].js',
    publicPath: '/spaceman-spiffy/public/'
  },
  devServer: {
    hot: true,
    publicPath: '/public/',
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  plugins: [new webpack.NamedModulesPlugin()],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};

const plugins = [
  new HtmlWebpackPlugin({
    title: 'Calvin and Hobbes Search',
    template: 'src/index.ejs',
    filename: '../index.html'
  })
];

if (process.env.NODE_ENV === 'production') {
  config.entry = './src/ClientApp.jsx';
  config.devtool = false;
  config.plugins = plugins;
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins = plugins;
}

module.exports = config;
