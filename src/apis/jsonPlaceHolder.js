import axios from "axios";

const jsonPlaceHolder = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});
export default jsonPlaceHolder;
