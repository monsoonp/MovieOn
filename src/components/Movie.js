import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardFooter, CardTitle, Col } from "reactstrap";
import { motion } from "framer-motion";
import { UncontrolledTooltip } from "reactstrap";
import styles from "./Movie.module.css";

function Movie({ idx, id, title, coverImg, year, summary, genres, imdb, lang }) {
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
                <Link to={`/detail/${id}`} target="_blank" rel="noopener noreferrer" id={`Detail_${id}`}>
                  {title}
                </Link>
                <UncontrolledTooltip placement="bottom" target={`Detail_${id}`}>
                  영화 상세
                </UncontrolledTooltip>
              </h2>

              {/* <a href={`https://www.imdb.com/title/${imdb}`} target="_blank" rel="noopener noreferrer"> </a> */}
              <motion.a href={`https://www.imdb.com/title/${imdb}`} target="_blank" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
                <img
                  className={styles.movie__img}
                  src={coverImg}
                  alt={title}
                  id={`imdb_${id}`}
                  // onClick={() => {window.open(`https://www.imdb.com/title/${imdb}`, "_blank");}}
                />
                <UncontrolledTooltip placement="right" target={`imdb_${id}`}>
                  imdb
                </UncontrolledTooltip>
              </motion.a>
            </div>
          </CardTitle>
          {/* <CardSubtitle></CardSubtitle> */}
          {/* <CardBody><h3 className={styles.movie__year}></h3></CardBody> */}

          <CardBody>
            <p>{slicedSummary}</p>
          </CardBody>

          <CardFooter>
            <Badge className="float-start mx-0 mt-1" color="primary">
              {year}
            </Badge>
            <Badge className="float-start mx-2 mt-1" color="primary">
              {lang}
            </Badge>
            <ul id={`genre_${id}`} className={styles.movie__genres}>
              {genres && genres.map((genre, idx) => <li key={idx}>{genre}</li>)}
            </ul>
            <UncontrolledTooltip placement="bottom" target={`genre_${id}`}>
              장르
            </UncontrolledTooltip>
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
