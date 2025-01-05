"use client";

import { useState, useEffect } from "react";
import { FaTrash, FaBell } from "react-icons/fa";

interface Notification {
  id: number;
  senderId: number;
  receiverId: number;
  type: string;
  message: string;
  status: boolean;
}

const NotificationList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      "id": 1,
      "senderId": 1,
      "receiverId": 2,
      "type": "Info",
      "message": "Your booking is confirmed.",
      "status": false
    },
    {
      "id": 2,
      "senderId": 1,
      "receiverId": 3,
      "type": "Alert",
      "message": "Your payment is due.",
      "status": true
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all notifications for the admin (senderId = 1)
  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://localhost:8086/api/v1/notifications/list?senderId=1");
      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }
      const data = await response.json();
      setNotifications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a notification
  const handleDeleteNotification = async (notificationId: number) => {
    try {
      const response = await fetch(
        `http://localhost:8086/api/v1/notifications/delete/notificationId=${notificationId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete notification");
      }
      // Remove the deleted notification from the list
      setNotifications(notifications.filter((notification) => notification.id !== notificationId));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return <div>Loading notifications...</div>;
  }

  

  return (
    <div className="rounded-lg bg-gray-50 p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-orange-800">Notification List</h2>

      <ul className="mb-6 space-y-4">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className="flex items-center justify-between rounded-lg border border-orange-200 bg-white p-4 shadow"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FaBell className="text-orange-600" />
                <p className="font-semibold">Notification ID: {notification.id}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600">Sender ID: {notification.senderId}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600">Receiver ID: {notification.receiverId}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600">Type: {notification.type}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600">Message: {notification.message}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600">
                  Status: {notification.status ? "Read" : "Unread"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="flex items-center gap-2 rounded bg-red-500 px-4 py-2 text-white shadow hover:bg-red-600"
                onClick={() => handleDeleteNotification(notification.id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;