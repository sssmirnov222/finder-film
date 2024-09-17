const RatedMovies = () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWQ4NmI1ZDcwODk1YTIwNmMxNDM0MTk0MmUwOWU3ZCIsIm5iZiI6MTcyNTc5NDI4Mi41MDc3NjIsInN1YiI6IjY2MmU1YzEyN2Q1ZGI1MDEyOTNlMjI0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jm3otsgpf3UQfyqFjdFMRRPMG1QT3_p438LjfNF5fiA',
    },
  };

  fetch(
    'https://api.themoviedb.org/3/guest_session/guest_session_id/rated/movies?language=en-US&page=1&sort_by=created_at.asc',
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

export default RatedMovies;
