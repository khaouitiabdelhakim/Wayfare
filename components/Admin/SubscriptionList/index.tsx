"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaUser,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
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

const SubscriptionList = () => {
  const [subscriptionTypes, setSubscriptionTypes] = useState<SubscriptionType[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all subscription types, passengers, and subscriptions on component mount
  useEffect(() => {
    fetchSubscriptionTypes();
    fetchPassengers();
    fetchSubscriptions();
  }, []);

  const fetchSubscriptionTypes = async () => {
    try {
      const response = await axios.get("/api/v1/subscription-types/");
      setSubscriptionTypes(response.data);
    } catch (error) {
      console.error("Error fetching subscription types:", error);
    }
  };

  const fetchPassengers = async () => {
    try {
      const response = await axios.get("/api/v1/passengers/"); // Replace with actual endpoint
      setPassengers(response.data);
    } catch (error) {
      console.error("Error fetching passengers:", error);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get("/api/v1/subscriptions/");
      setSubscriptions(response.data);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };

  // Add new subscription
  const handleAddSubscription = async (subscriptionData: {
    typeId: number;
    passengerId: number;
    startDate: string;
    endDate: string;
  }) => {
    try {
      const response = await axios.post("/api/v1/subscriptions/", subscriptionData);
      setSubscriptions([...subscriptions, response.data]);
      setShowAddPopup(false);
    } catch (error) {
      setError("Failed to add subscription. Please try again.");
      console.error("Error adding subscription:", error);
    }
  };

  // Edit existing subscription
  const handleEditSubscription = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setShowEditPopup(true);
  };

  // Delete subscription
  const handleDeleteSubscription = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this subscription?")) {
      try {
        await axios.delete(`/api/v1/subscriptions/${id}`);
        setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
      } catch (error) {
        setError("Failed to delete subscription. Please try again.");
        console.error("Error deleting subscription:", error);
      }
    }
  };

  // Save edited subscription
  const handleSaveEdit = async () => {
    if (selectedSubscription) {
      try {
        const response = await axios.put(
          `/api/v1/subscriptions/${selectedSubscription.id}`,
          selectedSubscription
        );
        setSubscriptions(
          subscriptions.map((sub) =>
            sub.id === selectedSubscription.id ? response.data : sub
          )
        );
        setShowEditPopup(false);
        setSelectedSubscription(null);
      } catch (error) {
        setError("Failed to update subscription. Please try again.");
        console.error("Error updating subscription:", error);
      }
    }
  };

  // Format datetime for display
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // Filter subscriptions based on search
  const filteredSubscriptions = subscriptions.filter(
    (sub) =>
      sub.passenger.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.type.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-lg bg-gray-50 p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-purple-800">
          Subscription Management
        </h2>
        <button
          className="flex items-center gap-2 rounded bg-purple-500 px-4 py-2 text-white shadow hover:bg-purple-600"
          onClick={() => setShowAddPopup(true)}
        >
          <FaPlus /> Add New Subscription
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by passenger name or subscription type..."
          className="w-full rounded-lg border p-2 pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Error Message */}
      {error && <div className="mb-4 text-center text-red-500">{error}</div>}

      {/* Subscription List */}
      <ul className="mb-6 space-y-4">
        {filteredSubscriptions.map((subscription) => (
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
            <div className="flex gap-2">
              <button
                className="flex items-center gap-2 rounded bg-purple-500 px-4 py-2 text-white shadow hover:bg-purple-600"
                onClick={() => handleEditSubscription(subscription)}
              >
                <FaEdit /> Edit
              </button>
              <button
                className="flex items-center gap-2 rounded bg-red-500 px-4 py-2 text-white shadow hover:bg-red-600"
                onClick={() => handleDeleteSubscription(subscription.id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Add Subscription Popup */}
      {showAddPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-bold text-purple-800">
              Add New Subscription
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleAddSubscription({
                  typeId: Number(formData.get("typeId")),
                  passengerId: Number(formData.get("passengerId")),
                  startDate: formData.get("startDate") as string,
                  endDate: formData.get("endDate") as string,
                });
              }}
            >
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaUser className="mr-2 inline" />
                  Passenger
                </label>
                <select
                  name="passengerId"
                  required
                  className="w-full rounded-lg border p-2"
                >
                  <option value="">Select passenger</option>
                  {passengers.map((passenger) => (
                    <option key={passenger.id} value={passenger.id}>
                      {passenger.fullName} ({passenger.email})
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaTags className="mr-2 inline" />
                  Subscription Type
                </label>
                <select
                  name="typeId"
                  required
                  className="w-full rounded-lg border p-2"
                >
                  <option value="">Select type</option>
                  {subscriptionTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name} - ${type.price} ({type.duration} days)
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaCalendarAlt className="mr-2 inline" />
                  Start Date
                </label>
                <input
                  name="startDate"
                  type="datetime-local"
                  required
                  className="w-full rounded-lg border p-2"
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaCalendarAlt className="mr-2 inline" />
                  End Date
                </label>
                <input
                  name="endDate"
                  type="datetime-local"
                  required
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
                  Add Subscription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Subscription Popup */}
      {showEditPopup && selectedSubscription && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-bold text-purple-800">
              Edit Subscription
            </h3>
            <form>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaUser className="mr-2 inline" />
                  Passenger
                </label>
                <select
                  className="w-full rounded-lg border p-2"
                  value={selectedSubscription.passenger.id}
                  onChange={(e) => {
                    const passenger = passengers.find(
                      (p) => p.id === Number(e.target.value)
                    );
                    if (passenger) {
                      setSelectedSubscription({
                        ...selectedSubscription,
                        passenger: passenger,
                      });
                    }
                  }}
                >
                  {passengers.map((passenger) => (
                    <option key={passenger.id} value={passenger.id}>
                      {passenger.fullName} ({passenger.email})
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaTags className="mr-2 inline" />
                  Subscription Type
                </label>
                <select
                  className="w-full rounded-lg border p-2"
                  value={selectedSubscription.type.id}
                  onChange={(e) => {
                    const type = subscriptionTypes.find(
                      (t) => t.id === Number(e.target.value)
                    );
                    if (type) {
                      setSelectedSubscription({
                        ...selectedSubscription,
                        type: type,
                      });
                    }
                  }}
                >
                  {subscriptionTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name} - ${type.price} ({type.duration} days)
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaCalendarAlt className="mr-2 inline" />
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  className="w-full rounded-lg border p-2"
                  value={selectedSubscription.startDate}
                  onChange={(e) =>
                    setSelectedSubscription({
                      ...selectedSubscription,
                      startDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaCalendarAlt className="mr-2 inline" />
                  End Date
                </label>
                <input
                  type="datetime-local"
                  className="w-full rounded-lg border p-2"
                  value={selectedSubscription.endDate}
                  onChange={(e) =>
                    setSelectedSubscription({
                      ...selectedSubscription,
                      endDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedSubscription.status}
                    onChange={(e) =>
                      setSelectedSubscription({
                        ...selectedSubscription,
                        status: e.target.checked,
                      })
                    }
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm font-medium">Active</span>
                </label>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="rounded bg-gray-200 px-4 py-2 shadow hover:bg-gray-300"
                  onClick={() => {
                    setShowEditPopup(false);
                    setSelectedSubscription(null);
                  }}
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

      {/* Empty State */}
      {filteredSubscriptions.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500">
          <FaTags className="mb-2 text-4xl" />
          <h3 className="mb-1 text-lg font-medium">No Subscriptions Found</h3>
          <p className="mb-4">
            {searchQuery
              ? "No subscriptions match your search criteria"
              : "Start by adding a new subscription"}
          </p>
          <button
            className="flex items-center gap-2 rounded bg-purple-500 px-4 py-2 text-white shadow hover:bg-purple-600"
            onClick={() => setShowAddPopup(true)}
          >
            <FaPlus /> Add New Subscription
          </button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionList;