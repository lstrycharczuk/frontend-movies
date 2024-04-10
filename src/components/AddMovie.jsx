import { useForm } from "react-hook-form";

const AddMovie = ({ onAdd = () => { } }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const raw = JSON.stringify(data);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "POST",
            body: raw,
            redirect: "follow",
            headers: myHeaders
        };

        fetch(`${BASE_API_URL}/api/movies`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    reset();
                    onAdd();
                } else {
                    console.error("Failed to add movie", response.statusText);
                }
            })
            .catch((error) => console.error(error));
    }

    return <div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("src", { required: false })} />
        <input {...register("img", { required: false })} />
            <input {...register("title", { required: true })} />
            <input {...register("description", { required: false })} />
            <input {...register("year", { required: false })} />
            <input type="checkbox" {...register("watched", { required: false })} />
            {errors.title && <span>This field is required</span>}
            <button type="submit">Add</button>
        </form>
    </div>
}

export default AddMovie;