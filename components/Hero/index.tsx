import Image from "next/image";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
    >
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-1/2">
              <div
                className="wow fadeInUp mx-auto max-w-[800px]"
                data-wow-delay=".2s"
              >
                {/* Main Title */}
                <h1 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                  Voyagez en toute{" "}
                  <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                    simplicité
                  </span>{" "}
                  avec Wayfare
                </h1>

                {/* Subtitle */}
                <p className="mb-8 text-lg font-medium text-gray-700 dark:text-gray-200 sm:text-xl">
                  Réservez votre billet en quelques clics et partez à la
                  découverte de nouveaux horizons.
                </p>

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
              </div>
            </div>

            {/* Image Section */}
            <div className="w-full px-4 lg:w-1/2">
              <div
                className="wow fadeInUp relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0"
                data-wow-delay=".2s"
              >
                <Image
                  src="/images/bus.png"
                  alt="about-image"
                  height={1000}
                  width={1000}
                  className="mx-auto max-w-full drop-shadow-three  lg:mr-0"
                  style={{ borderRadius: "10px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
