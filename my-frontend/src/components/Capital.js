import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Capital = () => {
  const { capitalName } = useParams(); // Get the capital name from the URL
  const [capitalInfo, setCapitalInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(`Fetching data for capital: ${capitalName}`); // Log the capital name

    const fetchCapitalInfo = async () => {
      try {
        const response = await axios.get(`https://countryreporter-production.up.railway.app/capital/${capitalName}`);
        console.log('API response:', response.data); // Log the API response
        setCapitalInfo(response.data); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching data:', error); // Log any errors
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
    <div className="home global-background text-white flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-extrabold text-blue-300">{capitalInfo.capital}</h1>
      <div className="flex justify-center w-2/4"> {/* Made the div smaller for the image */}
        <img src={capitalInfo.image_url} alt={`Image of ${capitalInfo.capital}`} className="my-1 rounded-lg shadow-lg w-2/4" /> {/* Increased image size to three-quarters of screen */}
      </div>
      <p className="text-lg font-semibold">Country: <span className="text-blue-200">{capitalInfo.country_name}</span></p>
      <p className="text-lg font-semibold">Currency: <span className="text-blue-200">{capitalInfo.currency}</span></p>
      <h3 className="text-2xl mt-4 underline">Weather Information</h3>
      <p className="text-lg">Temperature: <span className="font-bold">{capitalInfo.weather.temperature} °C</span></p>
      <p className="text-lg">Description: <span className="font-bold">{capitalInfo.weather.description}</span></p>
      <p className="text-lg">Humidity: <span className="font-bold">{capitalInfo.weather.humidity} %</span></p>
      <p className="text-lg">Wind Speed: <span className="font-bold">{capitalInfo.weather.wind_speed} m/s</span></p>
    </div>
  );
};

export default Capital;