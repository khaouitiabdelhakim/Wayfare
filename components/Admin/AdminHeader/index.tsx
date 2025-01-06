"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, getAuth } from "@firebase/auth";
import { FaUserCircle, FaCog, FaSignOutAlt, FaBell } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";

const AdminHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const router = useRouter();

  const notifications = [
    { id: 1, text: "New user registered", time: "2 mins ago" },
    { id: 2, text: "Server backup completed", time: "15 mins ago" },
    { id: 3, text: "You have a new message", time: "1 hour ago" },
  ];

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        router.push("/login");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  return (
    <header
      className="fixed left-0 top-0 z-10 bg-white shadow-md"
      style={{ marginLeft: "240px", width: "calc(100% - 240px)" }}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Admin Brand */}
        <div className="flex items-center gap-3">
          <HiMenu className="cursor-pointer text-2xl text-gray-700 lg:hidden" />
          <h1 className="text-lg font-bold text-gray-700">Bonjour Admin</h1>
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
                <span className="absolute right-0 top-0 h-3 w-3 rounded-full bg-red-500"></span>
              )}
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-md bg-white shadow-lg">
                <div className="py-2 text-gray-700">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="cursor-pointer border-b border-gray-200 px-4 py-3 hover:bg-gray-100"
                      >
                        <p className="text-sm font-medium">{notif.text}</p>
                        <p className="text-xs text-gray-500">{notif.time}</p>
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
                className="h-7 w-7 rounded-full object-cover"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg">
                <ul className="py-2 text-gray-700">
                  <li
                    className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      router.push("/admin/profile");
                    }}
                  >
                    <FaUserCircle className="mr-3" />
                    Profile
                  </li>
                  <li className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100">
                    <FaCog className="mr-3" />
                    Settings
                  </li>
                  <li
                    className="flex cursor-pointer items-center px-4 py-2 text-red-500 hover:bg-gray-100"
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

export default AdminHeader;
