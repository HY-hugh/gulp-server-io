/* eslint no-useless-escape: 0 */
/**
 * Seperate the watch method and report it
 * useful for other
 */
const chalk = require('chalk');
const bacon = require('baconjs');
const chokidar = require('chokidar');
const logutil = require('./log');
/**
 * Watch folder method
 * @param {array} filePaths to watch
 * @param {boolean} verbose to output or not
 * @return {function} bacon method
 */
module.exports = function(filePaths, verbose) {
  return bacon.fromBinder(sink => {
    filePaths.forEach(file => {
      const webroot = file.path;
      if (verbose) {
        logutil(chalk.white('[Watcher]'), webroot);
      }
      let watcher = chokidar.watch(webroot, {
        ignored: /(^|[\/\\])\../,
        ignoreInitial: true
      });
      watcher.on('all', (event, path) => {
        sink({ event: event, path: path });
        return () => {
          watcher.close();
        };
      });
    });
  });
};
