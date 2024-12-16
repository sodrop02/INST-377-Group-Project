# INST-377-Group-Project

Application name: Pollify


Description

Pollify is an application designed to help individuals with pollen allergies better manage their outdoor activities. By providing real-time information about pollen levels in their area, Pollify empowers users to plan their day while minimizing the risks associated with allergy triggers. With features like a detailed pollen type breakdown, preventative tips, and a user-friendly interface, Pollify aims to make life safer and more comfortable for those affected by seasonal allergies!

Target Browsers

Pollify is for a wide range of modern browsers and devices. Specifically:

Desktop Browsers: Chrome (latest version), Firefox (latest version), Safari (latest version), Microsoft Edge (latest version).

Mobile Browsers:

iOS: Safari on iOS 14 and above.


Our responsive design ensures Pollify performs seamlessly across desktop and mobile platforms.





Developer Manual:

Installation:
Install necessary dependencies:
npm install
npm i dotenv

create .env file with these lines, replacing "API_KEY" with your key, and replace [OUR PASSWORD HERE!] with the db password:
API_NINJAS_KEY=API_KEY
GOOGLE_API_KEY=API_KEY
SUPABASE_URL = postgresql://postgres.jiwmhzgplqxjkydcpxxs:[OUR PASSWORD HERE!]@aws-0-us-east-1.pooler.supabase.com:6543/postgres

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
