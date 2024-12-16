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
    const statesDict = {
        "AL": "Alabama",
        "AK": "Alaska",
        "AZ": "Arizona",
        "AR": "Arkansas",
        "CA": "California",
        "CZ": "Canal Zone",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Delaware",
        "DC": "District of Columbia",
        "FL": "Florida",
        "GA": "Georgia",
        "GU": "Guam",
        "HI": "Hawaii",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "Indiana",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucky",
        "LA": "Louisiana",
        "ME": "Maine",
        "MD": "Maryland",
        "MA": "Massachusetts",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Missouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New Hampshire",
        "NJ": "New Jersey",
        "NM": "New Mexico",
        "NY": "New York",
        "NC": "North Carolina",
        "ND": "North Dakota",
        "OH": "Ohio",
        "OK": "Oklahoma",
        "OR": "Oregon",
        "PA": "Pennsylvania",
        "PR": "Puerto Rico",
        "RI": "Rhode Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "UT": "Utah",
        "VT": "Vermont",
        "VI": "Virgin Islands",
        "VA": "Virginia",
        "WA": "Washington",
        "WV": "West Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming"
      }      
      
    let apiUrl = `https://api.api-ninjas.com/v1/geocoding?city=${city}`;
    if (state) {
        if (state.length ==2  && state in statesDict){
            const fullStateName = statesDict_1[state];

            apiUrl += `&country=US&state=${fullStateName}`;
        }
        else if (Object.values(statesDict).includes(state)){
        apiUrl += `&country=US&state=${state}`;}
        else{
         apiUrl += `&country=${state}`;
        }
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
