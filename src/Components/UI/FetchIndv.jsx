import { useQuery } from "@tanstack/react-query";
import { fetchIndvPost } from "../../API/api";
import { NavLink, useParams } from "react-router-dom";

const FetchIndv = () => {
  const { id } = useParams();

  const { data, isPending, isError } = useQuery({
    queryKey: ["post", id], // useState
    queryFn: () => fetchIndvPost(id), // useeEffect
  });

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Something went wrong!</h1>;
  }

  return (
    <div className="section-accordion">
      <h1>Post ID Number = {id}</h1>
      <div>
        <p>ID: {data.id}</p>
        <p>Title: {data.title}</p>
        <p>Body: {data.body}</p>
      </div>
      <NavLink to="/rq">
        <button>Go Back</button>
      </NavLink>
    </div>
  );
};

export default FetchIndv;
