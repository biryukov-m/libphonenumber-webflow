const path = require('path');
const miniCss = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.ts',
  // mode: 'development',
  mode: 'production',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist') // Serve files from the 'dist' directory
    },
    watchFiles: ['scss/**/*.scss'], // Watch SCSS files
    open: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.(s*)css$/,
        use: [miniCss.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new miniCss({
      filename: 'css/style.css'
    })
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};
