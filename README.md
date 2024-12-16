# INST-377-Group-Project

Developer Manual:

Installation:
Install necessary dependencies:
npm install
npm i dotenv

create .env file with these lines, replacing "API_KEY" with your key:
API_NINJAS_KEY=API_KEY
GOOGLE_API_KEY=API_KEY

Running:

Backend:

Run:
node index.js

Frontend: open index.html in the browser.

Tests:
Manual testing can be done by using the browser and interacting with the site there.

API:
GET /api/geolocation
Parameters:
city
state

GET /api/pollen
Parameters:
lat: lattitude
long: longitude

Bugs:
None documented.

Roadmap:
User authentification for saving locations.
Optimization of site for mobile usage.
Further bug testing and fixing.
