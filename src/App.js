import React from 'react';
import './App.css';
import { Alert } from 'antd';
import SearchInput from './components/SearchInput/SearchInput';
import MovieList from './components/MovieList/MovieList';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      searchInp: '',
      loading: false,
      error: false,
    };
  }

  handlerSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=75d86b5d70895a206c14341942e09e7d&query=${this.state.searchInp}`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          movies: [...res.results].slice(0, 6),
          loading: false,
        });
      })
      .catch((error) => {
        <Alert type="erroe" message={error} />;
      });
  };

  handlerInput = (e) => {
    this.setState({
      searchInp: e.target.value,
    });
  };

  render() {
    return (
      <div className="main">
        <SearchInput handlerInput={this.handlerInput} handlerSubmit={this.handlerSubmit} />
        <MovieList movies={this.state.movies} loading={this.state.loading} error={this.state.error} />
      </div>
    );
  }
}

export default App;
