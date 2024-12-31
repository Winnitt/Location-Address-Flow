import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Points to the backend URL
});

// Authentication APIs
export const login = (userData) => API.post("/users/login", userData);
export const signup = (userData) => API.post("/users/signup", userData);

// Address APIs
export const saveAddress = (address) => API.post("/addresses", address);
export const fetchAddresses = () => API.get("/addresses");
