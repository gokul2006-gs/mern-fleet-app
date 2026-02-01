const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    licenseNumber: { type: String, required: true, unique: true },
    status: {
        type: String,
        enum: ['Available', 'On Trip', 'Off Duty'],
        default: 'Available'
    },
    assignedVehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', default: null },
    efficiencyScore: { type: Number, min: 0, max: 100, default: 100 }, // Driver performance score
    totalTrips: { type: Number, default: 0 },
    avatar: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Driver', driverSchema);
