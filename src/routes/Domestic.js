import { useEffect, useState } from "react";
import MovieNat from "../components/MovieNat";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Nav, Navbar, NavbarBrand, NavLink, Row, Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    // https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=20221101
    const yesterday = dayjs().subtract(1, "day").format("YYYYMMDD");

    const response = await fetch(
      `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=${yesterday}`
    );
    const json = await response.json();
    setMovies(json.boxOfficeResult.dailyBoxOfficeList);
    setLoading(false);
    console.log(json.boxOfficeResult.dailyBoxOfficeList);
  };

  useEffect(() => {
    // console.log(movies);
    getMovies();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <Button color="primary" disabled>
            <Spinner color="white" size="sm" /> <span>Loading...</span>
          </Button>
        </div>
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

export default Home;
