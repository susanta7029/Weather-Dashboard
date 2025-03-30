
import React from "react";

import { useState, useEffect } from 'react';
import { fetchWeatherData, fetchForecastData } from '../../services/weatherApi';




const Forecast = ({ city }) => {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;
    
    const getForecast = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchForecastData(city);
        
       
        const dailyData = processForecastData(data.list);
        setForecast(dailyData);
      } catch (err) {
        console.error('Error fetching forecast:', err);
        setError('Failed to load forecast');
      } finally {
        setLoading(false);
      }
    };

    getForecast();
  }, [city]);

  
  const processForecastData = (forecastList) => {
    const dailyForecasts = {};
    
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = {
          date,
          temps: [],
          icons: [],
          descriptions: []
        };
      }
      
      dailyForecasts[date].temps.push(item.main.temp);
      dailyForecasts[date].icons.push(item.weather[0].icon);
      dailyForecasts[date].descriptions.push(item.weather[0].description);
    });
    
   
    return Object.values(dailyForecasts).map(day => {
      const avgTemp = day.temps.reduce((sum, temp) => sum + temp, 0) / day.temps.length;
     
      const iconCounts = {};
      day.icons.forEach(icon => {
        iconCounts[icon] = (iconCounts[icon] || 0) + 1;
      });
      const mainIcon = Object.keys(iconCounts).reduce((a, b) => 
        iconCounts[a] > iconCounts[b] ? a : b
      );
      
     
      const descCounts = {};
      day.descriptions.forEach(desc => {
        descCounts[desc] = (descCounts[desc] || 0) + 1;
      });
      const mainDescription = Object.keys(descCounts).reduce((a, b) => 
        descCounts[a] > descCounts[b] ? a : b
      );
      
      return {
        date: day.date,
        temp: Math.round(avgTemp),
        icon: mainIcon,
        description: mainDescription
      };
    }).slice(0, 5); 
  };

  if (loading) return <div className="text-center mt-4">Loading forecast...</div>;
  if (error) return <div className="text-center mt-4 text-red-500 dark:text-red-400">{error}</div>;
  if (!forecast) return null;

  return (
    <div className="mt-6 w-full">
      <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">5-Day Forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {forecast.map((day, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow text-center transition-colors">
            <div className="text-sm font-medium text-gray-800 dark:text-white">
              {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <img 
              src={`https://openweathermap.org/img/wn/${day.icon}.png`} 
              alt={day.description}
              className="w-12 h-12 mx-auto" 
            />
            <div className="font-bold text-gray-900 dark:text-white">{day.temp}°C</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{day.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;