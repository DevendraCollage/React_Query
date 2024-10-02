import { useEffect, useState } from "react";
import { fetchPosts } from "../API/api";

const FetchOld = () => {
  const [post, setPost] = useState([]);

  const getPostData = async () => {
    try {
      const res = await fetchPosts();
      res.status === 200 ? setPost(res.data) : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

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
