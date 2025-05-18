import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // Adjust if your Node.js backend uses another port
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
