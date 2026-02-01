import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import VehicleList from './pages/VehicleList';
import DriverList from './pages/DriverList';
import RouteList from './pages/RouteList';
import FleetMap from './components/FleetMap';

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-slate-950">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/map" element={<div className="p-8"><h2 className="text-3xl font-bold text-white mb-6">Live Map</h2><FleetMap /></div>} />
            <Route path="/vehicles" element={<VehicleList />} />
            <Route path="/drivers" element={<DriverList />} />
            <Route path="/routes" element={<RouteList />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
