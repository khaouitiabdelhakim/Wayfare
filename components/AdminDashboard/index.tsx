"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaUsers,
  FaBus,
  FaMap,
  FaTicketAlt,
  FaUser,
  FaCog,
  FaMoneyBill,
  FaBell,
  FaChartLine,
} from "react-icons/fa";
import { Bar, Line, Pie } from "react-chartjs-2";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState({
    users: 0,
    buses: 0,
    trips: 0,
    routes: 0,
    tickets: 0,
    payments: 0,
    subscriptions: 0,
    notifications: 0,
    activeSubscriptions: 0,
    completedTrips: 0,
    successfulPayments: 0,
    unreadNotifications: 0,
  });

  useEffect(() => {
    // Fetch data for the dashboard
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/dashboard");
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  // Data for charts
  const usersData = {
    labels: ["Users"],
    datasets: [
      {
        label: "Total Users",
        data: [dashboardData.users],
        backgroundColor: "#FFCE56",
      },
    ],
  };

  const busesData = {
    labels: ["Buses"],
    datasets: [
      {
        label: "Total Buses",
        data: [dashboardData.buses],
        backgroundColor: "#36A2EB",
      },
    ],
  };

  const tripsData = {
    labels: ["Completed Trips", "Upcoming Trips"],
    datasets: [
      {
        label: "Trips",
        data: [dashboardData.completedTrips, dashboardData.trips - dashboardData.completedTrips],
        backgroundColor: ["#FF6384", "#4BC0C0"],
      },
    ],
  };

  const paymentsData = {
    labels: ["Successful Payments", "Pending Payments"],
    datasets: [
      {
        label: "Payments",
        data: [dashboardData.successfulPayments, dashboardData.payments - dashboardData.successfulPayments],
        backgroundColor: ["#FF9F40", "#9966FF"],
      },
    ],
  };

  const subscriptionsData = {
    labels: ["Active Subscriptions", "Inactive Subscriptions"],
    datasets: [
      {
        label: "Subscriptions",
        data: [dashboardData.activeSubscriptions, dashboardData.subscriptions - dashboardData.activeSubscriptions],
        backgroundColor: ["#00CC99", "#FFCC99"],
      },
    ],
  };

  const notificationsData = {
    labels: ["Read Notifications", "Unread Notifications"],
    datasets: [
      {
        label: "Notifications",
        data: [dashboardData.notifications - dashboardData.unreadNotifications, dashboardData.unreadNotifications],
        backgroundColor: ["#C9CBCF", "#FF6384"],
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-orange-800">
        Admin Dashboard
      </h1>

      {/* Shortcuts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Link
          href="/admin/users"
          className="p-4 bg-white rounded-lg shadow hover:bg-gray-100 flex items-center"
        >
          <FaUsers className="text-2xl mr-4 text-orange-500" />
          <div>
            <h2 className="text-xl font-semibold">Users</h2>
            <p className="text-gray-600">{dashboardData.users} users</p>
          </div>
        </Link>
        <Link
          href="/admin/subscriptions"
          className="p-4 bg-white rounded-lg shadow hover:bg-gray-100 flex items-center"
        >
          <FaTicketAlt className="text-2xl mr-4 text-orange-500" />
          <div>
            <h2 className="text-xl font-semibold">Subscriptions</h2>
            <p className="text-gray-600">{dashboardData.subscriptions} subscriptions</p>
          </div>
        </Link>
        <Link
          href="/admin/buses"
          className="p-4 bg-white rounded-lg shadow hover:bg-gray-100 flex items-center"
        >
          <FaBus className="text-2xl mr-4 text-orange-500" />
          <div>
            <h2 className="text-xl font-semibold">Buses</h2>
            <p className="text-gray-600">{dashboardData.buses} buses</p>
          </div>
        </Link>
        <Link
          href="/admin/payments"
          className="p-4 bg-white rounded-lg shadow hover:bg-gray-100 flex items-center"
        >
          <FaMoneyBill className="text-2xl mr-4 text-orange-500" />
          <div>
            <h2 className="text-xl font-semibold">Payments</h2>
            <p className="text-gray-600">{dashboardData.payments} payments</p>
          </div>
        </Link>
        <Link
          href="/admin/notifications"
          className="p-4 bg-white rounded-lg shadow hover:bg-gray-100 flex items-center"
        >
          <FaBell className="text-2xl mr-4 text-orange-500" />
          <div>
            <h2 className="text-xl font-semibold">Notifications</h2>
            <p className="text-gray-600">{dashboardData.notifications} notifications</p>
          </div>
        </Link>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Users Graph */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Total Users</h3>
          <Bar
            data={usersData}
            options={{
              scales: {
                x: {
                  type: "category",
                },
                y: {
                  type: "linear",
                },
              },
            }}
            width={400}
            height={200}
          />
        </div>

        {/* Buses Graph */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Total Buses</h3>
          <Bar
            data={busesData}
            options={{
              scales: {
                x: {
                  type: "category",
                },
                y: {
                  type: "linear",
                },
              },
            }}
            width={400}
            height={200}
          />
        </div>

        {/* Trips Graph */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Trips Status</h3>
          <Pie
            data={tripsData}
            options={{
              responsive: true,
            }}
            width={400}
            height={200}
          />
        </div>

        {/* Payments Graph */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Payments Status</h3>
          <Pie
            data={paymentsData}
            options={{
              responsive: true,
            }}
            width={400}
            height={200}
          />
        </div>

        {/* Subscriptions Graph */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Subscriptions Status</h3>
          <Pie
            data={subscriptionsData}
            options={{
              responsive: true,
            }}
            width={400}
            height={200}
          />
        </div>

        {/* Notifications Graph */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Notifications Status</h3>
          <Pie
            data={notificationsData}
            options={{
              responsive: true,
            }}
            width={400}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;