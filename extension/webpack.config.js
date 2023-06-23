const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  devServer: {
    static: { directory: path.resolve(__dirname, './src') },
    historyApiFallback: true
  },
  entry: {
    popup: path.resolve(__dirname, "./src/index-popup.js"),
    options: path.resolve(__dirname, "./src/index-options.js"),
    foreground: path.resolve(__dirname, "./src/index-foreground.js")
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                {
                  'plugins': ['@babel/plugin-proposal-class-properties']
                }
              ]
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.png$/,
        use: ['file-loader']
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  autoprefixer
                ]
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: 'src/popup.html',
      chunks: ['popup']
    }),
    new HtmlWebpackPlugin({
      filename: 'options.html',
      template: 'src/options.html',
      chunks: ['options']
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'foreground.html',
    //   template: 'src/foreground.html',
    //   chunks: ['foreground']
    // }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/manifest.json', to: '[name][ext]' },
        { from: 'src/background.js', to: '[name][ext]' },
        { from: 'src/postScrubber.js', to: '[name][ext]'},
        { from: 'src/inject_script.js', to: '[name][ext]' },
        { from: 'src/images/', to: './images' },
        { from: 'src/displayPosts.css', to: '[name][ext]' }
      ]
    }),
    new CleanWebpackPlugin()
  ]
}