const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { devDependencies, version } = require('./package.json');
const { NormalModuleReplacementPlugin, DefinePlugin, IgnorePlugin } = webpack;

const DIST = path.resolve(__dirname, './dist');
const SOURCE = path.resolve(__dirname, './src');
const RESOURCES = path.resolve(__dirname, './resources');
const MANIFEST = path.resolve(RESOURCES, './manifest.json');

const SRC_TAB = path.resolve(SOURCE, 'tab');

function getBaseConfig() {
  const config = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devtool: 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.json'],
    },
  };

  return config;
}

function getBasePlugins() {
  const common = [
    new DefinePlugin({
      __VERSION__: JSON.stringify(version),
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new CopyWebpackPlugin([
      {
        from: MANIFEST,
        transform: contents => {
          const manifest = JSON.parse(contents.toString());
          manifest.version = version;
          return JSON.stringify(manifest, undefined, 2);
        },
      },
    ]),
  ];

  if (process.env.NODE_ENV === 'production') {
    return [
      ...common,
      new TerserPlugin({
        test: /\.js($|\?)/i,
      }),
    ];
  }

  return [...common];
}

const tabConfig = Object.assign({}, getBaseConfig({ addFileHash: false, imageLoader: 'file-loader' }), {
  entry: path.resolve(SRC_TAB, './tab.js'),
  output: {
    filename: 'tab.js',
    path: DIST,
  },
  plugins: [...getBasePlugins()],
});

module.exports = [tabConfig];
