const express = require('express');
const router = express.Router();
const YourModel = require('../back/models/contactModel');
router.get('/frontend/src/compenent/ProductForm.js', async (req, res) => {
    try {
        const data = await YourModel.find();
        res.json(data);
    } catch (error) {

        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
