import PropTypes from "prop-types";
import { useEffect } from "react";
// import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardFooter, CardTitle, Col, Row, Table, UncontrolledTooltip } from "reactstrap";
import { motion } from "framer-motion";
import styles from "./Movie.module.css";

function Movie({
  rank,
  title,
  creditCookie,
  image,
  releaseDate,
  admissionCode,
  netizenAvgRate,
  plot,
  referenceSite,
  audienceDaily,
  reservationRate,
}) {
  // referenceSite 항목 개행문자로 나누기
  const info_links = referenceSite?.split("\n") || [];
  const count_info_links = info_links?.length || 0;
  // "" 값일 경우 이전 링크 가져오기 - 링크 목록 중 마지막에 \n 이 포함되어 있을 경우
  const specific_link = info_links[count_info_links - 1] || info_links[count_info_links - 2];

  // 줄거리 html element 제거
  const new_plot = plot && plot.replace(/<\/?br?>/g, " ");
  // 줄거리 텍스트 량 줄이기
  const compressed_plot = new_plot.split(" ").length > 30 ? `${new_plot.split(" ").slice(0, 30).join(" ")} ...` : new_plot;

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
                  <img className={styles.movie__img2} src={image} alt={image ? image : title} loading="lazy" />
                </Col>
                <Col>
                  <Row>
                    <h2 id={`info_${rank}`} className={styles.movie__title}>
                      {/* <Link to={``}></Link> */}
                      <a href={specific_link} target="_blank" rel="noreferrer">
                        {title}
                      </a>
                    </h2>
                    {specific_link && (
                      <UncontrolledTooltip placement="left" target={`info_${rank}`}>
                        영화 정보
                      </UncontrolledTooltip>
                    )}

                    <hr />
                  </Row>

                  <Row>
                    <Table hover bordered={false} responsive>
                      <thead>
                        <tr>
                          <th className="text-end" colSpan={2} scope="row">
                            {admissionCode}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>네티즌 평점</td>
                          <td>{netizenAvgRate}</td>
                        </tr>
                        <tr>
                          <td>일일 관객</td>
                          <td>{audienceDaily}</td>
                        </tr>
                        <tr>
                          <td>예매율</td>
                          <td>{reservationRate && reservationRate + " %"}</td>
                        </tr>
                        <tr>
                          <td className="text-muted small" colSpan={2}>
                            {compressed_plot}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Row>
                </Col>
              </Row>
            </div>
          </CardTitle>
          <CardBody>{/* <p>영화 상세</p> */}</CardBody>
          <CardFooter>
            <Row>
              <Col>
                <Badge className="float-start mx-3 mt-1" color="primary">
                  개봉일 : {releaseDate}
                </Badge>

                <Badge className="float-end mx-3 mt-1" color={creditCookie ? "success" : "secondary"}>
                  쿠키 영상 : {creditCookie ? creditCookie : "X"}
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
  rank: PropTypes.number.isRequired,
  // title: PropTypes.string.isRequired,
};

export default Movie;
