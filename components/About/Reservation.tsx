import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const Reservation = () => {
  return (
    <section id="about" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full">
              {/* Call-to-action Buttons */}
              <div className="mb-8 flex space-x-4">
                <a
                  href="#"
                  className="rounded-lg bg-gradient-to-r from-orange-400 to-orange-600 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:from-orange-500 hover:to-orange-700"
                >
                  Réservez Maintenant
                </a>
                <a
                  href="#"
                  className="rounded-lg bg-gradient-to-r from-gray-700 to-black px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:from-gray-800 hover:to-black"
                >
                  Explorer les Destinations
                </a>
              </div>

              {/* Search Bar */}
              <div className="mb-8 rounded-lg bg-white p-4 shadow-lg">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <input
                    type="text"
                    placeholder="Lieu de départ"
                    className="rounded-lg border border-gray-300 p-3"
                  />
                  <input
                    type="text"
                    placeholder="Destination"
                    className="rounded-lg border border-gray-300 p-3"
                  />
                  <input
                    type="date"
                    placeholder="Date de départ"
                    className="rounded-lg border border-gray-300 p-3"
                  />
                  <input
                    type="number"
                    placeholder="Nombre de passagers"
                    className="rounded-lg border border-gray-300 p-3"
                  />
                </div>
                <button className="mt-4 w-full rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:from-orange-600 hover:to-orange-800">
                  Rechercher
                </button>
              </div>

              {/* Additional Advantages */}
              <div className="text-gray-600 dark:text-gray-300">
                <ul className="list-disc space-y-2 pl-5">
                  <li>Des trajets sécurisés et confortables.</li>
                  <li>Service client disponible 24/7.</li>
                  <li>Accédez aux meilleures offres et promotions.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
