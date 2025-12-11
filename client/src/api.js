import axios from "axios";

const api = axios.create({
  baseURL: "https://ticketmgt.onrender.com/api",
  withCredentials: true, // Tells the browser to include cookies
});

export default api;
