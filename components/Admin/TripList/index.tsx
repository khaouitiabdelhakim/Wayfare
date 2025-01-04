"use client";

import { useState } from "react";
import { FaEdit, FaTrash, FaTicketAlt } from "react-icons/fa";

enum Role {
  ADMIN = "Admin",
  PASSENGER = "Passenger",
}

interface Bus {
  id: number;
  plateNumber: string;
  capacity: number;
}

interface BusStop {
  id: number;
  name: string;
  location: string;
}

interface Route {
  id: number;
  source: BusStop;
  destination: BusStop;
  distance: number;
  duration: number;
}

interface Trip {
  id: number;
  bus: Bus;
  route: Route;
  departureTime: string;
  arrivalTime: string;
  price: number;
  status: boolean;
}

interface Ticket {
  id: number;
  passenger: Passenger;
  trip: Trip;
  seatNumber: number;
  status: boolean;
}

interface Passenger {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  phone: string;
  address: string;
  profilePicture: string;
}

const TripList = () => {
  const [trips, setTrips] = useState<Trip[]>([
    {
      id: 1,
      bus: { id: 1, plateNumber: "ABC123", capacity: 30 },
      route: { id: 1, source: { id: 1, name: "Station A", location: "Location A" }, destination: { id: 2, name: "Station B", location: "Location B" }, distance: 20, duration: 45 },
      departureTime: "2025-01-10T10:00:00",
      arrivalTime: "2025-01-10T10:45:00",
      price: 15.0,
      status: true,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);  // To show Add/Edit form
  const [editTrip, setEditTrip] = useState<Trip | null>(null);  // Track the trip being edited

  const filteredTrips = trips.filter(
    (trip) =>
      trip.route.source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.route.destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.bus.plateNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditTrip = (trip: Trip) => {
    setEditTrip(trip);  // Set the selected trip to be edited
    setShowForm(true);  // Show the form for editing
  };

  const handleDeleteTrip = (tripId: number) => {
    setTrips(trips.filter((trip) => trip.id !== tripId));
  };

  const handleAddOrEditTrip = (newTrip: Trip) => {
    if (editTrip) {
      // Edit existing trip
      setTrips(trips.map((trip) => (trip.id === newTrip.id ? newTrip : trip)));
    } else {
      // Add new trip
      setTrips([...trips, newTrip]);
    }
    setShowForm(false);  // Close form after adding/editing
    setEditTrip(null);  // Reset edit trip
  };

  return (
    <div className="rounded-lg bg-gray-50 p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-orange-800">Liste des trajets</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Rechercher par station ou numéro de bus"
        className="mb-6 w-full rounded-lg border p-2"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Add Trip Button */}
      <button
        onClick={() => {
          setShowForm(true);  // Show form for adding new trip
          setEditTrip(null);   // Clear any previous editing trip
        }}
        className="mb-4 rounded bg-green-500 px-4 py-2 text-white shadow hover:bg-green-600"
      >
        Ajouter un trajet
      </button>

      {/* Add/Edit Trip Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 mb-6 space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow">
          <h3 className="text-lg font-semibold text-orange-800">
            {editTrip ? "Modifier le trajet" : "Ajouter un nouveau trajet"}
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const newTrip: Trip = {
                id: editTrip ? editTrip.id : Date.now(),  // Use existing ID if editing, else generate new
                bus: {
                  id: 1,
                  plateNumber: formData.get("busPlateNumber") as string,
                  capacity: parseInt(formData.get("busCapacity") as string),
                },
                route: {
                  id: 1,
                  source: { id: 1, name: formData.get("sourceName") as string, location: "" },
                  destination: { id: 2, name: formData.get("destinationName") as string, location: "" },
                  distance: 20,
                  duration: 45,
                },
                departureTime: formData.get("departureTime") as string,
                arrivalTime: formData.get("arrivalTime") as string,
                price: parseFloat(formData.get("price") as string),
                status: true,
              };
              handleAddOrEditTrip(newTrip);
            }}
          >
            <div className="grid gap-4 grid-cols-2">
              <input
                type="text"
                name="busPlateNumber"
                defaultValue={editTrip?.bus.plateNumber || ""}
                placeholder="Numéro du bus"
                className="w-full rounded-lg border p-2"
              />
              <input
                type="number"
                name="busCapacity"
                defaultValue={editTrip?.bus.capacity || 30}
                placeholder="Capacité du bus"
                className="w-full rounded-lg border p-2"
              />
              <input
                type="text"
                name="sourceName"
                defaultValue={editTrip?.route.source.name || ""}
                placeholder="Station de départ"
                className="w-full rounded-lg border p-2"
              />
              <input
                type="text"
                name="destinationName"
                defaultValue={editTrip?.route.destination.name || ""}
                placeholder="Station d'arrivée"
                className="w-full rounded-lg border p-2"
              />
              <input
                type="datetime-local"
                name="departureTime"
                defaultValue={editTrip?.departureTime || ""}
                placeholder="Heure de départ"
                className="w-full rounded-lg border p-2"
              />
              <input
                type="datetime-local"
                name="arrivalTime"
                defaultValue={editTrip?.arrivalTime || ""}
                placeholder="Heure d'arrivée"
                className="w-full rounded-lg border p-2"
              />
              <input
                type="number"
                name="price"
                defaultValue={editTrip?.price || 0}
                placeholder="Prix"
                className="w-full rounded-lg border p-2"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded bg-gray-500 px-4 py-2 text-white"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="rounded bg-blue-500 px-4 py-2 text-white"
              >
                {editTrip ? "Modifier" : "Ajouter"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Trip List */}
      <ul className="mb-6 space-y-4">
        {filteredTrips.map((trip) => (
          <li key={trip.id} className="flex items-center justify-between rounded-lg border border-orange-200 bg-white p-4 shadow">
            <div>
              <p className="font-semibold">{`${trip.route.source.name} → ${trip.route.destination.name}`}</p>
              <p className="text-sm text-gray-600">Bus: {trip.bus.plateNumber}</p>
              <p className="text-sm text-gray-600">
                Départ: {trip.departureTime} | Arrivée: {trip.arrivalTime}
              </p>
              <p className="text-sm text-gray-600">Prix: {trip.price}€</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditTrip(trip)}
                className="text-blue-500"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDeleteTrip(trip.id)}
                className="text-red-500"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripList;
