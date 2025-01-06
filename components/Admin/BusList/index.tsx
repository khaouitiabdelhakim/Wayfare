'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import { 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaBus, 
  FaHashtag, 
  FaUsers, 
  FaImage, 
  FaSearch,
  FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";

class Bus {
  id: number;
  plateNumber: string;
  capacity: number;
  imageUrl: string;
  status: boolean;

  constructor(id: number, plateNumber: string, capacity: number, imageUrl: string, status: boolean = true) {
    this.id = id;
    this.plateNumber = plateNumber;
    this.capacity = capacity;
    this.imageUrl = imageUrl;
    this.status = status;
  }
}

const BusList = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all buses on component mount
  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await axios.get("/api/v1/bus");
      setBuses(response.data);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  // Add new bus
  const handleAddBus = async (bus: Omit<Bus, "id">) => {
    try {
      const response = await axios.post("/api/v1/bus", bus);
      setBuses([...buses, response.data]);
      setShowAddPopup(false);
    } catch (error) {
      console.error("Error adding bus:", error);
    }
  };

  // Edit existing bus
  const handleEditBus = (bus: Bus) => {
    setSelectedBus(bus);
    setShowEditPopup(true);
  };

  // Delete bus
  const handleDeleteBus = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this bus?")) {
      try {
        await axios.delete(`/api/v1/bus/${id}`);
        setBuses(buses.filter((bus) => bus.id !== id));
      } catch (error) {
        console.error("Error deleting bus:", error);
      }
    }
  };

  // Save edited bus
  const handleSaveEdit = async () => {
    if (selectedBus) {
      try {
        const response = await axios.put(`/api/v1/bus/${selectedBus.id}`, selectedBus);
        setBuses(buses.map((bus) => (bus.id === selectedBus.id ? response.data : bus)));
        setShowEditPopup(false);
        setSelectedBus(null);
      } catch (error) {
        console.error("Error updating bus:", error);
      }
    }
  };

  // Filter buses based on search
  const filteredBuses = buses.filter(bus => 
    bus.plateNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-lg bg-gray-50 p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-orange-800">Bus Management</h2>
        <button
          className="flex items-center gap-2 rounded bg-orange-500 px-4 py-2 text-white shadow hover:bg-orange-600"
          onClick={() => setShowAddPopup(true)}
        >
          <FaPlus /> Add New Bus
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by plate number..."
          className="w-full rounded-lg border p-2 pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Bus List */}
      <ul className="mb-6 space-y-4">
        {filteredBuses.map((bus) => (
          <li
            key={bus.id}
            className="flex items-center justify-between rounded-lg border border-orange-200 bg-white p-4 shadow"
          >
            <div className="flex gap-4">
              <img
                src={bus.imageUrl}
                alt={`Bus ${bus.plateNumber}`}
                className="h-24 w-32 rounded-md object-cover"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2">
                  <FaHashtag className="text-orange-600" />
                  <p className="font-semibold">{bus.plateNumber}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers className="text-gray-600" />
                  <p className="text-sm text-gray-600">Capacity: {bus.capacity} seats</p>
                </div>
                <div className="flex items-center gap-2">
                  {bus.status ? 
                    <FaCheckCircle className="text-green-600" /> :
                    <FaTimesCircle className="text-red-600" />
                  }
                  <p className="text-sm text-gray-600">
                    Status: {bus.status ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
                onClick={() => handleEditBus(bus)}
              >
                <FaEdit /> Edit
              </button>
              <button
                className="flex items-center gap-2 rounded bg-red-500 px-4 py-2 text-white shadow hover:bg-red-600"
                onClick={() => handleDeleteBus(bus.id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Add Bus Popup */}
      {showAddPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-bold text-orange-800">Add New Bus</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleAddBus({
                plateNumber: formData.get('plateNumber') as string,
                capacity: Number(formData.get('capacity')),
                imageUrl: formData.get('imageUrl') as string,
                status: true
              });
            }}>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaHashtag className="inline mr-2" />
                  Plate Number
                </label>
                <input
                  name="plateNumber"
                  required
                  pattern="[A-Z0-9-]+"
                  className="w-full rounded-lg border p-2"
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaUsers className="inline mr-2" />
                  Capacity
                </label>
                <input
                  name="capacity"
                  type="number"
                  required
                  min="1"
                  className="w-full rounded-lg border p-2"
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaImage className="inline mr-2" />
                  Image URL
                </label>
                <input
                  name="imageUrl"
                  type="url"
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
                  className="rounded bg-orange-500 px-4 py-2 text-white shadow hover:bg-orange-600"
                >
                  Add Bus
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Bus Popup */}
      {showEditPopup && selectedBus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-bold text-orange-800">Edit Bus</h3>
            <form>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaHashtag className="inline mr-2" />
                  Plate Number
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border p-2"
                  value={selectedBus.plateNumber}
                  onChange={(e) =>
                    setSelectedBus({
                      ...selectedBus,
                      plateNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaUsers className="inline mr-2" />
                  Capacity
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border p-2"
                  value={selectedBus.capacity}
                  onChange={(e) =>
                    setSelectedBus({
                      ...selectedBus,
                      capacity: +e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaImage className="inline mr-2" />
                  Image URL
                </label>
                <input
                  type="url"
                  className="w-full rounded-lg border p-2"
                  value={selectedBus.imageUrl}
                  onChange={(e) =>
                    setSelectedBus({
                      ...selectedBus,
                      imageUrl: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedBus.status}
                    onChange={(e) =>
                      setSelectedBus({
                        ...selectedBus,
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
                  className="rounded bg-orange-500 px-4 py-2 text-white shadow hover:bg-orange-600"
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

export default BusList;