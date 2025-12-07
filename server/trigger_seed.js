const axios = require('axios');
const BASE_URL = 'http://localhost:5000/api';
async function seed() {
    try {
        console.log("Triggering seed...");
        const res = await axios.post(`${BASE_URL}/languages/seed`);
        console.log("Seed response:", res.data);
    } catch (err) {
        console.error("Seed error:", err.message);
        if (err.response) console.error(err.response.data);
    }
}

seed();
