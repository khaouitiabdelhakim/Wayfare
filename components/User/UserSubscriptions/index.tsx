"use client";

import { useState } from "react";
import {
  FaUser,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaTags,
  FaClock,
  FaMoneyBill,
} from "react-icons/fa";

class SubscriptionType {
  id: number;
  name: string;
  price: number;
  duration: number;

  constructor(id: number, name: string, price: number, duration: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.duration = duration;
  }
}

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

class Subscription {
  id: number;
  type: SubscriptionType;
  passenger: Passenger;
  startDate: string;
  endDate: string;
  status: boolean;

  constructor(
    id: number,
    type: SubscriptionType,
    passenger: Passenger,
    startDate: string,
    endDate: string,
    status: boolean = true
  ) {
    this.id = id;
    this.type = type;
    this.passenger = passenger;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
  }
}

const UserSubscriptionList = ({ userId }: { userId: number }) => {
  // Sample data
  const [subscriptionTypes] = useState<SubscriptionType[]>([
    new SubscriptionType(1, "Monthly Pass", 99.99, 30),
    new SubscriptionType(2, "Quarterly Pass", 269.99, 90),
    new SubscriptionType(3, "Annual Pass", 999.99, 365),
  ]);

  const [passengers] = useState<Passenger[]>([
    new Passenger(1, "John", "Doe", "john@example.com", "+1234567890"),
    new Passenger(2, "Jane", "Smith", "jane@example.com", "+1987654321"),
  ]);

  const [subscriptions] = useState<Subscription[]>([
    new Subscription(
      1,
      subscriptionTypes[0],
      passengers[0],
      "2025-01-01T00:00",
      "2025-01-31T23:59",
      true
    ),
    new Subscription(
      2,
      subscriptionTypes[2],
      passengers[1],
      "2025-01-01T00:00",
      "2025-12-31T23:59",
      true
    ),
  ]);

  // Filter subscriptions for the logged-in user
  const userSubscriptions = subscriptions.filter(
    (sub) => sub.passenger.id === userId
  );

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
        <h2 className="text-xl font-bold text-purple-800">My Subscriptions</h2>
      </div>

      {/* Subscription List */}
      <ul className="mb-6 space-y-4">
        {userSubscriptions.map((subscription) => (
          <li
            key={subscription.id}
            className="flex items-center justify-between rounded-lg border border-purple-200 bg-white p-4 shadow"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaUser className="text-purple-600" />
                  <p className="font-semibold">{subscription.passenger.fullName}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaTags className="text-purple-600" />
                  <span>{subscription.type.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock />
                  <span>{subscription.type.duration} days</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt />
                  <span>Start: {formatDateTime(subscription.startDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt />
                  <span>End: {formatDateTime(subscription.endDate)}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaMoneyBill className="text-green-600" />
                  <span>${subscription.type.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  {subscription.status ? (
                    <FaCheckCircle className="text-green-600" />
                  ) : (
                    <FaTimesCircle className="text-red-600" />
                  )}
                  <span className="text-sm">
                    {subscription.status ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Empty State */}
      {userSubscriptions.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500">
          <FaTags className="mb-2 text-4xl" />
          <h3 className="mb-1 text-lg font-medium">No Subscriptions Found</h3>
          <p className="mb-4">You do not have any active subscriptions.</p>
        </div>
      )}
    </div>
  );
};

export default UserSubscriptionList;