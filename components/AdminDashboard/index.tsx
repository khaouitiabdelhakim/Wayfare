"use client"; // If you are using React components

import Link from "next/link";

const AdminDashboard = () => {
  return (
    <section
      id="dashboard"
      className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
    >
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <h1 className="mb-6 text-center text-3xl font-bold">
            Dashboard Administrateur
          </h1>
          <div className="flex justify-around">
            <Link href="/admin/users" className="mx-2 flex-1">
              <div className="rounded-lg bg-blue-500 p-4 text-center text-white shadow-lg">
                <h2 className="text-xl font-semibold">Utilisateurs</h2>
                <p>Gérer les utilisateurs</p>
              </div>
            </Link>
            <Link href="/admin/bus" className="mx-2 flex-1">
              <div className="rounded-lg bg-green-500 p-4 text-center text-white shadow-lg">
                <h2 className="text-xl font-semibold">Bus</h2>
                <p>Gérer l&apos;ensemble des bus</p>
              </div>
            </Link>
            <Link href="/admin/lines" className="mx-2 flex-1">
              <div className="bg-orange-500 rounded-lg p-4 text-center text-white shadow-lg">
                <h2 className="text-xl font-semibold">Lignes</h2>
                <p>Gérer l&apos;ensemble des lignes</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
