import { useEffect, useState } from 'react';
import './RatedMovies.css';
import { Pagination, Spin, Alert } from 'antd';
import Movie from '../Movie/Movie';

const RatedMovies = (props) => {
  const [ratedMovie, setRatedMovie] = useState([]);
  const [error, setError] = useState(false);

  const rated = (page = 1) => {
    props.setLoading(true);
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWQ4NmI1ZDcwODk1YTIwNmMxNDM0MTk0MmUwOWU3ZCIsIm5iZiI6MTcyNzI4MDgzNi4yMjg3OCwic3ViIjoiNjYyZTVjMTI3ZDVkYjUwMTI5M2UyMjQxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.DqBZpuS4NeihDLrNHICMA52jPldJxDBu1rn7km519Fg',
      },
    };

    fetch(
      `https://api.themoviedb.org/3/guest_session/${props.questSessionId}/rated/movies?api_key=75d86b5d70895a206c14341942e09e7&page=${page}`,
      options
    )
      .then((response) => {
        console.log(response.status);
        console.log(response);
        if (!response.ok) {
          throw Error;
        }
        response.json();
      })
      .then((response) => {
        console.log(response);
        props.setLoading(false);
        setRatedMovie([...response.results]);
      })
      .catch((err) => {
        props.setLoading(false);
        console.log(err);
        setError(true);
      });
  };

  useEffect(() => {
    rated();
  }, [props.tabs]);

  console.log(ratedMovie);

  return (
    <div>
      {props.loading ? (
        <Spin className="spin" />
      ) : (
        <div className="ratedMovies">
          {ratedMovie.map((movie, i) => {
            return (
              <div className="rated__list">
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
                  rating={movie.rating}
                />
              </div>
            );
          })}
        </div>
      )}
      {error && (
        <div className="alert">
          <Alert type="error" message={`Error, что-то пошло не так!`} className="alert__error" />
        </div>
      )}
      {props.totalPage > 20 && ratedMovie.length !== 0 ? (
        <Pagination
          className="pagination"
          total={ratedMovie.length}
          onChange={(pag) => {
            rated(pag);
          }}
        ></Pagination>
      ) : (
        ''
      )}
    </div>
  );
};

export default RatedMovies;
