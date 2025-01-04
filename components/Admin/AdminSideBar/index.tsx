import React from "react";

const AdminSidebar = () => {
  return (
    <>
      {/* Sidebar toggle button for smaller screens */}
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
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
        id="sidebar-multi-level-sidebar"
        className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
          <a
            href="https://flowbite.com/"
            className="mb-5 flex items-center ps-2.5"
          >
            <img
              src="/images/logo/logo-black.png"
              className="me-3 h-20 sm:h-7"
              alt="Flowbite Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Admin Panel
            </span>
          </a>
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="/admin"
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
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/users"
                className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="ms-3">Users</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/buses"
                className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M4 2h10v2H4V2ZM2 8v5h14V8H2ZM3 6h2v1H3V6ZM5 6h8v1H5V6ZM3 14h2v2H3v-2ZM5 14h8v2H5v-2ZM14 14h2v2h-2v-2ZM16 6h2v1h-2V6ZM0 8h2v5H0V8ZM2 16v2h16v-2H2Z" />
                </svg>
                <span className="ms-3">Buses</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/trips"
                className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M4 2h10v2H4V2ZM2 8v5h14V8H2ZM3 6h2v1H3V6ZM5 6h8v1H5V6ZM3 14h2v2H3v-2ZM5 14h8v2H5v-2ZM14 14h2v2h-2v-2ZM16 6h2v1h-2V6ZM0 8h2v5H0V8ZM2 16v2h16v-2H2Z" />
                </svg>
                <span className="ms-3">Trips</span>
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
            <br /><br />

            <div
              id="admin-alert"
              className="mt-6 rounded-lg bg-orange-100 p-4 dark:bg-green-900"
              role="alert"
            >
              <div className="mb-3 flex items-center">
                <span className="me-2 rounded bg-red-100 px-2.5 py-0.5 text-sm font-semibold text-red-800 dark:bg-red-200 dark:text-red-900">
                  Admin
                </span>
            
              </div>
              <p className="mb-3 text-sm text-green-800 dark:text-green-400">
                This section is dedicated to admin operations. Manage settings,
                view reports, and handle user requests from here.
              </p>
              <a
                className="text-sm font-medium text-green-800 underline hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                href="#"
              >
                Go to Admin Panel
              </a>
            </div>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
