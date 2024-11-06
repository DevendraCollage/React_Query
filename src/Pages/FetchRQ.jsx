import { NavLink } from "react-router-dom";
import { deletePost, fetchPosts, updatePost } from "../API/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const FetchRQ = () => {
  const getPostData = async () => {
    try {
      const res = await fetchPosts();
      return res.status === 200 ? res.data : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const [pageNumber, setPageNumber] = useState(0);

  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery({
    queryKey: ["post", pageNumber], // useState
    queryFn: () => getPostData(pageNumber), // useeEffect
    // placeholderData: keepPreviousData,
    // gcTime: 1000, // Garbage Collection Time and Show the data
    // staleTime: 5000, // We can increase the Stale Data time using staleTime (stale means outdated)
    // refetchInterval: 1000, // This will continue the polling in runtime fetched the newest data
    // refetchIntervalInBackground: true, // This option also worked in the data fetching in the background
  });

  //! mutation function to delete the post
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      // This function is used for accessing the cache data
      queryClient.setQueryData(["post", pageNumber], (currElem) => {
        return currElem?.filter((post) => post.id !== id);
      });
    },
  });

  //! mutation function to update the post
  const updateMutation = useMutation({
    mutationFn: (id) => updatePost(id),
    onSuccess: (apiData, postId) => {
      // This function is used for accessing the cache data
      queryClient.setQueryData(["post", pageNumber], (postData) => {
        return postData?.map((curPost) => {
          return curPost.id === postId
            ? { ...curPost, title: apiData.title }
            : curPost;
        });
      });
    },
  });

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Something went wrong!</h1>;
  }

  return (
    <div>
      <ul className="section-accordion">
        {data?.map((currElem) => {
          const { id, title, body } = currElem;
          return (
            <li key={id}>
              <NavLink to={`/rq/${id}`}>
                <p>{id}</p>
                <p>{title}</p>
                <p>{body}</p>
              </NavLink>
              <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
              <button onClick={() => updateMutation.mutate(id)}>Update</button>
            </li>
          );
        })}
      </ul>

      <div className="pagination-section container">
        <button
          disabled={pageNumber === 0 ? true : false}
          onClick={() => setPageNumber((prev) => prev - 3)}
        >
          Prev
        </button>
        <h2>{pageNumber / 3 + 1}</h2>
        <button onClick={() => setPageNumber((prev) => prev + 3)}>Next</button>
      </div>
    </div>
  );
};

export default FetchRQ;
