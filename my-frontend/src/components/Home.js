import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [randomCountry, setRandomCountry] = useState(null);
  const [flagSrc, setFlagSrc] = useState(null);
  const [loadingRandom, setLoadingRandom] = useState(false);
  const [errorRandom, setErrorRandom] = useState(null);

  const handleRandomCountry = async () => {
    setLoadingRandom(true);
    setErrorRandom(null);
    setRandomCountry(null);
    setFlagSrc(null);
    try {
      // Directly call FastAPI backend running on port 8000
      const res = await axios.get("http://localhost:8000/random-country");
      const country = res.data;
      if (country) {
        setRandomCountry(country);
        // Construct the URL for the flag image using the country name.
        const flagUrl = country.flag_url;
        console.log("Flag URL:", flagUrl);
        setFlagSrc(flagUrl);
      } else {
        setErrorRandom("No country found.");
      }
    } catch (error) {
      setErrorRandom(error.message);
    }
    setLoadingRandom(false);
  };

  return (
    <div className="home bg-black text-white min-h-screen flex flex-col items-center">
      <header className="home-header">
        <h1 className="text-4xl my-4">🌍 Random Country Explorer 🌍</h1>
      </header>
      <section className="actions">
        <button onClick={handleRandomCountry} className="bg-gradient-to-r from-blue-400 to-indigo-600 text-white rounded-full px-6 py-2 shadow-lg transition-transform transform hover:scale-105">
          🎲 Discover a Country!
        </button>
      </section>
      <section className="status-messages">
        {loadingRandom && (
          <div className="flex flex-col items-center">
            <div className="loading">
              <span className="spinner animate-spin" role="img" aria-label="loading">
                ⏳
              </span>
            </div>
            <p>Loading your adventure...</p>
          </div>
        )}
        {errorRandom && <p className="text-red-500">❌ Error: {errorRandom}</p>}
      </section>
      {randomCountry && (
        <section className="country-info mt-6">
          <h2 className="text-3xl">{randomCountry.country_name}</h2>
          {flagSrc && (
            <div className="flag-container flex justify-center my-4">
              <img
                src={flagSrc}
                alt={`Flag of ${randomCountry.country_name}`}
                className="max-w-xs"
              />
            </div>
          )}
          <div className="country-details">
            <div className="detail mb-4">
              <h3 className="text-2xl">🏛 Capital</h3>
              <p>
                <Link to={`/capital/${randomCountry.capital}`} className="text-blue-400 hover:underline">{randomCountry.capital}</Link>
              </p>
            </div>
            <div className="detail mb-4">
              <h3 className="text-2xl">🏰 Government Type</h3>
              <p>{randomCountry.government_type}</p>
            </div>
            <div className="detail mb-4">
              <h3 className="text-2xl">💰 Currency</h3>
              <p>{randomCountry.currency}</p>
            </div>
            <div className="detail mb-4">
              <h3 className="text-2xl">🎉 Fun Facts</h3>
              {(randomCountry.fun_facts.includes("1.") || randomCountry.fun_facts.includes("2.")) ? (
                randomCountry.fun_facts.split(/(?=1\.)|(?=2\.)/).map((fact, idx) => (
                  <p key={idx}>{fact.trim()}</p>
                ))
              ) : (
                <p>{randomCountry.fun_facts}</p>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;