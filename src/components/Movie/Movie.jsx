import React from 'react';
import './Movie.css';
// import { format, parseISO } from 'date-fns';

function sliceDescription(text) {
  return text.split('.').slice(0, 1).join('.');
}

const Movie = (props) => {
  // const data = format(parseISO(props.data), 'MMMM d, y');

  return (
    <div className="movie">
      {props.image == null ? (
        <img src={''} alt="none" />
      ) : (
        <img className="movie__image" src={`http://image.tmdb.org/t/p/w185${props.image}`} alt="ne none" />
      )}
      <section>
        <div>
          <section className="movie__header">
            <h3 className="movie__title">{props.title}</h3>
            <div className="movie__average">{props.average.toFixed(1)}</div>
          </section>

          {/* <div className="movie__data">{data}</div> */}
          {/* <Suspense></Suspense> */}
        </div>
        <div className="movie__overview">{sliceDescription(props.overview)}</div>
      </section>
    </div>
  );
};

export default Movie;
