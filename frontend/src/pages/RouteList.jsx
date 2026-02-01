import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapPin, Calendar, Clock, Navigation } from 'lucide-react';

const RouteList = () => {
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/routes');
                setRoutes(res.data);
            } catch (err) {
                console.error("Error fetching routes:", err);
            }
        };
        fetchRoutes();
    }, []);

    return (
        <div className="p-8 bg-slate-950 min-h-screen">
            <h2 className="text-3xl font-bold text-white mb-8">Active Routes</h2>

            <div className="space-y-4">
                {routes.map(route => (
                    <div key={route._id} className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between hover:border-slate-700 transition-all">
                        <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-2">
                                <div className="flex items-center space-x-2 text-white font-bold text-lg">
                                    <span className="text-blue-400">{route.startPoint}</span>
                                    <Navigation size={16} className="text-slate-500 transform rotate-90 md:rotate-0" />
                                    <span className="text-emerald-400">{route.endPoint}</span>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ${route.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700 text-slate-400'
                                    }`}>
                                    {route.status}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-slate-400 mt-2">
                                <div className="flex items-center space-x-1">
                                    <MapPin size={14} />
                                    <span>{route.distance} km</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Clock size={14} />
                                    <span>{Math.floor(route.estimatedTime / 60)}h {route.estimatedTime % 60}m</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Calendar size={14} />
                                    <span>{new Date(route.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 md:mt-0 md:ml-6 flex items-center space-x-4">
                            {route.assignedVehicle && (
                                <div className="text-right">
                                    <div className="text-white text-sm font-medium">{route.assignedVehicle.licensePlate}</div>
                                    <div className="text-slate-500 text-xs">{route.assignedVehicle.make}</div>
                                </div>
                            )}
                            {route.assignedDriver && (
                                <div className="text-right border-l border-slate-700 pl-4">
                                    <div className="text-white text-sm font-medium">{route.assignedDriver.name}</div>
                                    <div className="text-slate-500 text-xs">Driver</div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RouteList;
