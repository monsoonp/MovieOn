import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Nav, Navbar, NavbarBrand, NavLink, Row, Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SpinLoader from "../components/util/SpinLoader";

// material ui
// https://mui.com/material-ui/getting-started/installation/

// moive api
// https://yts.torrentbay.to/api
// https://www.kobis.or.kr/kobisopenapi/homepg/apiservice/searchServiceInfo.do

// naver api
// https://developers.naver.com/docs/serviceapi/search/movie/movie.md

/*
// ///bootstrap / reactstrap
// https://reactstrap.github.io/?path=/story/home-installation--page

*/
function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    // const response = await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year");
    const response = await fetch("https://yts.mx/api/v2/list_movies.json?sort_by=year");
    const json = await response.json();
    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  // console.log(movies);

  return (
    <div className={styles.container}>
      {/*
        <div className={styles.loader}>
          <Button color="primary" disabled>
            <Spinner color="light" size="sm" /> <span>Loading...</span>
          </Button>
        </div>
      */}
      {loading ? (
        <SpinLoader />
      ) : (
        <Container fluid>
          <Navbar className="" color="dark" dark>
            <NavbarBrand color="white">
              <Link to={`/`}>HOME</Link>
            </NavbarBrand>
            <Nav className="me-auto" navbar>
              <NavLink href="/MovieOn/domestic">국내</NavLink>
            </Nav>
          </Navbar>
          {/* <div  className={styles.movies}> </div>*/}
          <Row>
            {movies.map((movie, idx) => (
              <Movie
                idx={idx}
                key={movie.id}
                id={movie.id}
                title={movie.title}
                coverImg={movie.medium_cover_image}
                year={movie.year}
                summary={movie.summary}
                genres={movie.genres}
                imdb={movie.imdb_code}
              />
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Home;
