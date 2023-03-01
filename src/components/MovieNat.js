import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardFooter, CardTitle, Col, Row } from "reactstrap";
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

  const CallInfo = async (m_title) => {
    const body = {
      title: m_title,
    };
    const header_config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const res = await axios.post("movie", body, header_config);

    // TODO: 영화 목록이 여럿일 경우 특정 영화 찾기 추가
    console.log(res.data.items);
    if (res.data.items.length === 0) {
    } else if (res.data.items.length === 1) {
      setData(res.data.items[0]);
    } else {
      setData(res.data.items[0]);
    }
  };

  const ApiText = async () => {
    fetch("/test", {
      method: "GET",
      // headers: { "Content-Type": "application/json" },
      // bodt: JSON.stringify({ params: "data is here" }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    CallInfo(title);
    // ApiText();
  }, []);

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
                  <img className={styles.movie__img2} src={data.image} alt={data.titl0e} />
                </Col>
                <Col>
                  <h2 className={styles.movie__title}>
                    {/* <Link to={``}></Link> */}
                    <a href={data.link} target="_blank" rel="noreferrer">
                      {title}
                    </a>
                  </h2>
                  <hr />
                  <p className="text-sm-end fw-bold">
                    {/* {data.director && data.director.replaceAll("|", ", ").replace(/(,)?([ㄱ-힣]+)(,)/, "$1")} */}
                    {data.director && data.director.replaceAll("|", ", ").replace(/,\s*$/, "")}
                  </p>
                  {/* TODO: 영화 상세 정보 추가 */}
                  {/* FIXME: 차트 형태로 형태 변경 */}
                  <ul className={styles.movie__count + " float-end"}>
                    <li>금일 관객 : {countFormat.format(audiCount)} 명</li>
                    <li>누적 관객 : {countFormat.format(audiAcc)} 명</li>
                    <li>상영관 : {scrnCnt}</li>
                  </ul>
                  {/* <img className={styles.movie__img} src={coverImg} alt={title} /> */}
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
                {/* TODO: 영화 배우 목록 스타일 변경 */}
                {data.actor}
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
