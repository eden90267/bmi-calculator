const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');

const ENV = process.env.NODE_ENV || 'development';
const DEV_MODE = ENV === 'development';
console.log('DEV_MODE:', DEV_MODE);

const toFilename = (name, ext = 'js') => {
  const units = [name, '.', ext];
  if (!DEV_MODE) {
    const hashStr = (ext === 'css' ? '-[contenthash]' : '-[chunkhash]');
    units.splice(1, 0, hashStr);
  }
  return units.join('');
};

const config = {
  context: path.join(__dirname, '/src'),
  entry: {
    app: ['./js/app.js'],
    vendor: ['react', 'react-dom', 'jquery', 'bootstrap-sass/assets/javascripts/bootstrap.min', 'bootstrap-sass/assets/stylesheets/_bootstrap.scss', 'moment'],
  },
  output: {
    filename: toFilename('[name]'),
    path: path.resolve(__dirname, 'dist'),
    publicPath: DEV_MODE ? 'http://localhost:3000/' : '',
  },
  devtool: 'source-map',
  resolve: {
    modules: [
      path.resolve('src/js'),
      path.resolve('src/css'),
      path.resolve('src/img'),
      path.resolve('node_modules'),
    ],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        include: path.resolve('src/js'),
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true },
            },
          ],
        }),
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|ico)(\?\S*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2048,
              name: '[path][name].[ext]?[hash:10]',
            },
          },
        ],
        include: /node_modules/,
        exclude: path.resolve('src/img'),
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2048,
              name: '[path][name].[ext]?[hash:10]',
            },
          },
          {
            loader: 'image-webpack-loader', // 慢，建議用gulp做壓K
            options: {
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '90-100',
                speed: 4,
              },
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
            },
          },
        ],
        include: path.resolve('src/img'),
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        use: 'pug-loader',
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': DEV_MODE ? "'development'" : '"production"',
    }),
    new HtmlWebpackPlugin({
      template: 'index.pug',
      data: {
        DEV_MODE,
      },
    }),
    new ExtractTextPlugin(toFilename('css/[name]', 'css')),
    new ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
    }),
  ],
  devServer: {
    contentBase: 'dist',
    port: 3000,
    stats: {
      chunks: false,
    },
  },
};

module.exports = config;
