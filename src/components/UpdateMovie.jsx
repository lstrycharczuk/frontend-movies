import { useForm } from "react-hook-form";

const UpdateMovie = ({ movieId, initialData, onUpdate = () => {}, onCancel = () => {} }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialData });

  const onSubmit = (data) => {
    const raw = JSON.stringify(data);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "PUT",
      body: raw,
      redirect: "follow",
      headers: myHeaders,
    };

    fetch(`${BASE_API_URL}/api/movies/${movieId}`, requestOptions)
      .then((response) => {
        if (response.ok) {
          reset();
          onUpdate();
        } else {
          console.error("Failed to update movie", response.statusText);
        }
      })
      .catch((error) => console.error(error));
  };
  
  const handleCancel = () => {
    onCancel();
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("src", { required: false })} placeholder="src" defaultValue={initialData.src} />
        <input {...register("img", { required: false })} placeholder="img" defaultValue={initialData.img} />
        <input {...register("title", { required: true })} placeholder="title" defaultValue={initialData.title} />
        <input {...register("description", { required: false })} placeholder="description" defaultValue={initialData.description} />
        <input {...register("year", { required: false })} placeholder="year" defaultValue={initialData.year} />
        <input type="checkbox" {...register("watched", { required: false })} defaultChecked={initialData.watched} />
        {errors.title && <span>This field is required</span>}
        <button type="submit">Update</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
