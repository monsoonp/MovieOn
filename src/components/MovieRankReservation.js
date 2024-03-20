import PropTypes from "prop-types";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { Badge, Button, Card, CardBody, CardFooter, CardTitle, Col, Modal, Row, Table, UncontrolledTooltip } from "reactstrap";
import { motion } from "framer-motion";
import styles from "./Movie.module.css";

function Movie({ rank, admission, rate, title, image: img_link, director, actor, genre, video: video_link, reservRate, plot, date }) {
  // notation - “standard” (기본값), scientific, engineering, compact
  // const countFormat = Intl.NumberFormat("ko-KR", { notation: "compact", numeric: "auto" });
  // const [data, setData] = useState({});
  const new_plot = plot.replace(/<\/?br?>/g, " ");
  const compressed_plot = new_plot.split(" ").length > 30 ? `${new_plot.split(" ").slice(0, 30).join(" ")} ...` : new_plot;
  // const videoUrl_number = video_link ? video_link.split("/").pop() : 0;
  let videoUrl_number = video_link?.split("/")?.pop();
  videoUrl_number ??= 0; //null 타입 값 할당
  const [modal, setModal] = useState(false);
  const modalToggle = () => setModal(!modal);

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
                  <img className={styles.movie__img2} src={img_link} alt={img_link} loading="lazy" />
                </Col>
                <Col>
                  <Row>
                    <div id={`info_${rank}`} className={styles.movie__title}>
                      {/* <a href={video_link} target="_blank" rel="noreferrer"> */}
                      <a className="fw-bold" onClick={modalToggle}>
                        {title}
                      </a>
                      {/*
                        reactstrap - modal
                        https://reactstrap.github.io/?path=/docs/components-modal--modal 
                       */}
                      <Modal isOpen={modal} toggle={modalToggle} backdrop={true} keyboard={true} size="lg" centered={true}>
                        <iframe
                          title="trailerFrame"
                          src={`https://tv.kakao.com/embed/player/cliplink/${videoUrl_number}?service=kakao_tv&section=channel&autoplay=1&profile=HIGH&wmode=transparent`}
                          // width="800"
                          height="500"
                          sandbox // 보호구역 설정
                        />
                      </Modal>
                    </div>
                    <UncontrolledTooltip placement="left" target={`info_${rank}`}>
                      예고편 보기
                    </UncontrolledTooltip>

                    <hr />
                  </Row>

                  <Row>
                    <Table hover bordered={false} responsive>
                      <thead>
                        <tr>
                          <th id={`director_${rank}`} className="text-end" colSpan={2} scope="row">
                            {/* {data.director && textSplitter(data.director)} */}
                            {director.toString().replaceAll(",", ", ")}
                          </th>
                        </tr>
                      </thead>
                      <UncontrolledTooltip placement="right" target={`director_${rank}`}>
                        감독
                      </UncontrolledTooltip>
                      <tbody>
                        <tr>
                          <td id={`actor_${rank}`} className="text-end text-muted small" colSpan={2}>
                            {/* {data.actor && textSplitter(data.actor)} */}
                            {actor.toString().replaceAll(",", ", ")}
                          </td>
                        </tr>
                        <UncontrolledTooltip placement="right" target={`actor_${rank}`}>
                          출연
                        </UncontrolledTooltip>
                        <tr>
                          <td id={`plot_${rank}`} className="text-muted small" colSpan={2}>
                            {compressed_plot}
                          </td>
                        </tr>
                        <UncontrolledTooltip placement="right" target={`plot_${rank}`}>
                          줄거리
                        </UncontrolledTooltip>
                      </tbody>
                    </Table>
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
                <Badge className="float-start mx-0 mt-1" color="primary">
                  {admission}
                </Badge>
                <Badge className="float-start mx-3 mt-1" color="primary">
                  평점: {rate}
                </Badge>

                <Badge className="float-end mx-0 mt-1" color="primary">
                  개봉일 : {date}
                </Badge>
                <Button className="float-end mx-3 mt-0" color="primary" size="sm" outline disabled>
                  {genre.toString().replaceAll(",", ", ")}
                </Button>
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
  title: PropTypes.string.isRequired,
};

export default Movie;
