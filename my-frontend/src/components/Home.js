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
        // The .replace(/ /g, '_') part converts all spaces in the lowercase country name into underscores.
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
    <div className="home">
      <header className="home-header">
        <h1>🌍 Random Country Explorer 🌍</h1>
      </header>
      <section className="actions">
        <button onClick={handleRandomCountry} className="btn-discover">
          🎲 Discover a Country!
        </button>
      </section>
      <section className="status-messages">
        {loadingRandom && (
          <div>
            <div className="loading">
              <span
                className="spinner"
                role="img"
                aria-label="loading"
                style={{ animation: 'App-logo-spin 1.5s linear infinite' }}
              >
                ⏳
              </span>
            </div>
            <p>Loading your adventure...</p>
          </div>
        )}
        {errorRandom && <p className="error-message">❌ Error: {errorRandom}</p>}
      </section>
      {randomCountry && (
        <section className="country-info">
          <h2>{randomCountry.country_name}</h2>
          {flagSrc && (
            <div className="flag-container">
              <img
                src={flagSrc}
                alt={`Flag of ${randomCountry.country_name}`}
                style={{ maxWidth: '300px', margin: '1rem 0' }}
              />
            </div>
          )}
          <div className="country-details">
            <div className="detail">
              <h3 style={{ fontSize: "2rem", margin: "0.5rem 0" }}>🏛 Capital</h3>
              <p>
                <Link to={`/capital/${randomCountry.capital}`}>{randomCountry.capital}</Link>
              </p>
            </div>
            <div className="detail">
              <h3 style={{ fontSize: "2rem", margin: "0.5rem 0" }}>🏰 Government Type</h3>
              <p>{randomCountry.government_type}</p>
            </div>
            <div className="detail">
              <h3 style={{ fontSize: "2rem", margin: "0.5rem 0" }}>💰 Currency</h3>
              <p>{randomCountry.currency}</p>
            </div>
            <div className="detail">
              <h3 style={{ fontSize: "2rem", margin: "0.5rem 0" }}>🎉 Fun Facts</h3>
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