import React, { useEffect, useState } from 'react';
import './App.css';
import { debounce } from 'lodash';
import { Alert, Pagination, Tabs } from 'antd';
import SearchInput from './components/SearchInput/SearchInput';
import MovieList from './components/MovieList/MovieList';
import GenresMovies from './components/GenresMovies/GenresMovies';
// import RatedMovies from './components/RateMovies/RateMovies';

const { TabPane } = Tabs;
const App = () => {
  const [movies, setMovies] = useState([]); //состояние хранения списка фильмов
  const [loading, setLoading] = useState(false); // состояние загрузки
  const [totalPage, setTotalPage] = useState(2); // состояние пагинации
  const [value, setValue] = useState(''); // состояние значения
  const [ratedFilm, setRatedFilm] = useState([]); //оцененные фильмы
  const [genresList, setGenresList] = useState([]); // список жанров
  const [questSessionId, setQuestSessuonId] = useState(''); // индетификатор сеанса
  const [tabPane, setTabPane] = useState(1); // табуляция

  // const getRatedMovies = async () => {
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       accept: 'application/json',
  //       Authorization:
  //         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWQ4NmI1ZDcwODk1YTIwNmMxNDM0MTk0MmUwOWU3ZCIsIm5iZiI6MTcyNTc5NDI4Mi41MDc3NjIsInN1YiI6IjY2MmU1YzEyN2Q1ZGI1MDEyOTNlMjI0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jm3otsgpf3UQfyqFjdFMRRPMG1QT3_p438LjfNF5fiA',
  //     },
  //   };

  //   fetch(
  //     'https://api.themoviedb.org/3/guest_session/guest_session_id/rated/movies?language=en-US&page=1&sort_by=created_at.asc',
  //     options
  //   )
  //     .then((response) => response.json())
  //     .then((response) => console.log(response))
  //     .catch((err) => console.error(err));
  // };

  // console.log(getRatedMovies());

  // const genresMovies = () => {
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       accept: 'application/json',
  //       Authorization:
  //         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWQ4NmI1ZDcwODk1YTIwNmMxNDM0MTk0MmUwOWU3ZCIsIm5iZiI6MTcyNTc5NDI4Mi41MDc3NjIsInN1YiI6IjY2MmU1YzEyN2Q1ZGI1MDEyOTNlMjI0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jm3otsgpf3UQfyqFjdFMRRPMG1QT3_p438LjfNF5fiA',
  //     },
  //   };

  //   fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
  //     .then((response) => response.json())
  //     .then((response) => setGenresList(response))
  //     .catch((err) => console.error(err));
  // };

  // useEffect(() => {
  //   genresMovies();
  // }, []);

  // console.log(genresList);

  const guestSession = () => {
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    fetch(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=75d86b5d70895a206c14341942e09e7d`,
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    guestSession();
  }, []);

  const fetchMovies = debounce((value, pag = 1) => {
    setLoading(true);
    setValue(value);
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=75d86b5d70895a206c14341942e09e7d&query=${value}&page=${pag}`
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setMovies([...res.results].slice(0, 6));
        setTotalPage(res.total_results);
      })
      .catch((error) => {
        <Alert type="error" message={error} />;
      });
  }, 1000);

  return (
    <>
      <div>
        <Tabs className="tabs">
          <TabPane tab="Search" key="1">
            <SearchInput handlerChange={fetchMovies} />
            <div className="main">
              <MovieList movies={movies} loading={loading} genresList={genresList} />
              {/* <GenresMovies /> */}
              {totalPage > 20 ? (
                <Pagination
                  className="pagination"
                  total={100}
                  onChange={(pag) => {
                    fetchMovies(value, pag);
                  }}
                ></Pagination>
              ) : (
                ''
              )}
            </div>
          </TabPane>
          <TabPane tab="Rated" key="2">
            <div>{ratedFilm}</div>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default App;
