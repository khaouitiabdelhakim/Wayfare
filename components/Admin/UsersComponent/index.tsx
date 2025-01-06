"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaEdit,
  FaKey,
  FaTrash,
  FaBell,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUserShield,
  FaUserClock,
} from "react-icons/fa";

enum Role {
  ADMIN = "Admin",
  PASSENGER = "Passenger",
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  role: Role;
}

class NotificationType {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

class Notification {
  id: number;
  senderId: number;
  receiverId: number;
  type: NotificationType;
  message: string;
  status: boolean;

  constructor(
    id: number,
    senderId: number,
    receiverId: number,
    type: NotificationType,
    message: string,
    status: boolean
  ) {
    this.id = id;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.type = type;
    this.message = message;
    this.status = status;
  }
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/v1/passengers/");
      setUsers(response.data);
    } catch (error) {
      setError("Failed to fetch users. Please try again.");
      console.error("Error fetching users:", error);
    }
  };

  // Add new user
  const handleAddUser = async (userData: Omit<User, "id">) => {
    try {
      const response = await axios.post("/api/v1/passengers/register", userData);
      setUsers([...users, response.data]);
      setShowPopup(false);
    } catch (error) {
      setError("Failed to add user. Please try again.");
      console.error("Error adding user:", error);
    }
  };

  // Edit existing user
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowEditPopup(true);
  };

  // Save edited user
  const handleSaveEdit = async () => {
    if (selectedUser) {
      try {
        const response = await axios.put(
          `/api/v1/passengers/${selectedUser.id}`,
          selectedUser
        );
        setUsers(
          users.map((user) =>
            user.id === selectedUser.id ? response.data : user
          )
        );
        setShowEditPopup(false);
        setSelectedUser(null);
      } catch (error) {
        setError("Failed to update user. Please try again.");
        console.error("Error updating user:", error);
      }
    }
  };

  // Delete user
  const handleDeleteUser = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/api/v1/passengers/${id}`);
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        setError("Failed to delete user. Please try again.");
        console.error("Error deleting user:", error);
      }
    }
  };

  // Send notification
  const handleSendNotification = (user: User) => {
    setSelectedUser(user);
    setShowNotificationPopup(true);
  };

  const handleNotificationSend = () => {
    if (selectedUser && notificationMessage) {
      // Here you would typically send the notification to the backend
      const newNotification = new Notification(
        1, // id
        1, // senderId (admin)
        selectedUser.id, // receiverId
        new NotificationType(1, "Info"), // type
        notificationMessage, // message
        false // status
      );
      console.log("Notification sent:", newNotification);
      setShowNotificationPopup(false);
      setNotificationMessage("");
    }
  };

  // Filter users based on search
  const filteredUsers = users.filter(
    (user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-lg bg-gray-50 p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-orange-800">
        Liste des utilisateurs
      </h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Rechercher par nom, email, téléphone ou adresse"
        className="mb-6 w-full rounded-lg border p-2"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Error Message */}
      {error && <div className="mb-4 text-center text-red-500">{error}</div>}

      {/* Add User Button */}
      <button
        className="rounded bg-orange-500 px-4 py-2 text-white shadow hover:bg-orange-600"
        onClick={() => setShowPopup(true)}
      >
        Ajouter un utilisateur
      </button>
      <br />
      <br />

      {/* User List */}
      <ul className="mb-6 space-y-4">
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between rounded-lg border border-orange-200 bg-white p-4 shadow"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FaUser className="text-orange-600" />
                <p className="font-semibold">{`${user.firstName} ${user.lastName}`}</p>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-gray-500" />
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="text-gray-500" />
                <p className="text-sm text-gray-600">{user.phoneNumber}</p>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-500" />
                <p className="text-sm text-gray-600">{user.address}</p>
              </div>
              <div className="flex items-center gap-2">
                {user.role === Role.ADMIN ? (
                  <FaUserShield className={`text-blue-600`} />
                ) : (
                  <FaUserClock className={`text-green-600`} />
                )}
                <span
                  className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                    user.role === Role.ADMIN
                      ? "bg-blue-100 text-blue-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {user.role}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
                onClick={() => handleDeleteUser(user.id)}
              >
                <FaTrash /> Delete
              </button>
              <button
                className="flex items-center gap-2 rounded bg-orange-500 px-4 py-2 text-white shadow hover:bg-orange-600"
                onClick={() => handleEditUser(user)}
              >
                <FaEdit /> Modifier
              </button>
              <button
                className="flex items-center gap-2 rounded bg-red-500 px-4 py-2 text-white shadow hover:bg-red-600"
                onClick={() =>
                  alert(`Réinitialiser le mot de passe pour ${user.email}`)
                }
              >
                <FaKey /> Réinitialiser le mot de passe
              </button>
              <button
                className="flex items-center gap-2 rounded bg-green-500 px-4 py-2 text-white shadow hover:bg-green-600"
                onClick={() => handleSendNotification(user)}
              >
                <FaBell /> Send Notification
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Add User Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-bold text-orange-800">
              Ajouter un utilisateur
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleAddUser({
                  firstName: formData.get("firstName") as string,
                  lastName: formData.get("lastName") as string,
                  email: formData.get("email") as string,
                  phoneNumber: formData.get("phoneNumber") as string,
                  address: formData.get("address") as string,
                  role: formData.get("role") as Role,
                });
              }}
            >
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">Prénom</label>
                <input
                  name="firstName"
                  type="text"
                  className="w-full rounded-lg border p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">Nom</label>
                <input
                  name="lastName"
                  type="text"
                  className="w-full rounded-lg border p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input
                  name="email"
                  type="email"
                  className="w-full rounded-lg border p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  Téléphone
                </label>
                <input
                  name="phoneNumber"
                  type="tel"
                  className="w-full rounded-lg border p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  Adresse
                </label>
                <input
                  name="address"
                  type="text"
                  className="w-full rounded-lg border p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">Role</label>
                <select
                  name="role"
                  className="w-full rounded-lg border p-2"
                  required
                >
                  <option value={Role.ADMIN}>Admin</option>
                  <option value={Role.PASSENGER}>Passenger</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="rounded bg-gray-200 px-4 py-2 shadow hover:bg-gray-300"
                  onClick={() => setShowPopup(false)}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded bg-orange-500 px-4 py-2 text-white shadow hover:bg-orange-600"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Popup */}
      {showEditPopup && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-bold text-orange-800">
              Modifier un utilisateur
            </h3>
            <form>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">Prénom</label>
                <input
                  type="text"
                  className="w-full rounded-lg border p-2"
                  value={selectedUser.firstName}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">Nom</label>
                <input
                  type="text"
                  className="w-full rounded-lg border p-2"
                  value={selectedUser.lastName}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full rounded-lg border p-2"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  Téléphone
                </label>
                <input
                  type="tel"
                  className="w-full rounded-lg border p-2"
                  value={selectedUser.phoneNumber}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      phoneNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  Adresse
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border p-2"
                  value={selectedUser.address}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      address: e.target.value,
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
                  Annuler
                </button>
                <button
                  type="button"
                  className="rounded bg-orange-500 px-4 py-2 text-white shadow hover:bg-orange-600"
                  onClick={handleSaveEdit}
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notification Popup */}
      {showNotificationPopup && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-bold text-orange-800">
              Envoyer une notification à {selectedUser.firstName} {selectedUser.lastName}
            </h3>
            <form>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">Message</label>
                <textarea
                  className="w-full rounded-lg border p-2"
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="rounded bg-gray-200 px-4 py-2 shadow hover:bg-gray-300"
                  onClick={() => setShowNotificationPopup(false)}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="rounded bg-green-500 px-4 py-2 text-white shadow hover:bg-green-600"
                  onClick={handleNotificationSend}
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;