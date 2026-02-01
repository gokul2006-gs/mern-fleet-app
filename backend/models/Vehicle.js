const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    licensePlate: { type: String, required: true, unique: true },
    status: {
        type: String,
        enum: ['Active', 'Maintenance', 'Idle', 'Out of Service'],
        default: 'Active'
    },
    fuelLevel: { type: Number, min: 0, max: 100, default: 100 }, // Percentage
    fuelConsumption: { type: Number, default: 0 }, // L/100km or MPG
    condition: {
        type: String,
        enum: ['Good', 'Warning', 'Critical'],
        default: 'Good'
    },
    currentLocation: {
        lat: { type: Number, default: 0 },
        lng: { type: Number, default: 0 }
    },
    lastServiced: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
