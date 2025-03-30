// // src/services/weatherApi.js

// import axios from 'axios';

// // Get API key from environment variable or replace with your actual API key
// const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'YOUR_API_KEY'; 
// const BASE_URL = 'https://api.openweathermap.org/data/2.5';



// export const fetchWeatherData = async (city) => { 
//     try {
//       const response = await axios.get(`${BASE_URL}/weather`, {
//         params: {
//           q: city,
//           appid: API_KEY,
//           units: 'metric'
//         }
//       });
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };

  

// // For 5-day forecast (bonus feature)
// export const fetchForecastData = async (city) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/forecast`, {
//       params: {
//         q: city,
//         appid: API_KEY,
//         units: 'metric'
//       }
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// src/services/weatherApi.js

import axios from "axios";


// Load API key from environment variable (Make sure .env file has VITE_OPENWEATHER_API_KEY)
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Function to fetch current weather data
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

// Function to fetch 5-day forecast data
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
    console.error("Error fetching forecast data:", error.response?.data || error.message);
    throw error;
  }
};

console.log("Loaded API Key:", import.meta.env.VITE_OPENWEATHER_API_KEY);
