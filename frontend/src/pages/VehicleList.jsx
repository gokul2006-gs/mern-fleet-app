import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Truck, AlertTriangle, CheckCircle, Wrench, Fuel } from 'lucide-react';
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

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
            case 'Active': return 'text-neon-green bg-neon-green/10 border-neon-green/20';
            case 'Maintenance': return 'text-red-500 bg-red-500/10 border-red-500/20';
            case 'Idle': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
            default: return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
        }
    };

    return (
        <div className="p-8 min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8"
            >
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 font-sans uppercase tracking-tight">Fleet Asset Command</h2>
                <p className="text-cyber-500 mt-1 font-mono text-sm tracking-wider">UNIT STATUS MONITORING</p>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {vehicles.map(vehicle => (
                    <motion.div
                        key={vehicle._id}
                        variants={item}
                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                        className="bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/5 p-6 hover:border-cyber-500/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] transition-all group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Truck size={80} className="text-cyber-500" />
                        </div>

                        <div className="flex justify-between items-start mb-6 relative">
                            <div className="p-3 bg-slate-800/80 rounded-xl border border-white/10 group-hover:border-cyber-500/30 transition-colors">
                                <Truck size={24} className="text-cyber-400" />
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(vehicle.status)} shadow-[0_0_10px_inset_rgba(0,0,0,0.2)]`}>
                                {vehicle.status}
                            </span>
                        </div>

                        <div className="relative">
                            <h3 className="text-2xl font-bold text-white mb-1 font-sans tracking-tight">{vehicle.make} {vehicle.model}</h3>
                            <p className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-6 border-b border-white/5 pb-4">{vehicle.licensePlate}</p>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-slate-400 text-xs font-medium flex items-center gap-2">
                                            <Fuel size={14} /> FUEL LEVEL
                                        </span>
                                        <span className="text-white font-mono font-bold">{vehicle.fuelLevel}%</span>
                                    </div>
                                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${vehicle.fuelLevel}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className={`h-full rounded-full ${vehicle.fuelLevel < 30 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-neon-green shadow-[0_0_10px_rgba(10,255,10,0.5)]'}`}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-slate-400 text-xs font-medium">SYS CONDITION</span>
                                    <div className="flex items-center space-x-2">
                                        {vehicle.condition === 'Good' && <CheckCircle size={16} className="text-neon-green" />}
                                        {vehicle.condition === 'Warning' && <AlertTriangle size={16} className="text-yellow-500" />}
                                        {vehicle.condition === 'Critical' && <Wrench size={16} className="text-red-500" />}
                                        <span className={`font-bold text-sm ${vehicle.condition === 'Good' ? 'text-neon-green' :
                                                vehicle.condition === 'Warning' ? 'text-yellow-500' : 'text-red-500'
                                            }`}>{vehicle.condition}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default VehicleList;
