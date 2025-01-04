import React from "react";

const UserSidebar = () => {
  return (
    <>
      {/* Sidebar toggle button for smaller screens */}
      <button
        data-drawer-target="sidebar-user-sidebar"
        data-drawer-toggle="sidebar-user-sidebar"
        aria-controls="sidebar-user-sidebar"
        type="button"
        className="ms-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="h-6 w-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        id="sidebar-user-sidebar"
        className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
          <a
            href="/"
            className="mb-5 flex items-center ps-2.5"
          >
            <img
              src="/images/logo/logo-black.png"
              className="me-3 h-20 sm:h-7"
              alt="App Logo"
            />
            <span className="self-center text-black whitespace-nowrap text-xl font-semibold dark:text-white">
              User Panel
            </span>
          </a>
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="/user"
                className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Profile</span>
              </a>
            </li>
            <li>
              <a
                href="/user/reservations"
                className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M4 3h14v2H4V3ZM2 10h16v2H2v-2ZM3 7h2v1H3V7ZM5 7h12v1H5V7ZM3 14h2v2H3v-2ZM5 14h8v2H5v-2ZM14 14h2v2h-2v-2ZM16 7h2v1h-2V7ZM0 10h2v5H0V10ZM2 16v2h16v-2H2Z" />
                </svg>
                <span className="ms-3">Mes Reservations</span>
              </a>
            </li>
            <li>
              <a
                href="/user/subscriptions"
                className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M8 2H6v4h2V2ZM10 2h2v4h-2V2ZM8 6H4v2h4V6ZM4 12v2h8v-2H4ZM14 4v10h2V4h-2ZM12 0h4v2h-4V0Z" />
                </svg>
                <span className="ms-3">Mes Subscriptions</span>
              </a>
            </li>
            <li>
              <a
                href="/auth/sign-out"
                className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M8 2H6v4h2V2ZM10 2h2v4h-2V2ZM8 6H4v2h4V6ZM4 12v2h8v-2H4ZM14 4v10h2V4h-2ZM12 0h4v2h-4V0Z" />
                </svg>
                <span className="ms-3">Sign Out</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default UserSidebar;
