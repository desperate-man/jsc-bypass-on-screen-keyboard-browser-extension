const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { devDependencies, version } = require('./package.json');
const { NormalModuleReplacementPlugin, DefinePlugin, IgnorePlugin } = webpack;

const DIST = path.resolve(__dirname, './dist');
const SOURCE = path.resolve(__dirname, './src');
const RESOURCES = path.resolve(__dirname, './resources');
const INDEX_TEMPLATE = path.resolve(RESOURCES, './template.html');
const MANIFEST = path.resolve(RESOURCES, './manifest.json');

const SRC_TAB = path.resolve(SOURCE, 'tab');
const SRC_BACKGROUND = path.resolve(SOURCE, 'background');
const SRC_POPUP = path.resolve(SOURCE, 'popup');

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
        {
          test: /\.json$/i,
          use: 'json-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.html$/,
          use: 'html-loader',
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
  ];

  if (process.env.NODE_ENV === 'production') {
    return [
      ...common,
      new UglifyJsPlugin({
        test: /\.js($|\?)/i,
        uglifyOptions: {
          ie8: false,
          ecma: 7,
          warnings: false,
          mangle: false,
          compress: true,
          output: {
            ascii_only: true,
            beautify: false,
          },
        },
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

const backgroundConfig = Object.assign({}, getBaseConfig(), {
  entry: {
    background: path.resolve(SRC_BACKGROUND, './background.js'),
  },
  output: {
    filename: '[name].js',
    path: DIST,
  },
  plugins: [
    ...getBasePlugins(),
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
  ],
});

const popupConfig = Object.assign({}, getBaseConfig(), {
  entry: {
    popup: path.resolve(SRC_POPUP, './popup.js'),
  },
  output: {
    filename: '[name].js',
    path: DIST,
  },
  plugins: [
    ...getBasePlugins(),
    new CopyWebpackPlugin([
      {
        from: MANIFEST,
        transform: contents => {
          console.log('TEST', contents);
          const manifest = JSON.parse(contents.toString());
          manifest.version = version;
          return JSON.stringify(manifest, undefined, 2);
        },
      },
    ]),
    new HtmlWebpackPlugin({
      title: 'popup',
      template: INDEX_TEMPLATE,
      filename: 'popup.html',
      inject: 'body',
    }),
  ],
});

module.exports = [tabConfig, backgroundConfig, popupConfig];
