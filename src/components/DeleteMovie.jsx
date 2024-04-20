import { useState } from "react";

const DeleteMovie = ({ movieId, onDelete = () => {} }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    setDeleting(true);
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`${BASE_API_URL}/api/movies/${movieId}`, requestOptions)
      .then((response) => {
        if (response.ok) {
          onDelete(movieId);
        } else {
          console.error("Failed to delete movie", response.statusText);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setDeleting(false);
      });
  };

  return (
    <div>
      <button onClick={handleDelete} disabled={deleting}>
        {deleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default DeleteMovie;
