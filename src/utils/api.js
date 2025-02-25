import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/", // Adjust the base URL as needed
});

export const fetchFaviconUrl = async () => {
  const response = await api.get("/get-favicon-url"); // Adjust the endpoint as needed
  return response.data.faviconUrl;
};

export default api;
