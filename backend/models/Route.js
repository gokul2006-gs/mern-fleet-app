const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    startPoint: { type: String, required: true },
    endPoint: { type: String, required: true },
    distance: { type: Number, required: true }, // In km or miles
    estimatedTime: { type: Number, required: true }, // In minutes
    actualTime: { type: Number },
    fuelConsumed: { type: Number }, // In liters
    status: {
        type: String,
        enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Scheduled'
    },
    assignedDriver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
    assignedVehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
    efficiencyRating: { type: Number, min: 0, max: 100 }, // Calculated after trip
    waypoints: [{
        lat: Number,
        lng: Number,
        timestamp: Date
    }]
}, { timestamps: true });

module.exports = mongoose.model('Route', routeSchema);
