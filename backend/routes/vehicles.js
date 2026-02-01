const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');

// @route   GET /api/vehicles
// @desc    Get all vehicles
// @access  Public (for now)
router.get('/', async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/vehicles
// @desc    Add a vehicle
// @access  Public
router.post('/', async (req, res) => {
    try {
        const newVehicle = new Vehicle(req.body);
        const vehicle = await newVehicle.save();
        res.json(vehicle);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/vehicles/:id
// @desc    Update a vehicle
// @access  Public
router.put('/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(vehicle);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
