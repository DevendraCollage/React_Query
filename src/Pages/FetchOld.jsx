import { useEffect, useState } from "react";
import { fetchPosts } from "../API/api";

const FetchOld = () => {
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getPostData = async () => {
    try {
      const res = await fetchPosts();
      if (res.status === 200) {
        setPost(res.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      // return [];
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Something went wrong!</h1>;
  }

  return (
    <div>
      <ul className="section-accordion">
        {post?.map((currElem) => {
          const { id, title, body } = currElem;
          return (
            <li key={id}>
              <p>{title}</p>
              <p>{body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FetchOld;
