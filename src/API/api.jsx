import axios from "axios";

const API = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// To fetch the data
export const fetchPosts = () => {
  return API.get("/posts");
};

// To fetch the individual data
export const fetchIndvPost = async (id) => {
  try {
    const res = await API.get(`/posts/${id}`);
    return res.status === 200 ? res.data : null; // Return null if status isn't 200
  } catch (error) {
    console.error("Error fetching individual post:", error);
    throw error;
  }
};
