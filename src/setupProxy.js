const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/hotels",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
      logLevel: "debug",
    })
  );


  
  app.use(
    "/api/decode",
    createProxyMiddleware({
      target: "https://tap-api-v2.proofpoint.com/v2/url/decode",
      changeOrigin: true,
      logLevel: "debug",
      pathRewrite: {
        '/api/decode': ''
      }
    })
  );


};