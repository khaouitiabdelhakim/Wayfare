"use client";

import { useState, useEffect } from "react";
import axios from "axios";
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
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSendNotificationPopup, setShowSendNotificationPopup] = useState(false);
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const [notificationType, setNotificationType] = useState<string>("");
  const [notificationMessage, setNotificationMessage] = useState<string>("");

  // Fetch all notifications for the admin (senderId = 1)
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8086/api/v1/notifications/list?senderId=1"
      );
      setNotifications(response.data);
    } catch (err) {
      setError("Failed to fetch notifications. Please try again.");
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a notification
  const handleDeleteNotification = async (notificationId: number) => {
    if (window.confirm("Are you sure you want to delete this notification?")) {
      try {
        await axios.delete(
          `http://localhost:8086/api/v1/notifications/delete/notificationId=${notificationId}`
        );
        // Remove the deleted notification from the list
        setNotifications(
          notifications.filter((notification) => notification.id !== notificationId)
        );
      } catch (err) {
        setError("Failed to delete notification. Please try again.");
        console.error("Error deleting notification:", err);
      }
    }
  };

  // Send a notification
  const handleSendNotification = async () => {
    if (!receiverId || !notificationType || !notificationMessage) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8086/api/v1/notifications/send", {
        receiverId,
        senderId: 1, // Admin senderId
        type: notificationType,
        message: notificationMessage,
      });
      // Add the new notification to the list
      setNotifications([...notifications, response.data]);
      setShowSendNotificationPopup(false);
      setReceiverId(null);
      setNotificationType("");
      setNotificationMessage("");
    } catch (err) {
      setError("Failed to send notification. Please try again.");
      console.error("Error sending notification:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return <div>Loading notifications...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="rounded-lg bg-gray-50 p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-orange-800">Notification List</h2>

      {/* Send Notification Button */}
      <button
        className="mb-4 flex items-center gap-2 rounded bg-green-500 px-4 py-2 text-white shadow hover:bg-green-600"
        onClick={() => setShowSendNotificationPopup(true)}
      >
        <FaBell /> Send Notification
      </button>

      {/* Notification List */}
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

      {/* Send Notification Popup */}
      {showSendNotificationPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-bold text-orange-800">Send Notification</h3>
            <form>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">Receiver ID</label>
                <input
                  type="number"
                  className="w-full rounded-lg border p-2"
                  value={receiverId || ""}
                  onChange={(e) => setReceiverId(Number(e.target.value))}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">Type</label>
                <input
                  type="text"
                  className="w-full rounded-lg border p-2"
                  value={notificationType}
                  onChange={(e) => setNotificationType(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">Message</label>
                <textarea
                  className="w-full rounded-lg border p-2"
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="rounded bg-gray-200 px-4 py-2 shadow hover:bg-gray-300"
                  onClick={() => setShowSendNotificationPopup(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded bg-green-500 px-4 py-2 text-white shadow hover:bg-green-600"
                  onClick={handleSendNotification}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationList;