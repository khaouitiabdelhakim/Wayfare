import React from "react";
import LoyaltyRoundedIcon from "@mui/icons-material/LoyaltyRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";

const UserSidebar = () => {
  return (
    <aside
      id="sidebar-user"
      className="fixed left-0 top-0 z-40 h-screen w-64 transition-transform sm:translate-x-0 bg-white shadow-md"
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-white px-3 py-4">
        {/* Logo */}
        <a href="/" className="mb-5 flex items-center ps-2.5">
          <img
            src="/images/logo/logo-black.png"
            className="me-3 h-20 sm:h-7"
            alt="Logo"
          />
          <span className="self-center text-black whitespace-nowrap text-xl font-semibold">
            User Panel
          </span>
        </a>

        {/* Menu Items */}
        <ul className="space-y-2 font-medium">
          {/* Reservations */}
          <li>
            <a
              href="/user/tickets"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100"
            >
              <EventNoteRoundedIcon />
              <span className="ms-3">Tickets</span>
            </a>
          </li>

          {/* Subscriptions */}
          <li>
            <a
              href="/user/subscriptions"
              className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100"
            >
              <LoyaltyRoundedIcon />
              <span className="ms-3">Subscriptions</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default UserSidebar;
