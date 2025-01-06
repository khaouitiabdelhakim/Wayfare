"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FaBus, FaCalendarAlt, FaUsers, FaSearch, FaTicketAlt } from "react-icons/fa";

const Reservation = () => {
  const [busStops, setBusStops] = useState<{ id: number; name: string }[]>([]);
  const [source, setSource] = useState<number | null>(null);
  const [destination, setDestination] = useState<number | null>(null);
  const [date, setDate] = useState<string>("");
  const [passengers, setPassengers] = useState<number>(1);
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all bus stops
  useEffect(() => {
    const fetchBusStops = async () => {
      try {
        const response = await axios.get("/api/v1/busStops/");
        setBusStops(response.data);
      } catch (err) {
        setError("Failed to fetch bus stops. Please try again.");
        console.error("Error fetching bus stops:", err);
      }
    };

    fetchBusStops();
  }, []);

  // Search for trips
  const handleSearch = async () => {
    if (!source || !destination || !date) {
      setError("Please fill all fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/api/v1/trips/search", {
        params: {
          sourceId: source,
          destinationId: destination,
          date,
        },
      });
      setTrips(response.data);
    } catch (err) {
      setError("Failed to fetch trips. Please try again.");
      console.error("Error fetching trips:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reservation" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full">
              {/* Call-to-action Buttons */}
              <div className="mb-8 flex space-x-4">
                <a
                  href="#"
                  className="rounded-lg bg-gradient-to-r from-orange-400 to-orange-600 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:from-orange-500 hover:to-orange-700"
                >
                  Réservez Maintenant
                </a>
                <a
                  href="#"
                  className="rounded-lg bg-gradient-to-r from-gray-700 to-black px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:from-gray-800 hover:to-black"
                >
                  Explorer les Destinations
                </a>
              </div>

              {/* Search Bar */}
              <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="relative">
                    <select
                      value={source || ""}
                      onChange={(e) => setSource(Number(e.target.value))}
                      className="w-full rounded-lg border border-gray-300 p-3 pl-10"
                    >
                      <option value="" disabled>
                        Sélectionnez le départ
                      </option>
                      {busStops.map((stop) => (
                        <option key={stop.id} value={stop.id}>
                          {stop.name}
                        </option>
                      ))}
                    </select>
                    <FaBus className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>

                  <div className="relative">
                    <select
                      value={destination || ""}
                      onChange={(e) => setDestination(Number(e.target.value))}
                      className="w-full rounded-lg border border-gray-300 p-3 pl-10"
                    >
                      <option value="" disabled>
                        Sélectionnez la destination
                      </option>
                      {busStops.map((stop) => (
                        <option key={stop.id} value={stop.id}>
                          {stop.name}
                        </option>
                      ))}
                    </select>
                    <FaBus className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>

                  <div className="relative">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 p-3 pl-10"
                    />
                    <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>

                  <div className="relative">
                    <input
                      type="number"
                      value={passengers}
                      onChange={(e) => setPassengers(Number(e.target.value))}
                      min="1"
                      className="w-full rounded-lg border border-gray-300 p-3 pl-10"
                    />
                    <FaUsers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <button
                  onClick={handleSearch}
                  className="mt-4 flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:from-orange-600 hover:to-orange-800"
                >
                  <FaSearch className="mr-2" /> Rechercher
                </button>
              </div>

              {/* Trip Results */}
              {loading && (
                <div className="mb-8 text-center text-gray-600">Chargement...</div>
              )}
              {error && (
                <div className="mb-8 rounded-lg bg-red-50 p-4 text-red-500">
                  {error}
                </div>
              )}
              {trips.length > 0 && (
                <div className="space-y-4">
                  {trips.map((trip) => (
                    <div
                      key={trip.id}
                      className="rounded-lg bg-white p-6 shadow-lg"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {trip.source.name} → {trip.destination.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Départ: {new Date(trip.departureTime).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600">
                            Arrivée: {new Date(trip.arrivalTime).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="text-lg font-bold text-gray-800">
                            ${trip.price.toFixed(2)}
                          </p>
                          <button className="flex items-center rounded-lg bg-gradient-to-r from-green-500 to-green-700 px-6 py-2 font-bold text-white shadow-lg transition-all duration-300 hover:from-green-600 hover:to-green-800">
                            <FaTicketAlt className="mr-2" /> Réserver
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;