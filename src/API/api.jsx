import axios from "axios";

const API = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// To fetch the data
export const fetchPosts = () => {
  return API.get("/posts");
};
