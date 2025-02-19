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
    return <p className="text-red-500">Error: {error}</p>; // Display error message if there's an error
  }

  if (!capitalInfo) {
    return <p className="text-white">Loading...</p>; // Display loading message while fetching data
  }

  // Construct the Google Maps embed URL using the API key from the environment variable
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(capitalInfo.capital)}`;

  return (
    <div className="p-4 bg-gray-800 text-white">
      <h1 className="text-3xl font-bold">{capitalInfo.capital}</h1>
      <div className="flex justify-center">
        <img src={capitalInfo.image_url} alt={`Image of ${capitalInfo.capital}`} className="my-4 rounded-lg" />
      </div>
      <p>Country: {capitalInfo.country_name}</p>
      <p>Currency: {capitalInfo.currency}</p>
      <h3 className="text-2xl mt-4">Weather Information</h3>
      <p>Temperature: {capitalInfo.weather.temperature} °C</p>
      <p>Description: {capitalInfo.weather.description}</p>
      <p>Humidity: {capitalInfo.weather.humidity} %</p>
      <p>Wind Speed: {capitalInfo.weather.wind_speed} m/s</p>
      <p>
        <a href={capitalInfo.maps_link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
          View on Google Maps
        </a>
      </p>
      <h3 className="text-2xl mt-4">Location on Google Maps</h3>
      <iframe
        className="w-full h-96 border-0"
        loading="lazy"
        allowFullScreen
        src={googleMapsEmbedUrl}
      ></iframe>
    </div>
  );
};

export default Capital; 