"use client";

import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

// Bus class
class Bus {
  id: number;
  plateNumber: string;
  capacity: number;
  imageUrl: string;

  constructor(id: number, plateNumber: string, capacity: number, imageUrl: string) {
    this.id = id;
    this.plateNumber = plateNumber;
    this.capacity = capacity;
    this.imageUrl = imageUrl;
  }
}

const BusList = () => {
  const [buses, setBuses] = useState<Bus[]>([
    new Bus(1, "ABC-123", 50, "https://assets.volvo.com/is/image/VolvoInformationTechnologyAB/1860x1050-volvo-9700-CGI1?size=1280,720&scl=1"),
    new Bus(2, "XYZ-456", 60, "https://assets.volvo.com/is/image/VolvoInformationTechnologyAB/1860x1050-Volvo-9700DD-front45?size=1280,720&scl=1"),
  ]);

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);

  const handleEditBus = (bus: Bus) => {
    setSelectedBus(bus);
    setShowEditPopup(true);
  };

  const handleDeleteBus = (id: number) => {
    setBuses(buses.filter((bus) => bus.id !== id));
  };

  const handleSaveEdit = () => {
    if (selectedBus) {
      setBuses(
        buses.map((bus) => (bus.id === selectedBus.id ? selectedBus : bus))
      );
      setShowEditPopup(false);
      setSelectedBus(null);
    }
  };

  return (
    <div className="rounded-lg bg-gray-50 p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-orange-800">Liste des Bus</h2>

      {/* Bus List */}
      <ul className="mb-6 space-y-4">
        {buses.map((bus) => (
          <li
            key={bus.id}
            className="flex items-center justify-between rounded-lg border border-orange-200 bg-white p-4 shadow"
          >
            <div className="flex gap-4">
              <img
                src={bus.imageUrl}
                alt={`Bus ${bus.plateNumber}`}
                className="h-16 rounded-md"
              />
              <div>
                <p className="font-semibold">{`Plate Number: ${bus.plateNumber}`}</p>
                <p className="text-sm text-gray-600">{`Capacity: ${bus.capacity}`}</p>
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

      {/* Edit Bus Popup */}
      {showEditPopup && selectedBus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-bold text-orange-800">Modifier un Bus</h3>
            <form>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">Plate Number</label>
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
                <label className="mb-1 block text-sm font-medium">Capacity</label>
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
                  Save
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
