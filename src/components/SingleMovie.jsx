import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "react-fetch-hook";
import createTrigger from "react-use-trigger";
import useTrigger from "react-use-trigger/useTrigger";
import UpdateMovie from "./UpdateMovie";
import DeleteMovie from "./DeleteMovie";

const moviesRefetch = createTrigger();

const SingleMovie = () => {
  const [editMode, setEditMode] = useState(false);
  const [editMovieId, setEditMovieId] = useState(null);
  const { movieId } = useParams();

  const { isLoading, data: responseData } = useFetch(
    `${BASE_API_URL}/api/movies/${movieId}`,
    {
      depends: [movieId],
    }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }
  const movie = responseData;

  console.log(movie);
  console.log(responseData)

  if (!movie) {
    return <h2>We didn't find the movie</h2>;
  }

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
    <Link to={`/`}>
          <button>All</button>
        </Link>
    <div>
      <h1>{movie.title}</h1>
      {isLoading && <p>Loading...</p>}
      <ul>
          <li key={movie._id}>
            {editMode && editMovieId === movie._id ? (
              <>
                {" "}
                <img src={movie.img} alt="poster" />
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

                  <img src={movie.img} alt="poster" />
                  <iframe
                    src={`https://www.youtube.com/embed/${movie.src}`}
                    frameborder="0"
                  ></iframe>
                  <h4>Title: {movie.title}</h4>
                  <p>Description: {movie.description}</p>
                  <p>Year: {movie.year}</p>
                  <p>Watched: {movie.watched ? "✔" : "✖"}</p>
                  {editMode && editMovieId === movie._id && (
                    <button onClick={handleCancelEdit}>Cancel</button>
                  )}
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

      </ul>
    </div>
  </>
  );
};

export default SingleMovie;
