const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  const optionsApi = {
    target: "http://localhost:8080/",
    changeOrigin: true,
    logLevel: 'debug',
  };
  app.use(
    createProxyMiddleware(`/`, optionsApi)
  );
};
