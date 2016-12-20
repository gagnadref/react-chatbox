import webpack from 'webpack';
import * as config from './webpack.config';

webpack([config.server, config.client], (err, stats) => {
  if (err) return console.error(err.message);
  console.log(stats.toString());
});
