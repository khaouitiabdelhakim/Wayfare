"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaBus,
  FaTicketAlt,
  FaMoneyBill,
  FaSpinner,
  FaMapMarkerAlt,
} from "react-icons/fa";

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
  passengerId: number;
  trip: Trip;
  seatNumber: number;
  status: boolean;
}

const UserTicketList = ({ passengerId }: { passengerId: number }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch tickets for the logged-in user
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/ticket/passenger/${passengerId}`
        );
        setTickets(response.data);
      } catch (err) {
        setError("Failed to fetch tickets. Please try again.");
        console.error("Error fetching tickets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [passengerId]);

  // Format datetime for display
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // Handle "Track Bus" button click
  const handleTrackBus = (busId: number) => {
    router.push(`/user/tracking?busId=${busId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <FaSpinner className="animate-spin text-4xl text-purple-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center text-red-600 shadow-lg">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-gray-50 p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-purple-800">My Tickets</h2>
      </div>

      {/* Ticket List */}
      <ul className="mb-6 space-y-4">
        {tickets.map((ticket) => (
          <li
            key={ticket.id}
            className="flex items-center justify-between rounded-lg border border-purple-200 bg-white p-4 shadow"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaUser className="text-purple-600" />
                  <p className="font-semibold">Passenger ID: {ticket.passengerId}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaBus className="text-purple-600" />
                  <span>Bus: {ticket.trip.bus.plateNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaTicketAlt />
                  <span>Seat: {ticket.seatNumber}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt />
                  <span>Departure: {formatDateTime(ticket.trip.departureTime)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt />
                  <span>Arrival: {formatDateTime(ticket.trip.arrivalTime)}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaMoneyBill className="text-green-600" />
                  <span>${ticket.trip.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  {ticket.status ? (
                    <FaCheckCircle className="text-green-600" />
                  ) : (
                    <FaTimesCircle className="text-red-600" />
                  )}
                  <span className="text-sm">
                    {ticket.status ? "Valid" : "Invalid"}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleTrackBus(ticket.trip.bus.id)}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-bold text-white transition-all duration-300 hover:bg-blue-700"
            >
              <FaMapMarkerAlt className="text-white" /> Track Bus
            </button>
          </li>
        ))}
      </ul>

      {/* Empty State */}
      {tickets.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500">
          <FaTicketAlt className="mb-2 text-4xl" />
          <h3 className="mb-1 text-lg font-medium">No Tickets Found</h3>
          <p className="mb-4">You do not have any active tickets.</p>
        </div>
      )}
    </div>
  );
};

export default UserTicketList;