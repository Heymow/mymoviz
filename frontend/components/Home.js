import { useEffect, useState } from 'react';
import { Popover, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Movie from './Movie';
import 'antd/dist/antd.css';
import styles from '../styles/Home.module.css';
// import { use } from '../../backend/routes';

function Home() {
  const [likedMovies, setLikedMovies] = useState([]);
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    const start = async () => {
      const fetched = await fetch('http://localhost:3000/movies');
      const jsoned = await fetched.json();
      setMoviesList(jsoned.movies);
    }
    start();
  }, [])


  // Liked movies (inverse data flow)
  const updateLikedMovies = (movieTitle) => {
    if (likedMovies.find(movie => movie === movieTitle)) {
      setLikedMovies(likedMovies.filter(movie => movie !== movieTitle));
    } else {
      setLikedMovies([...likedMovies, movieTitle]);
    }
  };

  const likedMoviesPopover = likedMovies.map((data, i) => {
    return (
      <div key={i} className={styles.likedMoviesContainer}>
        <span className="likedMovie">{data}</span>
        <FontAwesomeIcon icon={faCircleXmark} onClick={() => updateLikedMovies(data)} className={styles.crossIcon} />
      </div>
    );
  });

  const popoverContent = (
    <div className={styles.popoverContent}>
      {likedMoviesPopover}
    </div>
  );

  const movies = moviesList.map((data, i) => {

    const isLiked = likedMovies.some(movie => movie === data.title);

    const posterUrl = `https://image.tmdb.org/t/p/w200${data.poster_path}`

    let formattedOverview = data.overview;
    if (formattedOverview.length > 250) {
      formattedOverview = data.overview.slice(0, 250);
      formattedOverview = formattedOverview.concat(' ', '...')
    }
    return <Movie key={i} updateLikedMovies={updateLikedMovies} isLiked={isLiked} title={data.title} overview={formattedOverview} poster={posterUrl} voteAverage={data.voteAverage} voteCount={data.voteCount} />;
  });

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.logocontainer}>
          <img src="logo.png" alt="Logo" />
          <img className={styles.logo} src="logoletter.png" alt="Letter logo" />
        </div>
        <Popover title="Liked movies" content={popoverContent} className={styles.popover} trigger="click">
          <Button>♥ {likedMovies.length} movie(s)</Button>
        </Popover>
      </div>
      <div className={styles.title}>LAST RELEASES</div>
      <div className={styles.moviesContainer}>
        {movies}
      </div>
    </div>
  );
}

export default Home;