'use client'

import { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaMapMarkerAlt,
  FaBuilding
} from "react-icons/fa";

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

const BusStopList = () => {
  const [busStops, setBusStops] = useState<BusStop[]>([
    new BusStop(1, "Central Station", "123 Main Street"),
    new BusStop(2, "Shopping Mall", "456 Market Avenue"),
  ]);

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedBusStop, setSelectedBusStop] = useState<BusStop | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Add new bus stop
  const handleAddBusStop = (busStop: Omit<BusStop, "id">) => {
    const newId = Math.max(...busStops.map(b => b.id)) + 1;
    setBusStops([...busStops, new BusStop(newId, busStop.name, busStop.location)]);
    setShowAddPopup(false);
  };

  // Edit existing bus stop
  const handleEditBusStop = (busStop: BusStop) => {
    setSelectedBusStop(busStop);
    setShowEditPopup(true);
  };

  // Delete bus stop
  const handleDeleteBusStop = (id: number) => {
    if (window.confirm("Are you sure you want to delete this bus stop?")) {
      setBusStops(busStops.filter((busStop) => busStop.id !== id));
    }
  };

  // Save edited bus stop
  const handleSaveEdit = () => {
    if (selectedBusStop) {
      setBusStops(busStops.map((busStop) => 
        (busStop.id === selectedBusStop.id ? selectedBusStop : busStop)
      ));
      setShowEditPopup(false);
      setSelectedBusStop(null);
    }
  };

  // Filter bus stops based on search
  const filteredBusStops = busStops.filter(busStop => 
    busStop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    busStop.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-lg bg-gray-50 p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-orange-800">Bus Stop Management</h2>
        <button
          className="flex items-center gap-2 rounded bg-orange-500 px-4 py-2 text-white shadow hover:bg-orange-600"
          onClick={() => setShowAddPopup(true)}
        >
          <FaPlus /> Add New Bus Stop
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by name or location..."
          className="w-full rounded-lg border p-2 pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Bus Stop List */}
      <ul className="mb-6 space-y-4">
        {filteredBusStops.map((busStop) => (
          <li
            key={busStop.id}
            className="flex items-center justify-between rounded-lg border border-orange-200 bg-white p-4 shadow"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <FaBuilding className="text-orange-600" />
                <p className="font-semibold">{busStop.name}</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <FaMapMarkerAlt className="text-gray-600" />
                <p className="text-sm text-gray-600">{busStop.location}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
                onClick={() => handleEditBusStop(busStop)}
              >
                <FaEdit /> Edit
              </button>
              <button
                className="flex items-center gap-2 rounded bg-red-500 px-4 py-2 text-white shadow hover:bg-red-600"
                onClick={() => handleDeleteBusStop(busStop.id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Add Bus Stop Popup */}
      {showAddPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-bold text-orange-800">Add New Bus Stop</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleAddBusStop({
                name: formData.get('name') as string,
                location: formData.get('location') as string,
              });
            }}>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaBuilding className="inline mr-2" />
                  Name
                </label>
                <input
                  name="name"
                  required
                  className="w-full rounded-lg border p-2"
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaMapMarkerAlt className="inline mr-2" />
                  Location
                </label>
                <input
                  name="location"
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
                  Add Bus Stop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Bus Stop Popup */}
      {showEditPopup && selectedBusStop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-bold text-orange-800">Edit Bus Stop</h3>
            <form>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaBuilding className="inline mr-2" />
                  Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border p-2"
                  value={selectedBusStop.name}
                  onChange={(e) =>
                    setSelectedBusStop({
                      ...selectedBusStop,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                  <FaMapMarkerAlt className="inline mr-2" />
                  Location
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border p-2"
                  value={selectedBusStop.location}
                  onChange={(e) =>
                    setSelectedBusStop({
                      ...selectedBusStop,
                      location: e.target.value,
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

export default BusStopList;