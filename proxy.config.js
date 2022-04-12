const Agent = require('agentkeepalive');

const backendProxyConfig = {
  target: 'http://tst-irm01:8060/',
  secure: false,
  loglevel: 'debug',
  agent: new Agent({
    maxSockets: 100,
    keepAlive: true,
    maxFreeSockets: 10,
    keepAliveMsecs: 1000,
    timeout: 60000,
    freeSocketTimeout: 30000,
  }),
  onProxyRes: (proxyRes) => {
    let key = 'www-authenticate';
    proxyRes.headers[key] = proxyRes.headers[key] && proxyRes.headers[key].split(',');
  },
};

module.exports = {
  '/Main/api': backendProxyConfig,
  '/InstallationQueue/api': backendProxyConfig,
  '/Incidents/api': backendProxyConfig,
  '/ServicesInstallation/api': backendProxyConfig,
};
