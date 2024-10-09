import React, { useContext, useState } from 'react';
import './Movie.css';
import { Rate, Tag } from 'antd';
import { format, parseISO } from 'date-fns';
import GenresContext from '../Contex/Contex';

function sliceDescription(text) {
  return text.split('').slice(0, 100).join('');
  // return text.split('.').slice(0, 1).join('.');
}

const Movie = (props) => {
  let data = null;
  try {
    data = format(parseISO(props.data), 'MMMM d, y');
  } catch {
    data = 'Данные недоступны';
  }

  const [rat, setRate] = useState('');
  const [rated, setRated] = useState();

  const genresList = useContext(GenresContext);

  const filmGenres = (
    <>
      {genresList.map((genre) => {
        // console.log(props.genre_ids);
        if (props.genre_ids?.includes(genre.id)) {
          return <Tag className="movie__genre">{genre.name}</Tag>;
        }
      })}
    </>
  );

  const rating = (rate) => {
    setRated(rate);
    if (7 < rate) {
      setRate('gold');
      return;
    }
    if (rate < 5) {
      if (rate < 3) {
        setRate('red');
        return;
      }
      if (3 < rate < 5) {
        setRate('brown');
        return;
      }
    } else {
      if (5 < rate < 7) {
        setRate('yellow');
        return;
      }
    }
  };
  const getRatedMovies = (rate) => {
    // console.log(rate);
    rating(rate);
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWQ4NmI1ZDcwODk1YTIwNmMxNDM0MTk0MmUwOWU3ZCIsIm5iZiI6MTcyNjgyNTY2MS45Njk2MzEsInN1YiI6IjY2MmU1YzEyN2Q1ZGI1MDEyOTNlMjI0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2L-athkv31fJSh_WPbLmU9-6TnZqmzkPeRCS3JRRvAc',
      },
      body: JSON.stringify({ value: rate }),
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${props.id}/rating?api_key=75d86b5d70895a206c14341942e09e7&guest_session_id=${props.questSessionId}`,
      options
    )
      .then((response) => {
        response.json();
      })
      .then((response) => {
        // console.log(response);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="movie">
        <div>
          {props.image === null ? (
            <img src={''} alt=" Not poster" className="movie__image" />
          ) : (
            <img className="movie__image" src={`http://image.tmdb.org/t/p/w185${props.image}`} alt="not" />
          )}
        </div>

        <div>
          <div>
            <section>
              <div className="movie__header">
                <h3 className="movie__title">{props.title}</h3>
                {/* {console.log('ratind start >>>', props.average)} */}
                <div className="movie__average">{props.rating || rated || props.average.toFixed(0)}</div>
              </div>

              <div>{filmGenres}</div>

              <div className="movie__overview">{sliceDescription(props.overview)}</div>
            </section>

            <div className="movie__data">{data}</div>
            {/* <Suspense></Suspense> */}
          </div>

          <Rate count={10} className={rat} onChange={getRatedMovies} defaultValue={props.rating} />
        </div>
      </div>
    </>
  );
};

export default Movie;
