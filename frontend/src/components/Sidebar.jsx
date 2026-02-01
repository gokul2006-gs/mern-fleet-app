import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Map, Truck, Users, Route as RouteIcon, Settings } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { path: '/map', label: 'Live Map', icon: <Map size={20} /> },
        { path: '/vehicles', label: 'Vehicles', icon: <Truck size={20} /> },
        { path: '/drivers', label: 'Drivers', icon: <Users size={20} /> },
        { path: '/routes', label: 'Routes', icon: <RouteIcon size={20} /> },
    ];

    return (
        <div className="bg-slate-900 text-white w-64 min-h-screen flex flex-col transition-all duration-300">
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    Fleet IQ
                </h1>
                <p className="text-xs text-slate-400 mt-1">Premium Fleet Mgmt</p>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${location.pathname === item.path
                                ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button className="flex items-center space-x-3 text-slate-400 hover:text-white px-4 py-2 w-full transition-colors">
                    <Settings size={20} />
                    <span>Settings</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
