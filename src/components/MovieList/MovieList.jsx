import React from 'react';
import './MovieList.css';
import Movie from '../Movie/Movie';
import { Spin } from 'antd';

const MovieList = (props) => {
  return (
    <div>
      {props.loading ? (
        <Spin className="spin" />
      ) : (
        <div className="movies">
          {props.movies.map((movie, i) => {
            return (
              <div className="movies__list" key={i}>
                <Movie
                  key={i}
                  image={movie.poster_path}
                  title={movie.title}
                  average={movie.vote_average}
                  overview={movie.overview}
                  data={movie.release_date}
                  id={movie.id}
                  questSessionId={props.questSessionId}
                  genre_ids={movie.genre_ids}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MovieList;
