"use client";

import { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaBus,
  FaRoute,
  FaClock,
  FaMoneyBill,
  FaSearch,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
} from "react-icons/fa";

class Bus {
  id: number;
  plateNumber: string;
  capacity: number;

  constructor(id: number, plateNumber: string, capacity: number) {
    this.id = id;
    this.plateNumber = plateNumber;
    this.capacity = capacity;
  }
}

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

  constructor(
    id: number,
    source: BusStop,
    destination: BusStop,
    distance: number,
    duration: number,
  ) {
    this.id = id;
    this.source = source;
    this.destination = destination;
    this.distance = distance;
    this.duration = duration;
  }
}

class Trip {
  id: number;
  bus: Bus;
  route: Route;
  departureTime: string;
  arrivalTime: string;
  price: number;
  status: boolean;

  constructor(
    id: number,
    bus: Bus,
    route: Route,
    departureTime: string,
    arrivalTime: string,
    price: number,
    status: boolean = true,
  ) {
    this.id = id;
    this.bus = bus;
    this.route = route;
    this.departureTime = departureTime;
    this.arrivalTime = arrivalTime;
    this.price = price;
    this.status = status;
  }
}

const TripList = () => {
  // Sample data
  const [buses] = useState<Bus[]>([
    new Bus(1, "ABC-123", 50),
    new Bus(2, "XYZ-456", 60),
  ]);

  const [busStops] = useState<BusStop[]>([
    new BusStop(1, "Central Station", "Downtown"),
    new BusStop(2, "Airport Terminal", "Airport Area"),
    new BusStop(3, "Shopping Mall", "Suburb"),
  ]);

  const [routes] = useState<Route[]>([
    new Route(1, busStops[0], busStops[1], 15.5, 30),
    new Route(2, busStops[1], busStops[2], 8.2, 20),
  ]);

  const [trips, setTrips] = useState<Trip[]>([
    new Trip(
      1,
      buses[0],
      routes[0],
      "2025-01-06T08:00",
      "2025-01-06T08:30",
      25.0,
      true,
    ),
    new Trip(
      2,
      buses[1],
      routes[1],
      "2025-01-06T09:00",
      "2025-01-06T09:20",
      15.5,
      true,
    ),
  ]);

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Add new trip
  const handleAddTrip = (tripData: {
    busId: number;
    routeId: number;
    departureTime: string;
    arrivalTime: string;
    price: number;
  }) => {
    const bus = buses.find((b) => b.id === Number(tripData.busId));
    const route = routes.find((r) => r.id === Number(tripData.routeId));

    if (bus && route) {
      const newId = Math.max(...trips.map((t) => t.id)) + 1;
      const newTrip = new Trip(
        newId,
        bus,
        route,
        tripData.departureTime,
        tripData.arrivalTime,
        tripData.price,
      );
      setTrips([...trips, newTrip]);
      setShowAddPopup(false);
    }
  };

  // Edit existing trip
  const handleEditTrip = (trip: Trip) => {
    setSelectedTrip(trip);
    setShowEditPopup(true);
  };

  // Delete trip
  const handleDeleteTrip = (id: number) => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      setTrips(trips.filter((trip) => trip.id !== id));
    }
  };

  // Save edited trip
  const handleSaveEdit = () => {
    if (selectedTrip) {
      setTrips(
        trips.map((trip) =>
          trip.id === selectedTrip.id ? selectedTrip : trip,
        ),
      );
      setShowEditPopup(false);
      setSelectedTrip(null);
    }
  };

  // Format datetime for display
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // Filter trips based on search
  const filteredTrips = trips.filter(
    (trip) =>
      trip.bus.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.route.source.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      trip.route.destination.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="rounded-lg bg-gray-50 p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-purple-800">Trip Management</h2>
        <button
          className="flex items-center gap-2 rounded bg-purple-500 px-4 py-2 text-white shadow hover:bg-purple-600"
          onClick={() => setShowAddPopup(true)}
        >
          <FaPlus /> Add New Trip
        </button>
      </div>
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by bus or route..."
          className="w-full rounded-lg border p-2 pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {/* Trip List */}
      <ul className="mb-6 space-y-4">
        {filteredTrips.map((trip) => (
          <li
            key={trip.id}
            className="flex items-center justify-between rounded-lg border border-purple-200 bg-white p-4 shadow"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaBus className="text-purple-600" />
                  <p className="font-semibold">{trip.bus.plateNumber}</p>
                  <span className="text-sm text-gray-500">
                    (Capacity: {trip.bus.capacity})
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaRoute className="text-purple-600" />
                  <span>{trip.route.source.name}</span>
                  <FaArrowRight className="text-gray-400" />
                  <span>{trip.route.destination.name}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt />
                  <span>Departure: {formatDateTime(trip.departureTime)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt />
                  <span>Arrival: {formatDateTime(trip.arrivalTime)}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaMoneyBill className="text-green-600" />
                  <span>${trip.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  {trip.status ? (
                    <FaCheckCircle className="text-green-600" />
                  ) : (
                    <FaTimesCircle className="text-red-600" />
                  )}
                  <span className="text-sm">
                    {trip.status ? "Active" : "Cancelled"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="flex items-center gap-2 rounded bg-purple-500 px-4 py-2 text-white shadow hover:bg-purple-600"
                onClick={() => handleEditTrip(trip)}
              >
                <FaEdit /> Edit
              </button>
              <button
                className="flex items-center gap-2 rounded bg-red-500 px-4 py-2 text-white shadow hover:bg-red-600"
                onClick={() => handleDeleteTrip(trip.id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Add Trip Popup */}
      {showAddPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-bold text-purple-800">
              Add New Trip
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleAddTrip({
                  busId: Number(formData.get("busId")),
                  routeId: Number(formData.get("routeId")),
                  departureTime: formData.get("departureTime") as string,
                  arrivalTime: formData.get("arrivalTime") as string,
                  price: Number(formData.get("price")),
                });
              }}
            >
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaBus className="mr-2 inline" />
                  Bus
                </label>
                <select
                  name="busId"
                  required
                  className="w-full rounded-lg border p-2"
                >
                  <option value="">Select bus</option>
                  {buses.map((bus) => (
                    <option key={bus.id} value={bus.id}>
                      {bus.plateNumber} (Capacity: {bus.capacity})
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaRoute className="mr-2 inline" />
                  Route
                </label>
                <select
                  name="routeId"
                  required
                  className="w-full rounded-lg border p-2"
                >
                  <option value="">Select route</option>
                  {routes.map((route) => (
                    <option key={route.id} value={route.id}>
                      {route.source.name} → {route.destination.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaCalendarAlt className="mr-2 inline" />
                  Departure Time
                </label>
                <input
                  name="departureTime"
                  type="datetime-local"
                  required
                  className="w-full rounded-lg border p-2"
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaCalendarAlt className="mr-2 inline" />
                  Arrival Time
                </label>
                <input
                  name="arrivalTime"
                  type="datetime-local"
                  required
                  className="w-full rounded-lg border p-2"
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaMoneyBill className="mr-2 inline" />
                  Price ($)
                </label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  required
                  min="0.01"
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
                  className="rounded bg-purple-500 px-4 py-2 text-white shadow hover:bg-purple-600"
                >
                  Add Trip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Edit Trip Popup */}
      {showEditPopup && selectedTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-bold text-purple-800">
              Edit Trip
            </h3>
            <form>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaBus className="mr-2 inline" />
                  Bus
                </label>
                <select
                  className="w-full rounded-lg border p-2"
                  value={selectedTrip.bus.id}
                  onChange={(e) => {
                    const bus = buses.find(
                      (b) => b.id === Number(e.target.value),
                    );
                    if (bus) {
                      setSelectedTrip({
                        ...selectedTrip,
                        bus: bus,
                      });
                    }
                  }}
                >
                  {buses.map((bus) => (
                    <option key={bus.id} value={bus.id}>
                      {bus.plateNumber} (Capacity: {bus.capacity})
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaRoute className="mr-2 inline" />
                  Route
                </label>
                <select
                  className="w-full rounded-lg border p-2"
                  value={selectedTrip.route.id}
                  onChange={(e) => {
                    const route = routes.find(
                      (r) => r.id === Number(e.target.value),
                    );
                    if (route) {
                      setSelectedTrip({
                        ...selectedTrip,
                        route: route,
                      });
                    }
                  }}
                >
                  {routes.map((route) => (
                    <option key={route.id} value={route.id}>
                      {route.source.name} → {route.destination.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaCalendarAlt className="mr-2 inline" />
                  Departure Time
                </label>
                <input
                  type="datetime-local"
                  className="w-full rounded-lg border p-2"
                  value={selectedTrip.departureTime}
                  onChange={(e) =>
                    setSelectedTrip({
                      ...selectedTrip,
                      departureTime: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaCalendarAlt className="mr-2 inline" />
                  Arrival Time
                </label>
                <input
                  type="datetime-local"
                  className="w-full rounded-lg border p-2"
                  value={selectedTrip.arrivalTime}
                  onChange={(e) =>
                    setSelectedTrip({
                      ...selectedTrip,
                      arrivalTime: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaMoneyBill className="mr-2 inline" />
                  Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full rounded-lg border p-2"
                  value={selectedTrip.price}
                  onChange={(e) =>
                    setSelectedTrip({
                      ...selectedTrip,
                      price: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedTrip.status}
                    onChange={(e) =>
                      setSelectedTrip({
                        ...selectedTrip,
                        status: e.target.checked,
                      })
                    }
                  />
                  <span className="text-sm font-medium">Active</span>
                </label>
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
                  className="rounded bg-purple-500 px-4 py-2 text-white shadow hover:bg-purple-600"
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

export default TripList;
