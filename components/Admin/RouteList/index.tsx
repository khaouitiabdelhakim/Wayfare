'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import { 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaMapMarkerAlt, 
  FaRoute, 
  FaArrowRight,
  FaClock,
  FaRuler,
  FaSearch,
  FaMapMarked
} from "react-icons/fa";

class BusStop {
  id: number;
  name: string;
  location: string;

  constructor(id: number, name: string, location: string) {
    this.id = id;
    this.name = name;
    this.location = location;
  }
}

class Route {
  id: number;
  source: BusStop;
  destination: BusStop;
  distance: number;
  duration: number;

  constructor(id: number, source: BusStop, destination: BusStop, distance: number, duration: number) {
    this.id = id;
    this.source = source;
    this.destination = destination;
    this.distance = distance;
    this.duration = duration;
  }
}

const RouteList = () => {
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all bus stops and routes on component mount
  useEffect(() => {
    fetchBusStops();
    fetchRoutes();
  }, []);

  const fetchBusStops = async () => {
    try {
      const response = await axios.get("/api/v1/busStops/");
      setBusStops(response.data);
    } catch (error) {
      console.error("Error fetching bus stops:", error);
    }
  };

  const fetchRoutes = async () => {
    try {
      const response = await axios.get("/api/v1/routes/");
      setRoutes(response.data);
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  // Add new route
  const handleAddRoute = async (routeData: {
    sourceId: number;
    destinationId: number;
    distance: number;
    duration: number;
  }) => {
    try {
      const response = await axios.post("/api/v1/routes/", routeData);
      setRoutes([...routes, response.data]);
      setShowAddPopup(false);
    } catch (error) {
      console.error("Error adding route:", error);
    }
  };

  // Edit existing route
  const handleEditRoute = (route: Route) => {
    setSelectedRoute(route);
    setShowEditPopup(true);
  };

  // Delete route
  const handleDeleteRoute = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this route?")) {
      try {
        await axios.delete(`/api/v1/routes/${id}`);
        setRoutes(routes.filter((route) => route.id !== id));
      } catch (error) {
        console.error("Error deleting route:", error);
      }
    }
  };

  // Save edited route
  const handleSaveEdit = async () => {
    if (selectedRoute) {
      try {
        const response = await axios.put(`/api/v1/routes/${selectedRoute.id}`, selectedRoute);
        setRoutes(routes.map((route) => (route.id === selectedRoute.id ? response.data : route)));
        setShowEditPopup(false);
        setSelectedRoute(null);
      } catch (error) {
        console.error("Error updating route:", error);
      }
    }
  };

  // Filter routes based on search
  const filteredRoutes = routes.filter(route => 
    route.source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.destination.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-lg bg-gray-50 p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-blue-800">Route Management</h2>
        <button
          className="flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
          onClick={() => setShowAddPopup(true)}
        >
          <FaPlus /> Add New Route
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by stop name..."
          className="w-full rounded-lg border p-2 pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Route List */}
      <ul className="mb-6 space-y-4">
        {filteredRoutes.map((route) => (
          <li
            key={route.id}
            className="flex items-center justify-between rounded-lg border border-blue-200 bg-white p-4 shadow"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-600" />
                  <p className="font-semibold">{route.source.name}</p>
                </div>
                <FaArrowRight className="text-gray-400" />
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-600" />
                  <p className="font-semibold">{route.destination.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FaMapMarked />
                  <span>Source: {route.source.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarked />
                  <span>Destination: {route.destination.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FaRuler />
                  <span>{route.distance} km</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock />
                  <span>{route.duration} mins</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
                onClick={() => handleEditRoute(route)}
              >
                <FaEdit /> Edit
              </button>
              <button
                className="flex items-center gap-2 rounded bg-red-500 px-4 py-2 text-white shadow hover:bg-red-600"
                onClick={() => handleDeleteRoute(route.id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Add Route Popup */}
      {showAddPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-bold text-blue-800">Add New Route</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleAddRoute({
                sourceId: Number(formData.get('sourceId')),
                destinationId: Number(formData.get('destinationId')),
                distance: Number(formData.get('distance')),
                duration: Number(formData.get('duration'))
              });
            }}>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaMapMarkerAlt className="inline mr-2" />
                  Source Stop
                </label>
                <select
                  name="sourceId"
                  required
                  className="w-full rounded-lg border p-2"
                >
                  <option value="">Select source stop</option>
                  {busStops.map(stop => (
                    <option key={stop.id} value={stop.id}>{stop.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaMapMarkerAlt className="inline mr-2" />
                  Destination Stop
                </label>
                <select
                  name="destinationId"
                  required
                  className="w-full rounded-lg border p-2"
                >
                  <option value="">Select destination stop</option>
                  {busStops.map(stop => (
                    <option key={stop.id} value={stop.id}>{stop.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaRuler className="inline mr-2" />
                  Distance (km)
                </label>
                <input
                  name="distance"
                  type="number"
                  step="0.1"
                  required
                  min="0.1"
                  className="w-full rounded-lg border p-2"
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaClock className="inline mr-2" />
                  Duration (minutes)
                </label>
                <input
                  name="duration"
                  type="number"
                  required
                  min="1"
                  className="w-full rounded-lg border p-2"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="rounded bg-gray-200 px-4 py-2 shadow hover:bg-gray-300"
                  onClick={() => setShowAddPopup(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
                >
                  Add Route
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Route Popup */}
      {showEditPopup && selectedRoute && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-bold text-blue-800">Edit Route</h3>
            <form>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaMapMarkerAlt className="inline mr-2" />
                  Source Stop
                </label>
                <select
                  className="w-full rounded-lg border p-2"
                  value={selectedRoute.source.id}
                  onChange={(e) => {
                    const stop = busStops.find(s => s.id === Number(e.target.value));
                    if (stop) {
                      setSelectedRoute({
                        ...selectedRoute,
                        source: stop
                      });
                    }
                  }}
                >
                  {busStops.map(stop => (
                    <option key={stop.id} value={stop.id}>{stop.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaMapMarkerAlt className="inline mr-2" />
                  Destination Stop
                </label>
                <select
                  className="w-full rounded-lg border p-2"
                  value={selectedRoute.destination.id}
                  onChange={(e) => {
                    const stop = busStops.find(s => s.id === Number(e.target.value));
                    if (stop) {
                      setSelectedRoute({
                        ...selectedRoute,
                        destination: stop
                      });
                    }
                  }}
                >
                  {busStops.map(stop => (
                    <option key={stop.id} value={stop.id}>{stop.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaRuler className="inline mr-2" />
                  Distance (km)
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full rounded-lg border p-2"
                  value={selectedRoute.distance}
                  onChange={(e) =>
                    setSelectedRoute({
                      ...selectedRoute,
                      distance: Number(e.target.value)
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaClock className="inline mr-2" />
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border p-2"
                  value={selectedRoute.duration}
                  onChange={(e) =>
                    setSelectedRoute({
                      ...selectedRoute,
                      duration: Number(e.target.value)
                    })
                  }
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="rounded bg-gray-200 px-4 py-2 shadow hover:bg-gray-300"
                  onClick={() => setShowEditPopup(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
                  onClick={handleSaveEdit}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteList;