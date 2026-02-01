import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Fix for default Leaflet icon not showing
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Connect to backend

const FleetMap = () => {
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

        // Listen for real-time updates
        socket.on('vehicleUpdates', (updatedVehicles) => {
            setVehicles(prevVehicles => {
                const vehicleMap = new Map(prevVehicles.map(v => [v._id, v]));
                updatedVehicles.forEach(newV => vehicleMap.set(newV._id, newV));
                return Array.from(vehicleMap.values());
            });
        });

        return () => {
            socket.off('vehicleUpdates');
        };
    }, []);

    // Center map on India as default given the seed data
    const center = [20.5937, 78.9629];

    return (
        <div className="h-[calc(100vh-100px)] w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200">
            <MapContainer center={center} zoom={5} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {vehicles.map(vehicle => (
                    vehicle.currentLocation && vehicle.currentLocation.lat ? (
                        <Marker
                            key={vehicle._id}
                            position={[vehicle.currentLocation.lat, vehicle.currentLocation.lng]}
                        >
                            <Popup>
                                <div className="p-2">
                                    <h3 className="font-bold text-lg">{vehicle.make} {vehicle.model}</h3>
                                    <p className="text-sm">Plate: {vehicle.licensePlate}</p>
                                    <p className="text-sm">Status: <span className={`font-semibold ${vehicle.status === 'Active' ? 'text-green-600' :
                                        vehicle.status === 'Maintenance' ? 'text-red-600' : 'text-yellow-600'
                                        }`}>{vehicle.status}</span></p>
                                    <p className="text-sm">Fuel: {vehicle.fuelLevel}%</p>
                                </div>
                            </Popup>
                        </Marker>
                    ) : null
                ))}
            </MapContainer>
        </div>
    );
};

export default FleetMap;
