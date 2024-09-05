import React from 'react';
import './MovieList.css';
import Movie from '../Movie/Movie';
import { Spin } from 'antd';

const MovieList = (props) => {
  return (
    <div className="movies">
      {props.loading ? (
        <Spin className="spin" />
      ) : (
        props.movies.map((movie, i) => {
          return (
            <div className="movies__list">
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
        })
      )}
    </div>
  );
};

export default MovieList;
