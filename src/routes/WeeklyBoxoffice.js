import { useEffect, useState } from "react";
import { Container, Row } from "reactstrap";

import SpinLoader from "../components/util/SpinLoader";
import MovieNav from "../components/nav/Nav.js";
import MovieRankWeeklyBoxoffice from "../components/MovieRankWeeklyBoxoffice";
import timeSet from "../components/util/TimeSetter";

function Domestic() {
  const [boxofficeMovies, SetBoxofficeMovies] = useState([]);

  const getMovieRank = async () => {
    const res = await fetch("api/movie/rank/boxoffice");
    const data = await res.json();
    const { contents } = data;
    console.log("주간 박스오피스 영화 정보", contents);

    SetBoxofficeMovies(contents);
    // setLoading(false);
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
          {boxofficeMovies.map((movie, idx) => {
            const {
              titleKorean,
              countCreditCookie,
              // mainPhoto: { imageUrl },
              countryMovieInformation: {
                releaseDate,
                admissionCode: { code },
              },
              netizenAvgRate,
              plot,
              referenceSite,
              reservation: { audienceDaily, reservationRate },
            } = movie;

            return (
              <MovieRankWeeklyBoxoffice
                key={idx}
                rank={idx + 1}
                title={titleKorean}
                creditCookie={countCreditCookie}
                image={movie.mainPhoto?.imageUrl}
                releaseDate={releaseDate}
                admissionCode={code}
                netizenAvgRate={netizenAvgRate}
                plot={plot}
                referenceSite={referenceSite}
                audienceDaily={audienceDaily}
                reservationRate={reservationRate}
              />
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default Domestic;
