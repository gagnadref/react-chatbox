import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export const CLIENT_DIR = path.resolve(__dirname, 'client');
export const DIST_DIR = path.resolve(__dirname, 'dist');

export const babelLoader = {
  test: /\.js$/,
  include: CLIENT_DIR,
  loader: 'babel-loader',
};

export const cssLoader = {
  test: /\.less$/,
  loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
};

export const aliases = {
  components: path.resolve(CLIENT_DIR, 'components'),
  reducers: path.resolve(CLIENT_DIR, 'reducers'),
  actions: path.resolve(CLIENT_DIR, 'actions'),
};

export const client = {
  name: 'client',
  target: 'web',
  context: CLIENT_DIR,
  entry: './index.js',
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
  },
  module: {
    loaders: [babelLoader, cssLoader],
  },
  resolve: {
    alias: aliases,
  },
  plugins: [
    new ExtractTextPlugin('bundle.css', { allChunks: true }),
  ],
};

export default client;
