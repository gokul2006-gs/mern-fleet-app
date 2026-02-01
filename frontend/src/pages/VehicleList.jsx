import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Truck, AlertTriangle, CheckCircle, Wrench } from 'lucide-react';

const VehicleList = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/vehicles');
                setVehicles(res.data);
            } catch (err) {
                console.error("Error fetching vehicles:", err);
            }
        };
        fetchVehicles();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'text-green-500 bg-green-500/10';
            case 'Maintenance': return 'text-red-500 bg-red-500/10';
            case 'Idle': return 'text-yellow-500 bg-yellow-500/10';
            default: return 'text-slate-500 bg-slate-500/10';
        }
    };

    return (
        <div className="p-8 bg-slate-950 min-h-screen">
            <h2 className="text-3xl font-bold text-white mb-8">Fleet Vehicles</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map(vehicle => (
                    <div key={vehicle._id} className="bg-slate-900 rounded-2xl border border-slate-800 p-6 hover:border-slate-700 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-slate-800 rounded-xl">
                                <Truck size={24} className="text-blue-400" />
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(vehicle.status)}`}>
                                {vehicle.status}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-1">{vehicle.make} {vehicle.model}</h3>
                        <p className="text-slate-400 text-sm mb-4">{vehicle.licensePlate}</p>

                        <div className="space-y-3 pt-4 border-t border-slate-800">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400 text-sm">Fuel Level</span>
                                <span className="text-white font-medium">{vehicle.fuelLevel}%</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full ${vehicle.fuelLevel < 30 ? 'bg-red-500' : 'bg-green-500'}`}
                                    style={{ width: `${vehicle.fuelLevel}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-slate-400 text-sm">Condition</span>
                                <div className="flex items-center space-x-2">
                                    {vehicle.condition === 'Good' && <CheckCircle size={16} className="text-green-500" />}
                                    {vehicle.condition === 'Warning' && <AlertTriangle size={16} className="text-yellow-500" />}
                                    {vehicle.condition === 'Critical' && <Wrench size={16} className="text-red-500" />}
                                    <span className="text-white font-medium">{vehicle.condition}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VehicleList;
