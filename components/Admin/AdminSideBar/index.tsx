import React from "react";
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import DirectionsBusFilledRoundedIcon from '@mui/icons-material/DirectionsBusFilledRounded';
import AirlineStopsRoundedIcon from '@mui/icons-material/AirlineStopsRounded';
import RouteRoundedIcon from '@mui/icons-material/RouteRounded';
import LoyaltyRoundedIcon from '@mui/icons-material/LoyaltyRounded';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';

const AdminSidebar = () => {
  return (
    <>
      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0 bg-white shadow-md"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-white px-3 py-4 dark:bg-gray-800">
          <a href="/" className="mb-5 flex items-center ps-2.5">
            <img
              src="/images/logo/logo-black.png"
              className="me-3 h-20 sm:h-7"
              alt="Flowbite Logo"
            />
            <span className="self-center text-black whitespace-nowrap text-xl font-semibold dark:text-white">
              Admin Panel
            </span>
          </a>
          
          <ul className="space-y-2 font-medium">
            {/* Dashboard - Standalone */}
            <li>
              <a
                href="/admin"
                className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <SpaceDashboardRoundedIcon />
                <span className="ms-3">Dashboard</span>
              </a>
            </li>

            {/* User Management Group */}
            <li className="pt-4">
              <div className="text-xs font-semibold uppercase text-gray-500 px-2 mb-2">
                User Management
              </div>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/admin/users"
                    className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <PeopleAltRoundedIcon />
                    <span className="ms-3">Users</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/admin/subscriptions"
                    className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <LoyaltyRoundedIcon />
                    <span className="ms-3">Subscriptions</span>
                  </a>
                </li>
              </ul>
            </li>

            {/* Transport Management Group */}
            <li className="pt-4">
              <div className="text-xs font-semibold uppercase text-gray-500 px-2 mb-2">
                Transport Management
              </div>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/admin/buses"
                    className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <DirectionsBusFilledRoundedIcon />
                    <span className="ms-3">Buses</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/admin/bus-stops"
                    className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <RoomRoundedIcon />
                    <span className="ms-3">Bus Stops</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/admin/routes"
                    className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <RouteRoundedIcon />
                    <span className="ms-3">Routes</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/admin/trips"
                    className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <AirlineStopsRoundedIcon />
                    <span className="ms-3">Trips</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;