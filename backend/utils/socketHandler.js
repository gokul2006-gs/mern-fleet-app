const Vehicle = require('../models/Vehicle');

let io;

const initSocket = (socketIoInstance) => {
    io = socketIoInstance;

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    // Start simulation loop
    startSimulation();
};

const startSimulation = () => {
    setInterval(async () => {
        try {
            // Fetch active vehicles
            const activeVehicles = await Vehicle.find({ status: { $in: ['Active', 'On Trip'] } });

            if (activeVehicles.length === 0) return;

            // Update locations with random movement
            const updates = activeVehicles.map(async (vehicle) => {
                // Simulate small random movement (-0.001 to +0.001 degrees)
                const latChange = (Math.random() - 0.5) * 0.002;
                const lngChange = (Math.random() - 0.5) * 0.002;

                vehicle.currentLocation.lat += latChange;
                vehicle.currentLocation.lng += lngChange;

                // Randomly decrease fuel occasionally
                if (Math.random() > 0.9) {
                    vehicle.fuelLevel = Math.max(0, vehicle.fuelLevel - 0.1);
                }

                await vehicle.save();
                return vehicle;
            });

            const updatedVehicles = await Promise.all(updates);

            // Emit updates to all connected clients
            if (io) {
                io.emit('vehicleUpdates', updatedVehicles);
            }

        } catch (err) {
            console.error('Simulation error:', err);
        }
    }, 3000); // Update every 3 seconds
};

module.exports = { initSocket };
