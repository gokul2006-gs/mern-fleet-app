const express = require('express');
const router = express.Router();
const Route = require('../models/Route');

// @route   GET /api/routes
// @desc    Get all routes
// @access  Public
router.get('/', async (req, res) => {
    try {
        const routes = await Route.find()
            .populate('assignedDriver')
            .populate('assignedVehicle');
        res.json(routes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/routes
// @desc    Create a new route
// @access  Public
router.post('/', async (req, res) => {
    try {
        const newRoute = new Route(req.body);
        const route = await newRoute.save();
        res.json(route);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
