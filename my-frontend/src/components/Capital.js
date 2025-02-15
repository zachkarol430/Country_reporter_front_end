import React from 'react';
import { useParams } from 'react-router-dom';

const Capital = () => {
  const { capital } = useParams();
  
  // Dummy weather data for demonstration
  const weather = {
    temperature: 25,
    description: 'Sunny',
    humidity: 60,
    wind_speed: 5,
  };

  return (
    <div>
      <h1>{capital}</h1>
      <h3>Weather Information</h3>
      <p>Temperature: {weather.temperature} °C</p>
      <p>Description: {weather.description}</p>
      <p>Humidity: {weather.humidity} %</p>
      <p>Wind Speed: {weather.wind_speed} m/s</p>
    </div>
  );
};

export default Capital; 