const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// Endpoint untuk menerima koordinat
app.post('/save-location', (req, res) => {
    const { latitude, longitude, timestamp } = req.body;

    const locationData = `
=================================================
LOKASI BARU TERDETEKSI
=================================================
Timestamp: ${timestamp}
Latitude: ${latitude}
Longitude: ${longitude}
Google Maps: https://www.google.com/maps?q=${latitude},${longitude}
=================================================

`;

    // Simpan ke README.md
    fs.appendFile('README.md', locationData, (err) => {
        if (err) {
            console.error('Error saving location:', err);
            return res.status(500).json({ success: false });
        }
        console.log('Location saved to README.md');
        res.json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Lokasi akan disimpan di README.md');
});