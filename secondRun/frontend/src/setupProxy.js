const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://137.184.194.3:5000',
      changeOrigin: true,
    })
  );
};
