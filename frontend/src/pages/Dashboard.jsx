import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Truck, Users, Droplets, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import FleetMap from '../components/FleetMap';

const StatCard = ({ title, value, icon: Icon, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="bg-slate-900/60 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg hover:shadow-[0_0_20px_rgba(0,118,255,0.1)] hover:border-cyber-500/50 transition-all group"
    >
        <div className="flex justify-between items-start">
            <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider font-sans">{title}</p>
                <h3 className="text-4xl font-black text-white mt-2 font-sans decoration-4">{value}</h3>
            </div>
            <div className={`p-4 rounded-xl bg-gradient-to-br ${color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <Icon size={24} className="text-white" />
            </div>
        </div>
    </motion.div>
);

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalVehicles: 0,
        activeDrivers: 0,
        totalRoutes: 0,
        avgFuelEfficiency: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [vehiclesRes, driversRes, routesRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/vehicles'),
                    axios.get('http://localhost:5000/api/drivers'),
                    axios.get('http://localhost:5000/api/routes')
                ]);

                const vehicles = vehiclesRes.data;
                const drivers = driversRes.data;
                const totalRoutes = routesRes.data.length;
                const avgFuel = vehicles.length > 0
                    ? vehicles.reduce((acc, v) => acc + (v.fuelConsumption || 0), 0) / vehicles.length
                    : 0;

                setStats({
                    totalVehicles: vehicles.length,
                    activeDrivers: drivers.filter(d => d.status === 'On Trip').length,
                    totalRoutes,
                    avgFuelEfficiency: avgFuel.toFixed(1)
                });
            } catch (err) {
                console.error("Error fetching dashboard stats:", err);
            }
        };

        fetchStats();
    }, []);

    const data = [
        { name: 'Mon', efficiency: 24 },
        { name: 'Tue', efficiency: 28 },
        { name: 'Wed', efficiency: 26 },
        { name: 'Thu', efficiency: 30 },
        { name: 'Fri', efficiency: 27 },
        { name: 'Sat', efficiency: 32 },
        { name: 'Sun', efficiency: 29 },
    ];

    return (
        <div className="p-8 space-y-8 min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-white">
            <div className="flex justify-between items-center">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 font-sans">MISSION CONTROL</h2>
                    <p className="text-cyber-500 mt-1 font-mono text-sm tracking-wider">SYSTEM STATUS: ONLINE</p>
                </motion.div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-neon-blue to-cyan-600 text-black px-6 py-3 rounded-xl font-bold uppercase tracking-tight shadow-[0_0_15px_rgba(0,243,255,0.4)] hover:shadow-[0_0_25px_rgba(0,243,255,0.6)]"
                >
                    Generate Report
                </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Vehicles" value={stats.totalVehicles} icon={Truck} color="from-blue-500 to-blue-700" delay={0.1} />
                <StatCard title="Active Drivers" value={stats.activeDrivers} icon={Users} color="from-emerald-500 to-emerald-700" delay={0.2} />
                <StatCard title="Avg Fuel Consumption" value={`${stats.avgFuelEfficiency} L/100km`} icon={Droplets} color="from-orange-500 to-red-600" delay={0.3} />
                <StatCard title="Total Routes" value={stats.totalRoutes} icon={Activity} color="from-purple-500 to-indigo-700" delay={0.4} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-2 space-y-6"
                >
                    <div className="bg-slate-900/50 backdrop-blur-md p-1 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-3xl" />
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                                Live Fleet Map
                            </h3>
                            <FleetMap />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-6"
                >
                    <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-3xl border border-white/5 shadow-2xl h-full">
                        <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Efficiency Analytics</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <defs>
                                        <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                    <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                                    <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Bar dataKey="efficiency" fill="url(#colorEfficiency)" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
