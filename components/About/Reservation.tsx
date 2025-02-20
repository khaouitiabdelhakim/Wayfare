"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FaUsers, FaTicketAlt } from "react-icons/fa";
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
import { useRouter } from "next/navigation";

const host = "http://localhost:8080";

const Reservation = () => {
  const [busStops, setBusStops] = useState<{ id: number; name: string }[]>([]);
  const [source, setSource] = useState<number | null>(null);
  const [destination, setDestination] = useState<number | null>(null);
  const [date, setDate] = useState<string>("");
  const [passengers, setPassengers] = useState<number>(1);
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reservedTrips, setReservedTrips] = useState<any[]>([]); // Track reserved trips by full objects
  const router = useRouter();

  // Fetch all bus stops
  useEffect(() => {
    const fetchBusStops = async () => {
      try {
        const response = await axios.get(`${host}/api/busStops/`);
        setBusStops(response.data);
      } catch (err) {
        setError("Failed to fetch bus stops. Please try again.");
        console.error("Error fetching bus stops:", err);
      }
    };

    fetchBusStops();
  }, []);

  // Load reserved trips from localStorage on component mount
  useEffect(() => {
    const savedReservedTrips = JSON.parse(localStorage.getItem("reservedTrips") || "[]");
    setReservedTrips(savedReservedTrips);
  }, []);

  // Save reserved trips to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("reservedTrips", JSON.stringify(reservedTrips));
    console.log("Reserved trips updated:", reservedTrips);
  }, [reservedTrips]);

  // Search for trips
  const handleSearch = async () => {
    if (!source || !destination || !date) {
      setError("Please fill all fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${host}/api/trips/search`, {
        params: {
          sourceId: source,
          destinationId: destination,
          departureTime: date,
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

  // Toggle reservation status
  const toggleReservation = (trip: any) => {
    if (reservedTrips.some((t) => t.id === trip.id)) {
      setReservedTrips(reservedTrips.filter((t) => t.id !== trip.id));
    } else {
      setReservedTrips([...reservedTrips, trip]);
    }
  };

  // Redirect to payment page
  const handlePayment = () => {
    router.push("/global/payment");
  };

  // Format datetime for display
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
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
                <div className="mb-8 text-center text-gray-600">
                  Chargement...
                </div>
              )}
              {error && (
                <div className="mb-8 rounded-lg bg-red-50 p-4 text-red-500">
                  {error}
                </div>
              )}
              {trips.length > 0 && (
                <div className="space-y-4">
                  {/* Trip List */}
                  <ul className="mb-6 space-y-4">
                    {trips.map((trip) => (
                      <li
                        key={trip.id}
                        className="flex items-center justify-between rounded-lg border border-purple-200 bg-white p-4 shadow"
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <FaBus className="text-purple-600" />
                              <p className="font-semibold">
                                {trip.bus.plateNumber}
                              </p>
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
                              <span>
                                Departure: {formatDateTime(trip.departureTime)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaCalendarAlt />
                              <span>
                                Arrival: {formatDateTime(trip.arrivalTime)}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <FaMoneyBill className="text-green-600" />
                              <span>{trip.price.toFixed(2)} MAD</span>
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
                          {reservedTrips.some((t) => t.id === trip.id) ? (
                            <>
                              <button
                                className="flex items-center rounded-lg bg-gradient-to-r from-red-500 to-red-700 px-6 py-2 font-bold text-white shadow-lg transition-all duration-300 hover:from-red-600 hover:to-red-800"
                                onClick={() => toggleReservation(trip)}
                              >
                                <FaTimesCircle className="mr-2" /> Annuler
                              </button>
                              <button
                                className="flex items-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 px-6 py-2 font-bold text-white shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-blue-800"
                                onClick={handlePayment}
                              >
                                <FaMoneyBill className="mr-2" /> Payer
                              </button>
                            </>
                          ) : (
                            <button
                              className="flex items-center rounded-lg bg-gradient-to-r from-green-500 to-green-700 px-6 py-2 font-bold text-white shadow-lg transition-all duration-300 hover:from-green-600 hover:to-green-800"
                              onClick={() => toggleReservation(trip)}
                            >
                              <FaTicketAlt className="mr-2" /> Réserver
                            </button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
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