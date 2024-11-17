// utils/api.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// Save and Schedule Email
export const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `${token}`,
    };
  };
export const saveAndScheduleApi = async (data) => {
  try {
    const headers = getAuthHeaders();
    const response = await axios.post(`${BASE_URL}/schedule-email`, data, {
      headers,
    });
    console.log("Data saved successfully", response.data);
    return response.data;
  } catch (error) {
    console.error("Error saving data", error);
    throw error;
  }
};

// Login Service
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    console.log("User logged in successfully", response.data);
    // Store the token in localStorage for authenticated requests
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

// Signup Service
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData);
    console.log("User signed up successfully", response.data);
    // Optionally store the token if you want to log the user in immediately after signup
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Signup failed", error);
    throw error;
  }
};

// Utility function for setting the authorization header
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
