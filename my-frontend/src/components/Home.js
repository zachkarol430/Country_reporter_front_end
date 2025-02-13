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
      // Directly call FastAPI backend running on port 8000
      const res = await axios.get("http://localhost:8000/random-country");
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
          <div className="country-details">
            <div className="detail">
              <h3 style={{ fontSize: "2rem", margin: "0.5rem 0" }}>🏛 CAPITAL</h3>
              <p>{randomCountry.capital}</p>
            </div>
            <div className="detail">
              <h3 style={{ fontSize: "2rem", margin: "0.5rem 0" }}>🏰 GOVERNMENT TYPE</h3>
              <p>{randomCountry.government_type}</p>
            </div>
            <div className="detail">
              <h3 style={{ fontSize: "2rem", margin: "0.5rem 0" }}>💰 CURRENCY</h3>
              <p>{randomCountry.currency}</p>
            </div>
            <div className="detail">
              <h3 style={{ fontSize: "2rem", margin: "0.5rem 0" }}>🎉 FUN FACTS</h3>
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
}

export default Home;