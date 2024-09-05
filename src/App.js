import React, { useEffect, useState } from 'react';
import './App.css';
import { debounce } from 'lodash';
import { Alert, Pagination } from 'antd';
import SearchInput from './components/SearchInput/SearchInput';
import MovieList from './components/MovieList/MovieList';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(2);
  const [value, setValue] = useState('');

  const fetchMovies = debounce((value, pag = 1) => {
    setLoading(true);
    setValue(value);
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=75d86b5d70895a206c14341942e09e7d&query=${value}&page=${pag}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setLoading(false);
        setMovies([...res.results].slice(0, 6));
        setTotalPage(res.total_results);
      })
      .catch((error) => {
        <Alert type="error" message={error} />;
      });
  }, 1000);

  return (
    <div className="main">
      <SearchInput handlerChange={fetchMovies} />
      <MovieList movies={movies} loading={loading} />
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
  );
};

export default App;
