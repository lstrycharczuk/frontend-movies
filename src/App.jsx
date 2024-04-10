import "./App.css";
import { useEffect, useState } from "react";
import "./App.css";
import AddMovie from "./components/AddMovie";
import useFetch from "react-fetch-hook";
import createTrigger from "react-use-trigger";
import useTrigger from "react-use-trigger/useTrigger";

const moviesRefetch = createTrigger();

function App() {
  const requestNewMoviesValue = useTrigger(moviesRefetch);
  const { isLoading, data: responseData } = useFetch(
    `${BASE_API_URL}/api/movies`,
    {
      depends: [requestNewMoviesValue],
    }
  );

  const movies = responseData ? responseData.movies || [] : [];
  console.log("data", movies);

  return (
    <>
      <div>
        <h1>Movies List</h1>
        {isLoading && <p>Loading...</p>}
        <ul>
          {movies.map((movie) => (
            <li key={movie._id}>
              <img src={movie.img} alt="poster" />
              <iframe src={`https://www.youtube.com/embed/${movie.src}`} frameborder="0"></iframe>
              <h4>Title: {movie.title}</h4>
              <p>Description: {movie.description}</p>
              <p>Year: {movie.year}</p>
              <p>Watched: {movie.watched ? '✔' : '✖'}</p>
            </li>
          ))}
        </ul>
        <AddMovie onAdd={moviesRefetch} />
      </div>
    </>
  );
}

export default App;
