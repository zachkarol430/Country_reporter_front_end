import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Capital = () => {
  const { capitalName } = useParams(); // Get the capital name from the URL
  const [capitalInfo, setCapitalInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCapitalInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/capital/${capitalName}`);
        setCapitalInfo(response.data); // Set the fetched data to state
      } catch (error) {
        setError(error.message); // Handle any errors
      }
    };

    fetchCapitalInfo();
  }, [capitalName]); // Fetch data when the component mounts or capitalName changes

  if (error) {
    return <p>Error: {error}</p>; // Display error message if there's an error
  }

  if (!capitalInfo) {
    return <p>Loading...</p>; // Display loading message while fetching data
  }

  return (
    <div>
      <h1>{capitalInfo.capital}</h1>
      <img src={capitalInfo.image_url} alt={`Image of ${capitalInfo.capital}`} />
      <p>Country: {capitalInfo.country_name}</p>
      <p>Currency: {capitalInfo.currency}</p>
      <h3>Weather Information</h3>
      <p>Temperature: {capitalInfo.weather.temperature} °C</p>
      <p>Description: {capitalInfo.weather.description}</p>
      <p>Humidity: {capitalInfo.weather.humidity} %</p>
      <p>Wind Speed: {capitalInfo.weather.wind_speed} m/s</p>
      <p>
        <a href={capitalInfo.maps_link} target="_blank" rel="noopener noreferrer">
          View on Google Maps
        </a>
      </p>
    </div>
  );
};

export default Capital; 