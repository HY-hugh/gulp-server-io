/**
 * The generated server code are identical on both side anyway
 */
const fs = require('fs');
const http = require('http');
const https = require('https');
/**
 * @param {object} app the connect app
 * @param {object} config options
 * @return {object} http(s) webserver
 */
module.exports = function(app, config) {
  let webserver;
  if (config.https) {
    let opts;
    if (config.https.pfx) {
      opts = {
        pfx: fs.readFileSync(config.https.pfx),
        passphrase: config.https.passphrase
      };
    } else {
      opts = {
        key: fs.readFileSync(config.https.key || config.devKeyPem),
        cert: fs.readFileSync(config.https.cert || config.devCrtPem)
      };
    }
    webserver = https.createServer(opts, app);
  } else {
    webserver = http.createServer(app);
  }
  webserver.listen(config.port, config.host, config.callback);
  // Return it
  return webserver;
};
