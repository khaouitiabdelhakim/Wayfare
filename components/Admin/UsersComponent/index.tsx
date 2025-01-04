"use client";

import { useState } from "react";
import { FaEdit, FaKey, FaTrash } from "react-icons/fa";

enum Role {
  ADMIN = "Admin",
  USER = "User",
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      role: Role.ADMIN,
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      role: Role.USER,
    },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowEditPopup(true);
  };

  const handleSaveEdit = () => {
    if (selectedUser) {
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? selectedUser : user,
        ),
      );
      setShowEditPopup(false);
      setSelectedUser(null);
    }
  };

  return (
    <div className="rounded-lg bg-gray-50 p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-orange-800">
        Liste des utilisateurs
      </h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Rechercher par nom ou email"
        className="mb-6 w-full rounded-lg border p-2"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

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
            <div>
              <p className="font-semibold">{`${user.firstName} ${user.lastName}`}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
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
            <div className="flex gap-2">
              <button
                className="flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
                onClick={() => alert("Delete user")}
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
            {/* Add User Form */}
            <form>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">Prénom</label>
                <input type="text" className="w-full rounded-lg border p-2" />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">Nom</label>
                <input type="text" className="w-full rounded-lg border p-2" />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input type="email" className="w-full rounded-lg border p-2" />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">Role</label>
                <select className="w-full rounded-lg border p-2">
                  <option value={Role.ADMIN}>Admin</option>
                  <option value={Role.USER}>User</option>
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
                  type="button"
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
    </div>
  );
};

export default UserList;
