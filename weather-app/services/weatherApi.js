

import axios from "axios";



const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";


export const fetchWeatherData = async (city) => {
  try {
    if (!API_KEY) {
      throw new Error("API key is missing. Please check your .env file.");
    }

    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error.response?.data || error.message);
    throw error;
  }
};


export const fetchForecastData = async (city) => {
  try {
    if (!API_KEY) {
      throw new Error("API key is missing. Please check your .env file.");
    }

    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });

    return response.data;
  } catch (error) {
    
    

    throw error;
  }
};

console.log("Loaded API Key:", import.meta.env.VITE_OPENWEATHER_API_KEY);
