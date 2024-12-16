const express = require('express');
const axios = require('axios');
const { Pool } = require('pg'); 
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

console.log("backend running")
// Middleware for parsing JSON
app.use(express.json());



// Create a PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.SUPABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Required for Supabase connections
    },
});

// Test the connection
pool.connect()
    .then(() => console.log('Connected to Supabase PostgreSQL!'))
    .catch((err) => console.error('Database connection error:', err.stack));

// Archive API write endpoint
app.post('/api/pollen-archive', async (req, res) => {
    const { date, grass_pollen, tree_pollen, weed_pollen, location } = req.body;

    // Validate the incoming request data
    if (!date || !location || grass_pollen === undefined || tree_pollen === undefined || weed_pollen === undefined) {
        return res.status(400).json({
            error: 'Missing required fields: date, location, grass_pollen, tree_pollen, weed_pollen',
        });
    }

    try {
        // Insert data into the pollen_archive table
        const query = `
            INSERT INTO pollen_archive (date, grass_pollen, tree_pollen, weed_pollen, location)
            VALUES ($1, $2, $3, $4, $5) RETURNING *;
        `;
        const values = [date, grass_pollen, tree_pollen, weed_pollen, location];

        const { rows } = await pool.query(query, values);

        // Send a success response with the inserted row
        res.status(201).json({
            message: 'Pollen forecast added to archive successfully!',
            data: rows[0],
        });
    } catch (error) {
        console.error('Error inserting data into pollen_archive:', error.message);
        res.status(500).json({ error: 'Failed to add pollen forecast to archive' });
    }
});

//archive GET endpoint
app.get('/api/pollen-archive', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM pollen_archive ORDER BY date DESC;');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching pollen archive:', error.message);
        res.status(500).json({ error: 'Failed to fetch archive data' });
    }
});

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

    const apiUrl = `https://pollen.googleapis.com/v1/forecast:lookup?key=${process.env.GOOGLE_API_KEY}&location.longitude=${long}&location.latitude=${lat}&days=1`;

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error fetching pollen data');
    }
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
