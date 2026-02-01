import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User, Award, Phone, Mail } from 'lucide-react';

const DriverList = () => {
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/drivers');
                setDrivers(res.data);
            } catch (err) {
                console.error("Error fetching drivers:", err);
            }
        };
        fetchDrivers();
    }, []);

    return (
        <div className="p-8 bg-slate-950 min-h-screen">
            <h2 className="text-3xl font-bold text-white mb-8">Driver Management</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drivers.map(driver => (
                    <div key={driver._id} className="bg-slate-900 rounded-2xl border border-slate-800 p-6 hover:border-slate-700 transition-all">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-blue-400">
                                <User size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">{driver.name}</h3>
                                <span className={`text-sm px-2 py-0.5 rounded-md ${driver.status === 'On Trip' ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'
                                    }`}>
                                    {driver.status}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center text-slate-400 text-sm space-x-2">
                                <Award size={16} className="text-yellow-500" />
                                <span>Efficiency Score: <span className="text-white font-medium">{driver.efficiencyScore}/100</span></span>
                            </div>
                            <div className="flex items-center text-slate-400 text-sm space-x-2">
                                <Mail size={16} />
                                <span className="truncate">{driver.email}</span>
                            </div>
                            <div className="flex items-center text-slate-400 text-sm space-x-2">
                                <div className="font-mono text-xs text-slate-500">LIC: {driver.licenseNumber}</div>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-800">
                            <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm font-medium">
                                View Profile
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DriverList;
