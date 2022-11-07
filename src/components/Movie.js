import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardFooter, CardTitle, Col } from "reactstrap";
import styles from "./Movie.module.css";

function Movie({ id, title, coverImg, year, summary, genres }) {
  const slicedSummary = summary.split(" ").length > 50 ? `${summary.split(" ").slice(0, 50).join(" ")} ...` : summary;

  return (
    <Col className="my-5 mx-auto" sm="5">
      <Card>
        <CardTitle className="mx-3 mb-0">
          <div className={styles.movie}>
            <h2 className={styles.movie__title}>
              <Link to={`/movie/${id}`}>{title}</Link>
            </h2>
            <img className={styles.movie__img} src={coverImg} alt={title} />
          </div>
        </CardTitle>
        {/* <CardSubtitle></CardSubtitle> */}
        {/* <CardBody><h3 className={styles.movie__year}></h3></CardBody> */}
        <CardBody>
          <p>{slicedSummary}</p>
        </CardBody>
        <CardFooter>
          <Badge className="float-start mx-3 mt-1" color="primary">
            {year}
          </Badge>
          <ul className={styles.movie__genres}>
            {genres.map((g, idx) => (
              <li key={idx}>{g}</li>
            ))}
          </ul>
        </CardFooter>
      </Card>
    </Col>
  );
}

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  coverImg: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
