import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Home.module.css";
import { Button, Spinner } from "reactstrap";
import SpinLoader from "../components/util/SpinLoader";

function Detail() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [movieData, setMovieData] = useState({});
  // console.log(id);
  const getMovie = async () => {
    const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
    const json = await response.json();
    // console.log(json);
    setMovieData(() => json.data.movie);
    setLoading(false);
    return json;
  };

  useEffect(() => {
    // https://yts.mx/api/v2/movie_details.json?movie_id=
    getMovie();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {loading ? (
        /**
        <div className={styles.loader}>
          <Button color="primary" disabled>
            <Spinner color="white" size="sm" /> <span>Loading...</span>
          </Button>
        </div>
        */
        <SpinLoader />
      ) : (
        <div>
          <Link to={`/`}>
            <h1>
              {/* {id} */}

              <div>
                {movieData.title} ({movieData.year})
              </div>
            </h1>
          </Link>
          <img src={movieData.small_cover_image} alt={movieData.title} />
          <ul>
            <li>{movieData.rating} ☆(Rating)</li>
            <li>{movieData.runtime} ⏱(Min)</li>
            <li>{`${movieData.genres}`}</li>
            <li>{movieData.description_intro}</li>
            {/* <li>{movieData.description_full}</li> */}
          </ul>
          <hr />
          <img src={movieData.background_image_original} alt={movieData.title} />
        </div>
      )}
    </div>
  );
}

export default Detail;
