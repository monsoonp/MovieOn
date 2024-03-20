import { useState } from "react";
import { Carousel, CarouselControl, CarouselIndicators, CarouselItem, Col, Row, UncontrolledTooltip } from "reactstrap";
import styles from "../components/Movie.module.css";

const MovieSlider = (props) => {
  const { ott, movie_list } = props;
  // State for Active index
  const [activeIndex, setActiveIndex] = useState(0);

  // State for Animation
  const [animating, setAnimating] = useState(false);
  // Items array length
  // const itemLength = movie_list.length - 1;
  const itemLength = 1;

  // Previous button for Carousel
  const previousButton = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? itemLength : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  // Next button for Carousel
  const nextButton = () => {
    if (animating) return;
    const nextIndex = activeIndex === itemLength ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  // Carousel Item Data
  const carouselItemData = movie_list.map((movie, idx) => {
    return (
      <CarouselItem key={movie.movieTitle} className="my-5" onExited={() => setAnimating(false)} onExiting={() => setAnimating(true)}>
        <h2 className={styles.movie__rank}>{idx + 1}</h2>
        <img className={styles.movie__img2} src={movie.imageUrl} alt={movie.movieTitle} style={{ width: 150 }} />

        <h4 className="text-light text-center">{movie.movieTitle}</h4>
      </CarouselItem>
    );
  });

  const carouselItem = Array(2)
    .fill()
    .map((_, index) => {
      return (
        <CarouselItem key={index} className="my-5" onExited={() => setAnimating(false)} onExiting={() => setAnimating(true)}>
          <Row md="12">
            <Col md="1"></Col>
            {Array(5)
              .fill()
              .map((_, idx) => {
                return (
                  movie_list[index * 5 + idx] && (
                    <Col key={`${index * 5}-${idx}`}>
                      <a
                        href={"https://movie.daum.net/moviedb/main?movieId=" + movie_list[index * 5 + idx].movieId}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <h2 className={styles.movie__rank}>{index * 5 + idx + 1}</h2>
                        <img
                          id={`${ott}-${index * 5 + idx}`}
                          className={styles.movie__img2}
                          src={movie_list[index * 5 + idx].imageUrl}
                          alt={movie_list[index * 5 + idx].movieTitle}
                          loading="lazy"
                          //
                        />
                        <UncontrolledTooltip placement="bottom" target={`${ott}-${index * 5 + idx}`}>
                          <span className="fw-bold text-light text-center">{movie_list[index * 5 + idx].movieTitle}</span>
                        </UncontrolledTooltip>
                      </a>
                    </Col>
                  )
                );
              })}
            <Col md="1"></Col>
          </Row>
        </CarouselItem>
      );
    });

  //
  return (
    <Carousel
      className="bg-dark"
      previous={previousButton}
      next={nextButton}
      activeIndex={activeIndex}
      // interval={false} //auto play option
    >
      <CarouselIndicators
        // items={movie_list}
        items={[0, 0]}
        activeIndex={activeIndex}
        onClickHandler={(newIndex) => {
          if (animating) return;
          setActiveIndex(newIndex);
        }}
      />
      {carouselItem}
      {/* {carouselItemData} */}
      <CarouselControl directionText="Prev" direction="prev" onClickHandler={previousButton} />
      <CarouselControl directionText="Next" direction="next" onClickHandler={nextButton} />
    </Carousel>
  );
};

export default MovieSlider;
