// compression library (express앱 미들웨어)- gzip 압축으로 웹앱 속도 증가
const compression = require("compression");
const express = require("express");
const request = require("request");
const http = require("http");
const app = express();
const cors = require("cors");
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(compression());

app.get("/test", (req, res) => {
  console.log(req.query, req.body, "received");
  res.send({ hello: "world" });
});

// naver movie search - https://developers.naver.com/docs/serviceapi/search/blog/blog.md#node-jsreact proxy error
// https://developers.naver.com/docs/serviceapi/search/movie/movie.md

const client_id = "WQ04NcGLpJkMhJSfDcYN";
const client_secret = "bhE_FVyxbO";

app.post("/movie", function (req, res) {
  // const api_url = "https://openapi.naver.com/v1/search/movie?query=" + encodeURI(req.query.query); // JSON 결과
  // const api_url = `https://openapi.naver.com/v1/search/movie.json?query=${encodeURI("더 퍼스트 슬램덩크")}`;
  const api_url = "https://openapi.naver.com/v1/search/movie.json?query=" + encodeURI(req.body.title);
  var options = {
    url: api_url,
    headers: { "X-Naver-Client-Id": client_id, "X-Naver-Client-Secret": client_secret },
  };
  // console.log(req.params, req.query, req.body);
  // console.log(req.body.title, encodeURI(req.body.title));

  request.get(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
      // error 429 - 동일 클라이언트 ID로 초당 10회 이상 요청 시 발생
    }
  });

  // res.send("end");
});

server.listen({ port: 8000 }, () => {
  console.log("server listening on 8000...");
});
