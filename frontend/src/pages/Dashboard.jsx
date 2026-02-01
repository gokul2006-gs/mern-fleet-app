import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Truck, Users, Droplets, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import FleetMap from '../components/FleetMap';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-slate-400 text-sm font-medium">{title}</p>
                <h3 className="text-3xl font-bold text-white mt-1">{value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${color}`}>
                <Icon size={24} className="text-white" />
            </div>
        </div>
    </div>
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

                // Calculate basic stats
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
        <div className="p-8 space-y-8 bg-slate-950 min-h-screen">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>
                    <p className="text-slate-400 mt-1">Real-time fleet monitoring and analytics</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors">
                    Download Report
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Vehicles" value={stats.totalVehicles} icon={Truck} color="bg-blue-500" />
                <StatCard title="Active Drivers" value={stats.activeDrivers} icon={Users} color="bg-emerald-500" />
                <StatCard title="Avg Fuel Consumption" value={`${stats.avgFuelEfficiency} L/100km`} icon={Droplets} color="bg-orange-500" />
                <StatCard title="Total Routes" value={stats.totalRoutes} icon={Activity} color="bg-purple-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                        <h3 className="text-xl font-bold text-white mb-6">Live Fleet Map</h3>
                        <FleetMap />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 h-full">
                        <h3 className="text-xl font-bold text-white mb-6">Fuel Efficiency Trend</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                    <XAxis dataKey="name" stroke="#94a3b8" />
                                    <YAxis stroke="#94a3b8" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Bar dataKey="efficiency" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
