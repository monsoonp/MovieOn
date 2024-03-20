import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import MovieNav from "../components/nav/Nav.js";
import MovieSlider from "../components/MovieSlider";

// TODO: 각 ott 서비스 로딩 추가
const OttServices = (props) => {
  const { ott, movie_list } = props;
  console.log(ott, movie_list);
  return (
    <Col md="12">
      <Card>
        <CardHeader className="bg-dark text-light fw-bold text-center h3">{ott.toUpperCase()} 인기 영화</CardHeader>
        <CardBody className="bg-dark">{movie_list && <MovieSlider ott={ott} movie_list={movie_list} />}</CardBody>
      </Card>
    </Col>
  );
};

function OttRank() {
  // ott service list
  const otts = ["tving", "wavve", "watcha"];
  const [movies, setMovies] = useState({});

  // get ott movie rank
  const getOttMovieRank = async (ott_service) => {
    const res = await fetch(`api/movie/rank/ott/${ott_service}`);
    const json = await res.json();
    console.log(ott_service, json);
    setMovies((prev) => {
      return { ...prev, [ott_service]: json };
    });
  };

  useEffect(() => {
    otts?.forEach((ott) => getOttMovieRank(ott));
  }, []);

  return (
    <div>
      <Container fluid>
        <MovieNav />
        {/* OTT 서비스 별 영화 목록 */}
        <Row>
          <Col md="1"></Col>
          <Col>
            {otts?.map((ott) => (
              <Row key={ott} className="my-2">
                {/* <OttServices ott={ott} movie_list={movies[ott]} /> */}
                <OttServices ott={ott} movie_list={movies[ott]} />
              </Row>
            ))}
          </Col>
          <Col md="1"></Col>
        </Row>
      </Container>
    </div>
  );
}

export default OttRank;
