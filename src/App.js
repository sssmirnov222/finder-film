import React from 'react';
import SearchInput from './components/SearchInput/SearchInput';
import MovieList from './components/SearchInput/MovieList/MovieList';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      searchInp: '',
    };
  }

  handlerSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=75d86b5d70895a206c14341942e09e7d&query=${this.state.searchInp}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        this.setState({
          movies: [...res.results].slice(0, 4),
        });
      });
  };

  handlerInput = (e) => {
    this.setState({
      searchInp: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <SearchInput handlerInput={this.handlerInput} handlerSubmit={this.handlerSubmit} />
        <MovieList movies={this.state.movies} />
      </div>
    );
  }
}

export default App;
