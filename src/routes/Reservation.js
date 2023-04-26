import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "reactstrap";

import SpinLoader from "../components/util/SpinLoader";
import MovieNav from "../components/nav/Nav.js";
import MovieReservation from "../components/MovieReservation";
import axios from "axios";

function Reservation() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  // 예매 순위 정보 가져오기
  const getMovieRank = async () => {
    const header_config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const res = await axios.get("movie", header_config);
    // const json = await res.json();
    const { data } = res;
    console.log(data);
    setMovies(data);
    setLoading(false);
  };

  useEffect(() => {
    // getMovies();
    getMovieRank();
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
            {movies.map((movie, idx) => (
              <MovieReservation
                key={movie.titleKorean}
                id={movie.movieId}
                rank={idx + 1}
                admission={movie.admissionCode}
                rate={movie.avgRate}
                title={movie.titleKorean}
                director={movie.directors}
                actor={movie.actors}
                genre={movie.genres}
                image={movie.imageUrl}
                video={movie.videoUrl}
                reservRate={movie.reservationRate}
                plot={movie.plot}
                date={movie.releaseDate}
              />
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Reservation;
