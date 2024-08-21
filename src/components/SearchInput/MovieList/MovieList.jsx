import React from 'react';
import './MovieList.css';
import Movie from '../../Movie/Movie';

const MovieList = (props) => {
  return (
    <div>
      {props.movies.map((movie, i) => {
        return (
          <div>
            <Movie
              key={i}
              image={movie.poster_path}
              title={movie.title}
              average={movie.vote_average}
              overview={movie.overview}
              data={movie.release_date}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MovieList;
