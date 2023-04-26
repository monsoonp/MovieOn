import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "reactstrap";
import dayjs from "dayjs";

import SpinLoader from "../components/util/SpinLoader";
import MovieNav from "../components/nav/Nav.js";
import MovieNat from "../components/MovieNat";
import axios from "axios";

/*
--- CORS 문제있음  ---
파일로 저장하여 사용하거나 backend에서 jsoup 같은 라이브러리 이용 필요

크롤링 사이트 - https://www.kobis.or.kr
https://www.kobis.or.kr/kobis/business/main/searchMainDailyBoxOffice.do
이미지 예시 https://www.kobis.or.kr/common/mast/movie/2022/09/thumb_x289/thn_9f0a6c11d44348d8b5dc432d031fe5ce.jpg

key = 9ce20477c0eaa9705194fd025a51f646
============================

영화 상세 api
https://www.kobis.or.kr/kobisopenapi/homepg/apiservice/searchServiceInfo.do
> http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=f5eef3421c602c6cb7ea224104795888&movieCd=20124079
key - 7a526456eb8e084eb294715e006df16f

============================
 네이버 영화
https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EC%98%81%ED%99%94#

첫 페이지 영화 목록 
https://m.search.naver.com/p/csearch/content/qapirender.nhn?_callback=___MovieAPIforPList_key_68_pkid_nexearch_where_1_start_8_display_s1_dsc_so_%ED%98%84%EC%9E%AC%EC%83%81%EC%98%81%EC%98%81%ED%99%94_q&key=MovieAPIforPList&pkid=68&where=nexearch&start=1&display=8&so=s1.dsc&q=%ED%98%84%EC%9E%AC%EC%83%81%EC%98%81%EC%98%81%ED%99%94
*/

// TODO: 주간 목록으로 변경
function Domestic() {
  const apiUrl = "https://kobis.or.kr";
  const key = "9ce20477c0eaa9705194fd025a51f646";
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  // TODO: 영화 상세 내용 추가
  const getMovies = async () => {
    // https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${key}&targetDt=20221101
    const yesterday = dayjs().subtract(1, "day").format("YYYYMMDD");

    const response = await fetch(
      `${apiUrl}/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${key}&targetDt=${yesterday}`
    );
    const json = await response.json();

    setMovies(json.boxOfficeResult.dailyBoxOfficeList);
    setLoading(false);
    // console.log(json.boxOfficeResult.dailyBoxOfficeList);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <SpinLoader />
      ) : (
        <Container fluid>
          <MovieNav />
          {/* 국내 영화 목록 */}
          <Row>
            {movies.map((movie) => (
              <MovieNat
                key={movie.movieNm}
                id={movie.id}
                rank={movie.rank}
                title={movie.movieNm}
                audiCount={movie.audiCnt}
                audiAcc={movie.audiAcc}
                scrnCnt={movie.scrnCnt}
                date={movie.openDt}
              />
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Domestic;
