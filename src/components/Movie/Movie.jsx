import React from 'react';
import './Movie.css';

const Movie = (props) => {
  return (
    <div className="movie">
      {props.image == null ? (
        <img src={''} alt="none" />
      ) : (
        <img src={`http://image.tmdb.org/t/p/w185${props.image}`} alt="ne none" />
      )}
      <section>
        <div>
          <section>
            <div>{props.title}</div>
          </section>

          <div>{props.average.toFixed(1)}</div>
        </div>
        <div>{props.overview.slice(0, 150)}</div>
      </section>
    </div>
  );
};

export default Movie;
