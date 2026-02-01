import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Map, Truck, Users, Route as RouteIcon, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

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
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="relative z-50 w-64 min-h-screen flex flex-col bg-slate-900/80 backdrop-blur-xl border-r border-white/10 shadow-[0_0_15px_rgba(0,243,255,0.1)]"
        >
            <div className="p-8 border-b border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h1 className="text-3xl font-black italic tracking-tighter bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent relative z-10 font-sans">
                    FLEET<span className="text-white">IQ</span>
                </h1>
                <p className="text-[10px] uppercase tracking-widest text-cyber-500 mt-2 font-semibold">Future Logistics</p>
            </div>

            <nav className="flex-1 p-4 space-y-2 mt-4">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="relative block group"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-gradient-to-r from-cyber-600/30 to-transparent border-l-4 border-neon-blue rounded-r-xl"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                            <div className={`relative flex items-center space-x-3 px-4 py-3 rounded-r-xl transition-all duration-300 ${isActive ? 'text-white translate-x-1' : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}>
                                <span className={`${isActive ? 'text-neon-blue drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]' : ''}`}>
                                    {item.icon}
                                </span>
                                <span className="font-medium tracking-wide font-sans">{item.label}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10 bg-black/20">
                <button className="flex items-center space-x-3 text-slate-400 hover:text-white px-4 py-2 w-full transition-colors group">
                    <Settings size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                    <span className="font-sans">Settings</span>
                </button>
            </div>
        </motion.div>
    );
};

export default Sidebar;
