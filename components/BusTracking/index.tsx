'use client';

import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// BusTracking component
const BusTracking = ({ busId }) => {
  const [busLocation, setBusLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([0, 0]);
  const [mapZoom, setMapZoom] = useState(13); // Initial zoom level
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!busId) return;

    // Function to fetch bus location
    const fetchBusLocation = async () => {
      try {
        const response = await fetch(`http://localhost:3400/api/v1/bus/location/${busId}`);
        const data = await response.json();
        const { lat, lon } = data.location; // Assuming the API returns lat and lon as properties of location

        if (lat !== undefined && lon !== undefined) {
          setBusLocation({ lat, lon });
          console.log("Bus location:", { lat, lon });
        }
      } catch (error) {
        console.error("Error fetching bus location:", error);
      }
    };

    // Fetch the bus location every 1000ms
    const intervalId = setInterval(fetchBusLocation, 1000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [busId]);

  // Update map position when busLocation changes
  useEffect(() => {
    if (busLocation && mapRef.current) {
      const map = mapRef.current as L.Map;
      map.setView([busLocation.lat, busLocation.lon], mapZoom); // Update map center to bus location and maintain current zoom level
    }
  }, [busLocation, mapZoom]);

  // Handle map view change (zoom or center)
  const handleMapViewChange = () => {
    const map = mapRef.current;
    if (map) {
      const center = map.getCenter();
      const zoom = map.getZoom();
      setMapCenter([center.lat, center.lng]);
      setMapZoom(zoom);
    }
  };

  // Create a custom bus icon
  const busIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png", // You can replace this URL with your own image URL
    iconSize: [40, 40], // Size of the icon
    iconAnchor: [20, 20], // Anchor the icon to the center
    popupAnchor: [0, -20], // Position the popup above the icon
  });

  return (
    <div style={{ height: "500px" }}>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: "100%" }}
        ref={mapRef} // Attach map reference
        whenReady={() => {
          if (mapRef.current) {
            mapRef.current.on('moveend', handleMapViewChange); // Capture map view change
            mapRef.current.on('zoomend', handleMapViewChange); // Capture zoom level change
          }
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {busLocation && (
          <Marker position={[busLocation.lat, busLocation.lon]} icon={busIcon}>
            <Popup>
              Bus ID: {busId}<br />
              Location: {busLocation.lat.toFixed(6)}, {busLocation.lon.toFixed(6)}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default BusTracking;
