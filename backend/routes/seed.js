const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');
const Route = require('../models/Route');

router.post('/', async (req, res) => {
    try {
        // Clear existing data
        await Vehicle.deleteMany({});
        await Driver.deleteMany({});
        await Route.deleteMany({});

        // Create Vehicles
        const vehicles = await Vehicle.create([
            {
                make: 'Volvo', model: 'FH16', year: 2022, licensePlate: 'KA-01-AB-1234',
                status: 'Active', fuelLevel: 85, fuelConsumption: 32, condition: 'Good',
                currentLocation: { lat: 12.9716, lng: 77.5946 } // Bangalore
            },
            {
                make: 'Tata', model: 'Prima', year: 2021, licensePlate: 'KA-05-CD-5678',
                status: 'Maintenance', fuelLevel: 20, fuelConsumption: 35, condition: 'Warning',
                currentLocation: { lat: 13.0827, lng: 80.2707 } // Chennai
            },
            {
                make: 'Ashok Leyland', model: 'Ecomet', year: 2023, licensePlate: 'MH-12-EF-9012',
                status: 'Active', fuelLevel: 92, fuelConsumption: 28, condition: 'Good',
                currentLocation: { lat: 19.0760, lng: 72.8777 } // Mumbai
            },
            {
                make: 'Mahindra', model: 'Blazo', year: 2022, licensePlate: 'DL-01-GH-3456',
                status: 'Idle', fuelLevel: 45, fuelConsumption: 30, condition: 'Good',
                currentLocation: { lat: 28.7041, lng: 77.1025 } // Delhi
            }
        ]);

        // Create Drivers
        const drivers = await Driver.create([
            {
                name: 'Ramesh Kumar', email: 'ramesh@example.com', licenseNumber: 'DL123456789',
                status: 'On Trip', assignedVehicle: vehicles[0]._id, efficiencyScore: 92
            },
            {
                name: 'Suresh Singh', email: 'suresh@example.com', licenseNumber: 'KA987654321',
                status: 'Available', efficiencyScore: 88
            },
            {
                name: 'John Doe', email: 'john@example.com', licenseNumber: 'MH456123789',
                status: 'Off Duty', efficiencyScore: 75
            }
        ]);

        // Create Routes
        await Route.create([
            {
                startPoint: 'Bangalore', endPoint: 'Mumbai', distance: 980, estimatedTime: 1440,
                status: 'In Progress', assignedDriver: drivers[0]._id, assignedVehicle: vehicles[0]._id,
                waypoints: [{ lat: 12.9716, lng: 77.5946 }, { lat: 14.5, lng: 76.5 }, { lat: 16.5, lng: 74.5 }]
            },
            {
                startPoint: 'Chennai', endPoint: 'Bangalore', distance: 350, estimatedTime: 360,
                status: 'Scheduled', assignedDriver: drivers[1]._id
            }
        ]);

        res.json({ msg: 'Database seeded with Fleet IQ data' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
