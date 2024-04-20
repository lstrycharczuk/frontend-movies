import "./App.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddMovie from "./components/AddMovie";
import useFetch from "react-fetch-hook";
import createTrigger from "react-use-trigger";
import useTrigger from "react-use-trigger/useTrigger";
import UpdateMovie from "./components/UpdateMovie";
import DeleteMovie from "./components/DeleteMovie";

const moviesRefetch = createTrigger();

function AllMovies() {
  const requestNewMoviesValue = useTrigger(moviesRefetch);
  const { isLoading, data: responseData } = useFetch(
    `${BASE_API_URL}/api/movies`,
    {
      depends: [requestNewMoviesValue],
    }
  );

  const movies = responseData ? responseData.movies || [] : [];
  console.log("data", movies);
  const [editMode, setEditMode] = useState(false);
  const [editMovieId, setEditMovieId] = useState(null);

  const handleEditClick = (movieId) => {
    setEditMode(true);
    setEditMovieId(movieId);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditMovieId(null);
  };
  return (
    <>
      <div>
        <h1>Movies List</h1>
        {isLoading && <p>Loading...</p>}
        {!editMode && <AddMovie onAdd={moviesRefetch} />}
        <ul>
          {movies.map((movie) => (
            <li key={movie._id}>
              {editMode && editMovieId === movie._id ? (
                <>
                  {" "}
                  <img src={movie.img} alt="poster" />
                  <iframe
                      src={`https://www.youtube.com/embed/${movie.src}`}
                      frameborder="0"
                    ></iframe>
                  <h4>Title: {movie.title}</h4>
                  <p>Description: {movie.description}</p>
                  <p>Year: {movie.year}</p>
                  <p>Watched: {movie.watched ? "✔" : "✖"}</p>
                  <UpdateMovie
                    movieId={movie._id}
                    initialData={movie}
                    onUpdate={() => {
                      moviesRefetch();
                      handleCancelEdit();
                    }}
                    onCancel={handleCancelEdit}
                  />
                </>
              ) : (
                <>
                  <Link to={`/movie/${movie._id}`} key={movie._id}>
                    <img src={movie.img} alt="poster" />
                   
                    <h4>Title: {movie.title}</h4>
                    <p>Description: {movie.description}</p>
                    <p>Year: {movie.year}</p>
                    <p>Watched: {movie.watched ? "✔" : "✖"}</p>
                    {editMode && editMovieId === movie._id && (
                      <button onClick={handleCancelEdit}>Cancel</button>
                    )}{" "}
                  </Link>
                  {!editMode && (
                    <button onClick={() => handleEditClick(movie._id)}>
                      Edit
                    </button>
                  )}
                  <DeleteMovie
                    movieId={movie._id}
                    onDelete={() => moviesRefetch()}
                  />
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default AllMovies;
