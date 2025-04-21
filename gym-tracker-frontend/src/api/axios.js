import axios from "axios";

const API = axios.create({
  baseURL: "https://5001-idx-pratice-1744785474896.cluster-qpa6grkipzc64wfjrbr3hsdma2.cloudworkstations.dev/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
