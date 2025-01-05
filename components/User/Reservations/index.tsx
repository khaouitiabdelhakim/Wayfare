"use client";

import { useState } from "react";
import {
  FaUser,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaBus,
  FaTicketAlt,
  FaMoneyBill,
} from "react-icons/fa";

class Passenger {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

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
    duration: number
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
    status: boolean
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

class Ticket {
  id: number;
  passenger: Passenger;
  trip: Trip;
  seatNumber: number;
  status: boolean;

  constructor(
    id: number,
    passenger: Passenger,
    trip: Trip,
    seatNumber: number,
    status: boolean
  ) {
    this.id = id;
    this.passenger = passenger;
    this.trip = trip;
    this.seatNumber = seatNumber;
    this.status = status;
  }
}

const UserTicketList = ({ userId }: { userId: number }) => {
  // Sample data
  const [passengers] = useState<Passenger[]>([
    new Passenger(1, "John", "Doe", "john@example.com", "+1234567890"),
    new Passenger(2, "Jane", "Smith", "jane@example.com", "+1987654321"),
  ]);

  const [buses] = useState<Bus[]>([
    new Bus(1, "ABC123", 50),
    new Bus(2, "XYZ789", 40),
  ]);

  const [busStops] = useState<BusStop[]>([
    new BusStop(1, "Downtown", "123 Main St"),
    new BusStop(2, "Uptown", "456 Elm St"),
  ]);

  const [routes] = useState<Route[]>([
    new Route(1, busStops[0], busStops[1], 10.5, 30),
    new Route(2, busStops[1], busStops[0], 10.5, 30),
  ]);

  const [trips] = useState<Trip[]>([
    new Trip(
      1,
      buses[0],
      routes[0],
      "2025-01-01T08:00:00",
      "2025-01-01T08:30:00",
      5.0,
      true
    ),
    new Trip(
      2,
      buses[1],
      routes[1],
      "2025-01-01T09:00:00",
      "2025-01-01T09:30:00",
      5.0,
      true
    ),
  ]);

  const [tickets] = useState<Ticket[]>([
    new Ticket(1, passengers[0], trips[0], 12, true),
    new Ticket(2, passengers[1], trips[1], 15, true),
  ]);

  // Filter tickets for the logged-in user
  const userTickets = tickets.filter((ticket) => ticket.passenger.id === userId);

  // Format datetime for display
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="rounded-lg bg-gray-50 p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-purple-800">My Tickets</h2>
      </div>

      {/* Ticket List */}
      <ul className="mb-6 space-y-4">
        {userTickets.map((ticket) => (
          <li
            key={ticket.id}
            className="flex items-center justify-between rounded-lg border border-purple-200 bg-white p-4 shadow"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaUser className="text-purple-600" />
                  <p className="font-semibold">{ticket.passenger.fullName}</p>
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
          </li>
        ))}
      </ul>

      {/* Empty State */}
      {userTickets.length === 0 && (
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