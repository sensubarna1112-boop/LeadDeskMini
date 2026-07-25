import axios from "axios";

const api = axios.create({
  baseURL: "https://leaddeskmini-2l5b.onrender.com/api",
});

export default api;