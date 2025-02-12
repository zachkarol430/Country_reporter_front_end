const express = require('express');
const axios = require('axios');
const cors = require('cors'); 
const app = express();
const port = process.env.PORT || 3001;

// Base URL for your FastAPI backend
const FASTAPI_BASE_URL = 'http://localhost:8000';

// Middleware to parse JSON if needed
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", // allow requests from your React app
    credentials: true
  }));
// Proxy endpoint for fetching all countries
app.get('/api/countries', async (req, res) => {
  try {
    const response = await axios.get(`${FASTAPI_BASE_URL}/countries`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Proxy endpoint for fetching reports
app.get('/api/reports', async (req, res) => {
  try {
    const response = await axios.get(`${FASTAPI_BASE_URL}/reports`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Proxy endpoint for fetching a random country
app.get('/api/random-country', async (req, res) => {
  try {
    const response = await axios.get(`${FASTAPI_BASE_URL}/random-country`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// You can add more endpoints if needed, for example:
// app.post('/api/reports', async (req, res) => { ... });

app.get('/', (req, res) => {
  res.send('Hello World from the backend proxy server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 