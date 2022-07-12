import PropTypes from "prop-types";
import {Link} from "react-router-dom"
import styles from "./Movie.module.css";

function Movie({id, title, coverImg, year, summary, genres}) {
    
    return (
        <div className={styles.movie}>
            <h2 className={styles.movie__title}><Link to={`/movie/${id}`}>{title}</Link></h2>
            <img className={styles.movie__img}src={coverImg} alt={title}/>
            <h3 className={styles.movie__year}>{year}</h3>
            <p>{summary.length > 235 ? `${summary.slice(0,235)} ...` : summary}</p>
            <ul className={styles.movie__genres}>
            {genres.map((g, idx) =>
                <li key={idx}>{g}</li>)
            }
            </ul>
        </div>
    
    )
}

Movie.propTypes={
    title: PropTypes.string.isRequired,
    coverImg: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Movie;