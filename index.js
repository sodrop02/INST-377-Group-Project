const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
const port = 3001;

// Middleware for parsing JSON
app.use(express.json());

// Geolocation API
app.get('/api/geolocation', async (req, res) => {
    const city = req.query.city; // Get 'city' parameter from the query string
    const state = req.query.state; // Get 'state' parameter (optional)
    // Validate required parameters
    if (!city) {
        return res.status(400).send('City parameter is required'); // Handle missing city parameter
    }

    // Construct API URL with dynamic parameters
    let apiUrl = `https://api.api-ninjas.com/v1/geocoding?city=${city}`;
    if (state) {
        apiUrl += `&state=${state}`;
    }

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'X-Api-Key': process.env.API_NINJAS_KEY,
            },
        });
        res.json(response.data); 
    } catch (error) {
        console.error('Error fetching geolocation data:', error.message);
        res.status(500).send('Error fetching geolocation data');
    }
});


// Pollen forecast API
app.get('/api/pollen', async (req, res) => {
    const { lat, long } = req.query;
    if (!lat || !long) return res.status(400).send('Latitude and longitude are required');

    const apiUrl = `https://pollen.googleapis.com/v1/forecast:lookup?key=${process.env.GOOGLE_API_KEY}&location.longitude=${long}&location.latitude=${lat}&days=5`;

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error fetching pollen data');
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
