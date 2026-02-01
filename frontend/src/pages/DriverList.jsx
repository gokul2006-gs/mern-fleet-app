import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User, Award, Phone, Mail, Shield } from 'lucide-react';
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
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
};

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
        <div className="p-8 min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-8"
            >
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-pink-500 font-sans uppercase tracking-tight">Pilot Roster</h2>
                <p className="text-pink-500/70 mt-1 font-mono text-sm tracking-wider">PERSONNEL MANAGEMENT</p>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {drivers.map(driver => (
                    <motion.div
                        key={driver._id}
                        variants={item}
                        whileHover={{ y: -5 }}
                        className="bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/5 p-1 relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-neon-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

                        <div className="bg-slate-950/80 h-full rounded-xl p-6 relative z-10">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                                    <User size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white font-sans tracking-tight">{driver.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`w-2 h-2 rounded-full ${driver.status === 'On Trip' ? 'bg-green-400 animate-pulse' : 'bg-slate-500'}`} />
                                        <span className={`text-xs font-bold uppercase tracking-wider ${driver.status === 'On Trip' ? 'text-green-400' : 'text-slate-500'
                                            }`}>
                                            {driver.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 font-mono text-sm">
                                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                                    <div className="flex items-center text-slate-400 space-x-2">
                                        <Award size={16} className="text-yellow-500" />
                                        <span>EFFICIENCY</span>
                                    </div>
                                    <span className="text-white font-bold text-lg">{driver.efficiencyScore}</span>
                                </div>
                                <div className="flex items-center text-slate-400 space-x-3 px-2">
                                    <Mail size={16} className="text-cyber-500" />
                                    <span className="truncate">{driver.email}</span>
                                </div>
                                <div className="flex items-center text-slate-400 space-x-3 px-2">
                                    <Shield size={16} className="text-cyber-500" />
                                    <span>ID: {driver.licenseNumber}</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/5">
                                <button className="w-full py-2.5 bg-white/5 hover:bg-neon-purple/20 text-slate-300 hover:text-white rounded-lg transition-all text-xs font-bold uppercase tracking-widest border border-white/5 hover:border-neon-purple/50">
                                    View Dossier
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default DriverList;
