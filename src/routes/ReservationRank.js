import { useEffect, useState } from "react";
import { Container, Row } from "reactstrap";

import SpinLoader from "../components/util/SpinLoader";
import MovieNav from "../components/nav/Nav.js";
import MovieRankReservation from "../components/MovieRankReservation";
import timeSet from "../components/util/TimeSetter";

function Reservation() {
  const [movies, setMovies] = useState([]);

  // 예매 순위 정보 가져오기
  const getMovieRank = async () => {
    const res = await fetch("api/movie/rank/reservation");
    const json = await res.json();

    console.log(json);
    setMovies(json);
  };

  useEffect(() => {
    getMovieRank();
  }, []);

  return (
    <div>
      <Container fluid>
        <MovieNav />
        {/* 국내 영화 목록 */}
        <Row>
          {movies.map((movie, idx) => (
            <MovieRankReservation
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
    </div>
  );
}

export default Reservation;
