// compression library (express앱 미들웨어)- gzip 압축으로 웹앱 속도 증가
const compression = require("compression");
const express = require("express");
const request = require("request");
const http = require("http");
const app = express();
const cors = require("cors");
const server = http.createServer(app);

const { naver_client_id, naver_client_secret, daum_api_key } = require("./keys/api_key.js");

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  compression({
    level: 6, // 압축 정도 설정
    threshold: 100 * 1000, // 압축하지 않는 최소 크기 설정 - 100kb 아래 데이터 압축 안하고 클라이언트에 전송
    // filter - 특정 조건에 따라 압축 여부 결정
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        // header에 x-no-compression이 있으면, 압축하지 않도록 false를 반환한다.
        return false;
      }
      return compression.filter(req, res);
      // 없는 경우에는 압축허용
    },
  })
);

app.get("/test", (req, res) => {
  console.log(req.query, req.body, "received");
  res.send({ hello: "world" });
});

/**
 * 네이버 영화 검색 API
 * 서비스 종료됨
 */
const client_id = naver_client_id;
const client_secret = naver_client_secret;

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
    console.log(body);
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

/*
  // 카카오 영화 순위
  예매 순위 https://movie.daum.net/api/common/reservation/rank
  
  예고편 영상
  https://tv.kakao.com/embed/player/cliplink/{videoUrl_number}?service=kakao_tv&section=channel&autoplay=1&profile=HIGH&wmode=transparent
*/

app.get("/api/movie/rank/reservation", (req, res) => {
  const rest_key = daum_api_key;
  //
  // const api_url = "https://dapi.kakao.com/v2/search/web?query=" + encodeURI("아바타");
  const api_url = "https://movie.daum.net/api/common/reservation/rank";
  var options = {
    url: api_url,
    // headers: { Authorization: `KakaoAK ${rest_key}` },
  };

  request.get(options, function (error, response, body) {
    // console.log(body);
    if (!error && response.statusCode === 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
      // error 429 - 동일 클라이언트 ID로 초당 10회 이상 요청 시 발생
    }
  });
});

/**
 *
 * 다음 현재 상영 순위
 * https://movie.daum.net/api/premovie?page=1&size=20&flag=Y
 *
 * 다음 개봉예정작 예매율 순위
 * https://movie.daum.net/api/premovie?page=1&size=20&flag=C
 */

app.get("/api/movie/rank/boxoffice", (req, res) => {
  //
  // const api_url = "https://dapi.kakao.com/v2/search/web?query=" + encodeURI("아바타");
  const api_url = "https://movie.daum.net/api/premovie?page=1&size=10&flag=Y";
  var options = {
    url: api_url,
  };

  request.get(options, function (error, response, body) {
    // console.log(body);
    if (!error && response.statusCode === 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});

/**
 *   
  tving https://movie.daum.net/api/main/tving/rank
  wavve https://movie.daum.net/api/main/wavve/rank
  watcha https://movie.daum.net/api/main/watcha/rank
  
  daum 영화 상세 정보 
  https://movie.daum.net/moviedb/main?movieId={movieId}
  https://movie.daum.net/api/movie/{movieId}/main
  
 */
app.get("/api/movie/rank/ott/:ott_service", (req, res) => {
  const { ott_service } = req.params;
  //
  // const api_url = "https://dapi.kakao.com/v2/search/web?query=" + encodeURI("아바타");
  const api_url = `https://movie.daum.net/api/main/${ott_service}/rank`;

  var options = {
    url: api_url,
  };

  request.get(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});

server.listen({ port: 8000 }, () => {
  console.log("server listening on 8000...");
});
