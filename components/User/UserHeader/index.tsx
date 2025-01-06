"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaSignOutAlt, FaBell } from "react-icons/fa";
import axios from "axios";

interface Notification {
  id: number;
  senderId: number;
  receiverId: number;
  type: string;
  message: string;
  status: boolean;
  createdAt: string;
}

const UserHeader = ({ userId }: { userId: number }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch notifications for the user
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8086/api/v1/notifications/list/receiverId=${userId}`
        );
        setNotifications(response.data);
      } catch (err) {
        setError("Failed to fetch notifications. Please try again.");
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId]);

  const handleSignOut = () => {
    // Add sign-out logic here
    console.log("User signed out");
    router.push("/login");
  };

  // Format notification time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else {
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    }
  };

  return (
    <header
      className="fixed top-0 left-0 z-10 bg-white shadow-md"
      style={{ marginLeft: "240px", width: "calc(100% - 240px)" }}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* User Greeting */}
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-gray-700">Welcome, User!</h1>
        </div>

        {/* Current Date */}
        <div className="hidden text-gray-600 md:block">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          {/* Notification Icon */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen((prev) => !prev)}
              className="relative focus:outline-none"
            >
              <FaBell className="text-2xl text-gray-700" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
              )}
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-md bg-white shadow-lg">
                <div className="py-2 text-gray-700">
                  {loading ? (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      Loading notifications...
                    </div>
                  ) : notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="px-4 py-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                      >
                        <p className="text-sm font-medium">{notif.message}</p>
                        <p className="text-xs text-gray-500">
                          {formatTime(notif.createdAt)}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      No new notifications
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Avatar & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center focus:outline-none"
            >
              <img
                src="https://cdn0.iconfinder.com/data/icons/man-user-human-profile-avatar-business-person/100/09B-1User-512.png"
                alt="Avatar"
                className="w-7 h-7 rounded-full object-cover"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg">
                <ul className="py-2 text-gray-700">
                  <li
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      router.push("/user/profile");
                    }}
                  >
                    <FaUserCircle className="mr-3" />
                    Profile
                  </li>
                  <li
                    className="flex items-center px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                    onClick={handleSignOut}
                  >
                    <FaSignOutAlt className="mr-3" />
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;