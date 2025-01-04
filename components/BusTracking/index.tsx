'use client';

import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const BusTracking = ({ busId }) => {
  const [busLocation, setBusLocation] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !busId) return;

    const fetchBusLocation = async () => {
      try {
        const response = await fetch(`http://localhost:3400/api/v1/bus/location/${busId}`);
        const data = await response.json();
        setBusLocation(data.location);
      } catch (error) {
        console.error("Error fetching bus location:", error);
      }
    };

    const intervalId = setInterval(fetchBusLocation, 1000);
    return () => clearInterval(intervalId);
  }, [busId]);

  if (!busLocation) {
    return <p>Loading bus location...</p>;
  }

  const busIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });

  return (
    <div style={{ height: "500px" }}>
      <MapContainer
        center={[busLocation.lat, busLocation.lon]}
        zoom={13}
        style={{ height: "100%" }}
        ref={mapRef}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[busLocation.lat, busLocation.lon]} icon={busIcon}>
          <Popup>
            Bus ID: {busId}<br />
            Location: {busLocation.lat.toFixed(6)}, {busLocation.lon.toFixed(6)}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default BusTracking;
