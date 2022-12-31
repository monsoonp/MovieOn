import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardFooter, CardTitle, Col } from "reactstrap";
import { motion } from "framer-motion";
import styles from "./Movie.module.css";

function Movie({ idx, id, title, coverImg, year, summary, genres, imdb }) {
  const slicedSummary = summary.split(" ").length > 70 ? `${summary.split(" ").slice(0, 70).join(" ")} ...` : summary;

  const card = (idx) => {
    return {
      hidden: { opacity: 0, scale: 0, x: 0, rotate: -30 },
      show: {
        opacity: 1,
        scale: 1,
        x: 0,
        rotate: 0,
        transition: {
          // delay: idx * 0.2,
          // delayChildren: 0.3,
          // staggerChildren: 0.2,
          // ease: "easeInOut",
          type: "spring",
          bounce: 0.3,
          duration: 0.5,
        },
      },
    };
  };

  return (
    <Col className="my-5 mx-auto" sm="5">
      <motion.div variants={card(idx)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.8 }}>
        <Card>
          <CardTitle className="mx-3 mb-0">
            <div className={styles.movie}>
              <h2 className={styles.movie__title}>
                <Link to={`/movie/${id}`}>{title}</Link>
              </h2>

              {/* <a href={`https://www.imdb.com/title/${imdb}`} target="_blank" rel="noopener noreferrer"> </a> */}
              <img
                className={styles.movie__img}
                src={coverImg}
                alt={title}
                onClick={() => {
                  window.open(`https://www.imdb.com/title/${imdb}`, "_blank");
                }}
              />
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
      </motion.div>
    </Col>
  );
}

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  coverImg: PropTypes.string,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
