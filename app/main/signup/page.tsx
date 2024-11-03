"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const { push } = useRouter();
  const [isSigningUp, setSigningUp] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cin: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, cin, password } = formData;

    if (!firstName || !lastName || !email || !phone || !cin || !password) {
      setError("Tous les champs sont obligatoires.");
      setSigningUp(false);
      return;
    }

    setSigningUp(true);
    try {
      // Simuler un appel API pour la création de compte
      const user = await fakeApiSignUp(formData);
      console.log("Inscription réussie", user);
      push("/admin");
      setSigningUp(false);
    } catch (error) {
      setError("Une erreur s'est produite lors de l'inscription.");
      setSigningUp(false);
    }
  };

  const fakeApiSignUp = (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Logique fictive d'inscription
        if (data.email) {
          resolve(data);
        } else {
          reject(new Error("Échec de l'inscription"));
        }
      }, 1000);
    });
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[1000px] rounded bg-white px-6 py-10 shadow-three dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Créer un compte
                </h3>
                {error && <p className="text-center text-red-500">{error}</p>}
                <div className="mb-8 flex items-center justify-center">
                  <span className="hidden h-[1px] w-full max-w-[350px] bg-body-color/50 sm:block"></span>
                  <p className="w-full px-5 text-center text-base font-medium text-body-color">
                    Créer votre compte pour bénéficier de toutes les offres
                  </p>
                  <span className="hidden h-[1px] w-full max-w-[350px] bg-body-color/50 sm:block"></span>
                </div>
                <form onSubmit={handleSignUp}>
                  <div className="mb-4 flex">
                    <div className="w-1/2 pr-2">
                      <label
                        htmlFor="firstName"
                        className="mb-3 block text-sm text-dark dark:text-white"
                      >
                        Prénom
                      </label>
                      <input
                        value={formData.firstName}
                        onChange={handleChange}
                        type="text"
                        name="firstName"
                        placeholder="Entrez votre prénom"
                        className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                    <div className="w-1/2 pl-2">
                      <label
                        htmlFor="lastName"
                        className="mb-3 block text-sm text-dark dark:text-white"
                      >
                        Nom
                      </label>
                      <input
                        value={formData.lastName}
                        onChange={handleChange}
                        type="text"
                        name="lastName"
                        placeholder="Entrez votre nom"
                        className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>

                  <div className="mb-4 flex">
                    <div className="w-1/2 pr-2">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm text-dark dark:text-white"
                      >
                        Votre Email
                      </label>
                      <input
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        name="email"
                        placeholder="Entrez votre Email"
                        className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                    <div className="w-1/2 pl-2">
                      <label
                        htmlFor="phone"
                        className="mb-3 block text-sm text-dark dark:text-white"
                      >
                        Numéro de Téléphone
                      </label>
                      <input
                        value={formData.phone}
                        onChange={handleChange}
                        type="text"
                        name="phone"
                        placeholder="Entrez votre numéro de téléphone"
                        className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>

                  <div className="mb-4 flex">
                    <div className="w-1/2 pr-2">
                      <label
                        htmlFor="cin"
                        className="mb-3 block text-sm text-dark dark:text-white"
                      >
                        CIN (Carte Nationale)
                      </label>
                      <input
                        value={formData.cin}
                        onChange={handleChange}
                        type="text"
                        name="cin"
                        placeholder="Entrez votre CIN"
                        className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                    <div className="w-1/2 pl-2">
                      <label
                        htmlFor="password"
                        className="mb-3 block text-sm text-dark dark:text-white"
                      >
                        Votre Mot de Passe
                      </label>
                      <input
                        value={formData.password}
                        onChange={handleChange}
                        type="password"
                        name="password"
                        placeholder="Entrez votre Mot de Passe"
                        className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>

                  <br />
                  <div className="mb-6">
                    <button
                      type="submit"
                      className="mb-2 flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-orange-400 to-orange-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                      style={{
                        paddingTop: "16px",
                        paddingBottom: "16px",
                        paddingLeft: "25px",
                        paddingRight: "25px",
                      }}
                    >
                      {isSigningUp && (
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="me-3 inline h-4 w-4 animate-spin text-white"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M89.1465 50.5908C89.1465 73.4461 72.4486 89.5671 50 89.5671C27.5514 89.5671 10.8535 73.4461 10.8535 50.5908C10.8535 27.7354 27.5514 11.6144 50 11.6144C72.4486 11.6144 89.1465 27.7354 89.1465 50.5908Z"
                            fill="currentFill"
                          />
                        </svg>
                      )}
                      S'inscrire
                    </button>
                  </div>
                  <p className="text-center text-base text-body-color dark:text-body-color-dark">
                    Vous avez déjà un compte?{" "}
                    <Link href="/login" className="text-primary underline">
                      Connexion
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupPage;
