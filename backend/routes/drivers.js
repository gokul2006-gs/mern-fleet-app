const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');

// @route   GET /api/drivers
// @desc    Get all drivers
// @access  Public
router.get('/', async (req, res) => {
    try {
        const drivers = await Driver.find().populate('assignedVehicle');
        res.json(drivers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/drivers
// @desc    Add a driver
// @access  Public
router.post('/', async (req, res) => {
    try {
        const newDriver = new Driver(req.body);
        const driver = await newDriver.save();
        res.json(driver);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
