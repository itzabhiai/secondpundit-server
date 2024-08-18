const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const bodyParser = require('body-parser');
const serviceAccount = require('./secondpundit-firebase-adminsdk-hjdj5-0a0352aaa1.json'); // Path to your Firebase service account key
                           

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://secondpundit-default-rtdb.firebaseio.com' 
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Endpoint to create a Firebase custom token
app.post('/generateCustomToken', async (req, res) => {
    const { uid } = req.body;

    if (!uid) {
        return res.status(400).send('UID is required');
    }

    try {
        const token = await admin.auth().createCustomToken(uid);
        res.json({ token });
    } catch (error) {
        console.error('Error creating custom token:', error);
        res.status(500).send('Error generating custom token');
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
