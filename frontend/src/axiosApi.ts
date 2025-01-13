import axios from "axios";
import { apiUrl } from "./globalConstants.ts";

const token = localStorage.getItem("token");

const axiosApi = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: token,
  },
});

export default axiosApi;
