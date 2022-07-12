import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  // console.log(id);
  const getMovie = async () => {
    const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
    const json = await response.json();
    console.log(json);
    return json;
  };

  useEffect(() => {
    // https://yts.mx/api/v2/movie_details.json?movie_id=
    getMovie();
    // eslint-disable-next-line
  }, []);

  return <h1>Movie Detail {id}</h1>;
}

export default Detail;
