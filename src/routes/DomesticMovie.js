import { useEffect, useState } from "react";
import MovieNat from "../components/MovieNat";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Nav, Navbar, NavbarBrand, NavLink, Row, Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";
import SpinLoader from "../components/util/SpinLoader";

// 영화 상세
// https://www.kobis.or.kr/kobisopenapi/homepg/apiservice/searchServiceInfo.do
// > http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=f5eef3421c602c6cb7ea224104795888&movieCd=20124079
// key - 7a526456eb8e084eb294715e006df16f

// 크롤링 사이트 - https://www.kobis.or.kr
// https://www.kobis.or.kr/kobis/business/main/searchMainDailyBoxOffice.do
// 이미지 예시 https://www.kobis.or.kr/common/mast/movie/2022/09/thumb_x289/thn_9f0a6c11d44348d8b5dc432d031fe5ce.jpg

function Domestic() {
  const apiBase = "https://kobis.or.kr";
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  axios.defaults.withCredentials = true;

  const getMovies = async () => {
    // https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=20221101
    const yesterday = dayjs().subtract(1, "day").format("YYYYMMDD");

    const response = await fetch(
      `${apiBase}/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=${yesterday}`
    );
    const json = await response.json();

    setMovies(json.boxOfficeResult.dailyBoxOfficeList);
    setLoading(false);
    // console.log(json.boxOfficeResult.dailyBoxOfficeList);
  };

  const getMovies2 = async () => {
    const response = await fetch(`${apiBase}/kobis/business/main/searchMainDailyBoxOffice.do`, {
      method: "GET",
      // mode: "no-cors", // no-cors, *cors, same-origin
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      // credentials: "same-origin", // include, *same-origin, omit
    });

    /*
    const response = await axios.post(`${apiBase}/kobis/business/main/searchMainDailyBoxOffice.do`);
    */
    const json = await response.json();
    console.log("data", json);
  };

  useEffect(() => {
    // console.log(movies);
    getMovies();
    getMovies2();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <SpinLoader />
      ) : (
        <Container fluid>
          <Navbar className="" color="dark" dark>
            <NavbarBrand color="white">
              <Link to={`/`}>Home</Link>
            </NavbarBrand>
            <Nav className="me-auto" navbar>
              <NavLink href="/MovieOn/domestic">국내</NavLink>
            </Nav>
          </Navbar>
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
