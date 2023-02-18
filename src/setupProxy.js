const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/MovieOn/movie",
    createProxyMiddleware({
      target: "http://localhost:8000/",
      changeOrigin: true,
      pathRewrite: { "^/MovieOn": "" },
    })
  );
  app.use(
    "/Movieon/test",
    createProxyMiddleware({
      target: "http://localhost:8000/",
      changeOrigin: true,
      pathRewrite: { "^/MovieOn": "" },
    })
  );
};
