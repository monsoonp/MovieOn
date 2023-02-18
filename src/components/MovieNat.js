import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardFooter, CardTitle, Col, Row } from "reactstrap";
import styles from "./Movie.module.css";

function Movie({ rank, title, audiCount, audiAcc, scrnCnt, date }) {
  // notation - “standard” (기본값), scientific, engineering, compact
  const countFormat = Intl.NumberFormat("ko-KR", { notation: "compact", numeric: "auto" });
  const [data, setData] = useState({});

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
    const fetch_data = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      body: JSON.stringify(body),
      headers: header_config,
    };

    const res = await axios.post("movie", body, header_config);
    console.log(res.data.items);
    setData(res.data.items[0]);
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
          <img src={data.image} alt={data.title} />
        </CardBody>
        <CardFooter>
          <Row>
            <Col>
              <Badge className="float-start mx-3 mt-1" color="primary">
                개봉일 : {date}
              </Badge>
            </Col>
            <Col>
              <ul className={styles.movie__count + " float-start"}>
                <li>금일 관객 : {countFormat.format(audiCount)} 명</li>
                <li>누적 관객 : {countFormat.format(audiAcc)} 명</li>
                <li>상영관 : {scrnCnt} 개</li>
              </ul>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    </Col>
  );
}

Movie.propTypes = {
  rank: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Movie;
