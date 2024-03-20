import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardFooter, CardTitle, Col, Row, Table, UncontrolledTooltip } from "reactstrap";
import { motion } from "framer-motion";
import styles from "./Movie.module.css";

function Movie({ rank, title, audiCount, audiAcc, scrnCnt, date }) {
  // notation - “standard” (기본값), scientific, engineering, compact
  const countFormat = Intl.NumberFormat("ko-KR", { notation: "compact", numeric: "auto" });
  const [data, setData] = useState({});

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
          duration: 1,
        },
      },
    };
  };

  const textSplitter = (text) => {
    return text.replaceAll("|", ", ").replace(/,\s*$/, "");
  };

  useEffect(() => {}, []);

  return (
    <Col className="my-5 mx-auto" sm="5">
      <motion.div variants={card(parseInt(rank))} initial="hidden" animate="show" viewport={{ once: true, amount: 0.8 }}>
        <Card>
          <CardTitle className="mx-3 mb-0">
            {/* <div className={styles.movie}> */}
            <div>
              <Row>
                <Col>
                  <h2 className={styles.movie__rank}>{rank}</h2>
                  {/* TODO: 이미지 확대 모션 추가 */}
                  <img className={styles.movie__img2} src={data.image} alt={data.title} />
                </Col>
                <Col>
                  <Row>
                    <h2 id={`info_${rank}`} className={styles.movie__title}>
                      {/* <Link to={``}></Link> */}
                      <a href={data.link} target="_blank" rel="noreferrer">
                        {title}
                      </a>
                    </h2>
                    <UncontrolledTooltip placement="left" target={`info_${rank}`}>
                      네이버 영화
                    </UncontrolledTooltip>

                    <hr />
                  </Row>

                  <Row>
                    <Table hover bordered={false} responsive>
                      <thead>
                        <tr>
                          <th id={`director_${rank}`} className="text-end" colSpan={2} scope="row">
                            {data.director && textSplitter(data.director)}
                          </th>
                        </tr>
                      </thead>
                      <UncontrolledTooltip placement="right" target={`director_${rank}`}>
                        감독
                      </UncontrolledTooltip>
                      <tbody>
                        <tr>
                          <td>금일 관객</td>
                          <td>{countFormat.format(audiCount)} 명</td>
                        </tr>
                        <tr>
                          <td>누적 관객</td>
                          <td>{countFormat.format(audiAcc)} 명</td>
                        </tr>
                        <tr>
                          <td>상영관</td>
                          <td>{scrnCnt}</td>
                        </tr>
                        <tr>
                          <td id={`actor_${rank}`} className="text-muted small" colSpan={2}>
                            {data.actor && textSplitter(data.actor)}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    <UncontrolledTooltip placement="bottom" target={`actor_${rank}`}>
                      출연
                    </UncontrolledTooltip>
                  </Row>
                </Col>
              </Row>
            </div>
          </CardTitle>
          {/* <CardSubtitle></CardSubtitle> */}
          {/* <CardBody><h3 className={styles.movie__year}></h3></CardBody> */}
          <CardBody>{/* <p>영화 상세</p> */}</CardBody>
          <CardFooter>
            <Row>
              <Col>
                <Badge className="float-start mx-3 mt-1" color="primary">
                  개봉일 : {date}
                </Badge>
              </Col>
            </Row>
          </CardFooter>
        </Card>
      </motion.div>
    </Col>
  );
}

Movie.propTypes = {
  rank: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Movie;
