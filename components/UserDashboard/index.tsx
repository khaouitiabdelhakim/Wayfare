"use client"; // If you are using React components

import Link from "next/link";

const UserDashboard = () => {
  const buses = [
    { id: 1, name: "Bus 1", booked: true, location: "34.0522, -118.2437" },
    { id: 2, name: "Bus 2", booked: false, location: null },
    { id: 3, name: "Bus 3", booked: true, location: "34.0522, -118.2437" },
  ];

  return (
    <section
      id="dashboard"
      className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
    >
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <h1 className="mb-6 text-center text-3xl font-bold">
            Dashboard Utilisateur
          </h1>
          <div className="flex justify-around">
            <Link href="/user/profile" className="mx-2 flex-1">
              <div className="rounded-lg bg-blue-500 p-4 text-center text-white shadow-lg">
                <h2 className="text-xl font-semibold">Mon Profil</h2>
                <p>Consulter et modifier mes informations</p>
              </div>
            </Link>
            <Link href="/user/bookings" className="mx-2 flex-1">
              <div className="rounded-lg bg-green-500 p-4 text-center text-white shadow-lg">
                <h2 className="text-xl font-semibold">Réservations</h2>
                <p>Voir mes réservations de bus</p>
              </div>
            </Link>
            <Link href="/user/support" className="mx-2 flex-1">
              <div className="bg-orange-500 rounded-lg p-4 text-center text-white shadow-lg">
                <h2 className="text-xl font-semibold">Support</h2>
                <p>Obtenir de l&apos;aide et des informations</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Section for bus list */}
        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-bold">Liste de mes Bus</h2>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Bus ID</th>
                <th className="border border-gray-300 p-2">Nom</th>
                <th className="border border-gray-300 p-2">Statut de réservation</th>
                <th className="border border-gray-300 p-2">Localisation</th>
              </tr>
            </thead>
            <tbody>
              {buses.map(bus => (
                <tr key={bus.id}>
                  <td className="border border-gray-300 p-2">{bus.id}</td>
                  <td className="border border-gray-300 p-2">{bus.name}</td>
                  <td className="border border-gray-300 p-2">{bus.booked ? "Réservé" : "Disponible"}</td>
                  <td className="border border-gray-300 p-2">
                    {bus.booked && bus.location ? (
                      <a href={`https://www.google.com/maps?q=${bus.location}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        Voir sur la carte
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
