"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Update current year when component mounts
    setCurrentYear(new Date().getFullYear());
  }, []); // Empty dependency array to ensure this effect runs only once when the component mounts

  return (
    <>
      <footer
        className="wow fadeInUp relative z-10 bg-white pt-16 dark:bg-gray-dark md:pt-20 lg:pt-24"
        data-wow-delay=".1s"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-5/12">
              <div className="mb-12 max-w-[360px] lg:mb-16">
                <Link href="/" className="mb-8 inline-block">
                  <Image
                    src="/images/logo/logo-black.png"
                    alt="logo"
                    className="dark:hidden"
                    width={200}
                    height={60}
                  />
                  <Image
                    src="/images/logo/logo-white.png"
                    alt="logo"
                    className="hidden dark:block"
                    width={200}
                    height={60}
                  />
                </Link>
                <p className="mb-9 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  Réservez votre voyage en toute simplicité et explorez de
                  nouveaux horizons avec Wayfare.
                </p>

                <br />
                <br />
                <div className="flex items-center">
                  <a
                    href=""
                    target="_blank"
                    rel="noreferrer"
                    aria-label="social-link"
                    className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <Image
                      src="/images/social/LinkedIN_black.svg"
                      alt="logo"
                      width={27}
                      height={27}
                      className="dark:hidden"
                    />
                    <Image
                      src="/images/social/LinkedIN_white.svg"
                      alt="logo"
                      width={27}
                      height={27}
                      className="hidden dark:block"
                    />
                  </a>

                  <a
                    href=""
                    target="_blank"
                    rel="noreferrer"
                    aria-label="social-link"
                    className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <Image
                      src="/images/social/Youtube_black.svg"
                      alt="logo"
                      width={27}
                      height={27}
                      className="dark:hidden"
                    />
                    <Image
                      src="/images/social/Youtube_white.svg"
                      alt="logo"
                      width={27}
                      height={27}
                      className="hidden dark:block"
                    />
                  </a>

                  <a
                    href=""
                    target="_blank"
                    rel="noreferrer"
                    aria-label="social-link"
                    className="mr-6 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                  >
                    <Image
                      src="/images/social/Google_black.svg"
                      alt="logo"
                      width={27}
                      height={27}
                      className="dark:hidden"
                    />
                    <Image
                      src="/images/social/Google_white.svg"
                      alt="logo"
                      width={27}
                      height={27}
                      className="hidden dark:block"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                  Liens Utiles
                </h2>
                <ul>
                  <li>
                    <a
                      href=""
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      À Propos
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Emplois
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Applications
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                  Conditions
                </h2>
                <ul>
                  <li>
                    <a
                      href=""
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      CGU
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Politique de Confidentialité
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Conditions d'Utilisation
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-3/12">
              <div className="mb-12 lg:mb-16">
                <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                  Solutions Wayfare
                </h2>
                <ul>
                  <li>
                    <a
                      href=""
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Contactez-nous
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Je Veux Une Application
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      À Propos de Nous
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>
          <div className="flex items-center justify-center py-8">
            <p
              className="text-center text-base text-body-color dark:text-white"
              style={{
                fontSize: "14px",
              }}
            >
              &copy; {currentYear} Wayfare. Tous droits réservés. Développé par{" "}
              <a href="" className="text-primary duration-300 hover:underline">
                Wayfare Team
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
