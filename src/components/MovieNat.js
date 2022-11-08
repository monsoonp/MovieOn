import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardFooter, CardTitle, Col } from "reactstrap";
import styles from "./Movie.module.css";

function Movie({ key, rank, title, audiCount, audiAcc, scrnCnt, date }) {
  return (
    <Col className="my-5 mx-auto" sm="5">
      <Card>
        <CardTitle className="mx-3 mb-0">
          <div className={styles.movie}>
            <h2>{rank}</h2>
            <h2 className={styles.movie__title}>
              <Link to={``}>{title}</Link>
            </h2>
            {/* <img className={styles.movie__img} src={coverImg} alt={title} /> */}
          </div>
        </CardTitle>
        {/* <CardSubtitle></CardSubtitle> */}
        {/* <CardBody><h3 className={styles.movie__year}></h3></CardBody> */}
        <CardBody>
          <p>영화 상세</p>
        </CardBody>
        <CardFooter>
          <Badge className="float-start mx-3 mt-1" color="primary">
            개봉일 {date}
          </Badge>
          <ul className={styles.movie__genres}>누적 관객: {audiAcc}</ul>
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
