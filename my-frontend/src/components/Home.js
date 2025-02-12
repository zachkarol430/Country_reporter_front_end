import React, { useState } from 'react';
import axios from 'axios';

function Home() {
  const [randomCountry, setRandomCountry] = useState(null);
  const [loadingRandom, setLoadingRandom] = useState(false);
  const [errorRandom, setErrorRandom] = useState(null);

  const handleRandomCountry = async () => {
    setLoadingRandom(true);
    setErrorRandom(null);
    try {
      // Fetch random country data from our proxy endpoint on Express
      const res = await axios.get("/api/random-country");
      // Here, assuming the endpoint now returns a single country object
      const country = res.data;
      if (country) {
        setRandomCountry(country);
      } else {
        setErrorRandom("No country found.");
      }
    } catch (error) {
      setErrorRandom(error.message);
    }
    setLoadingRandom(false);
  };

  return (
    <div className="home">
      <h1>Random Country Info!</h1>
      <button onClick={handleRandomCountry}>Get Random Country</button>
      
      {loadingRandom && <p>Loading...</p>}
      {errorRandom && <p>Error: {errorRandom}</p>}
      {randomCountry && (
        <div className="country-info">
          <h2>{randomCountry.country_name}</h2>
          <p>Capital: {randomCountry.capital}</p>
          <p>Government Type: {randomCountry.government_type}</p>
          <p>Currency: {randomCountry.currency}</p>
          <p>Fun Facts: {randomCountry.fun_facts}</p>
        </div>
      )}
    </div>
  );
}

export default Home; 