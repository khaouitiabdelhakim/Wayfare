"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SigninPage = () => {
  const { push } = useRouter();
  const [isSignIn, setSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (email.length === 0 || password.length === 0) {
      setError("L'email et le mot de passe sont obligatoires.");
      setSignIn(false);
      return;
    }

    setSignIn(true);
    try {
      // Simuler un appel API pour la connexion
      const user = await fakeApiSignIn(email, password);
      console.log("Connexion réussie", user);
      push("/admin");
      setSignIn(false);
    } catch (error) {
      setError("Email ou mot de passe invalide.");
      setSignIn(false);
    }
  };

  const fakeApiSignIn = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "test@example.com" && password === "password") {
          resolve({ email });
        } else {
          reject(new Error("Identifiants invalides"));
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
                  Connexion à votre compte
                </h3>
                {error && <p className="text-center text-red-500">{error}</p>}
                <div className="mb-8 flex items-center justify-center">
                  <span className="hidden h-[1px] w-full max-w-[350px] bg-body-color/50 sm:block"></span>
                  <p className="w-full px-5 text-center text-base font-medium text-body-color">
                    Connectez-vous a votre compte pour gérer vos lignes
                  </p>
                  <span className="hidden h-[1px] w-full max-w-[350px] bg-body-color/50 sm:block"></span>
                </div>
                <form onSubmit={handleSignIn}>
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Votre Email
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      name="email"
                      placeholder="Entrez votre Email"
                      className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Votre Mot de Passe
                    </label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="password"
                      placeholder="Entrez votre Mot de Passe"
                      className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
                    <div className="mb-4 sm:mb-0">
                      <label
                        htmlFor="checkboxLabel"
                        className="flex cursor-pointer select-none items-center text-sm font-medium text-body-color"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="checkboxLabel"
                            className="sr-only"
                          />
                          <div className="box mr-4 flex h-5 w-5 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
                            <span className="opacity-0">
                              <svg
                                width="11"
                                height="8"
                                viewBox="0 0 11 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                  fill="#3056D3"
                                  stroke="#3056D3"
                                  strokeWidth="0.4"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                        Rester connecté
                      </label>
                    </div>
                    <div>
                      <Link
                        href="#0"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Mot de passe oublié ?
                      </Link>
                    </div>
                  </div>
                  <br />
                  <div className="mb-6">
                    <button
                      type="submit"
                      className="mb-2 me-2 flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-orange-400 to-orange-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                      style={{
                        paddingTop: "16px",
                        paddingBottom: "16px",
                        paddingLeft: "25px",
                        paddingRight: "25px",
                      }}
                    >
                      {isSignIn && (
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
                            d="M93.9679 50.5908C93.9679 73.1895 75.4024 91.5094 50.0005 91.5094C48.8839 91.5094 47.7852 91.4281 46.7139 91.2694C47.8356 90.2193 48.6722 88.8971 49.1407 87.4243C49.6092 85.9514 49.6889 84.3291 49.3681 82.8464C49.0474 81.3637 48.2953 80.0553 47.2412 79.1768C45.7887 77.8278 43.6687 77.8783 42.0841 79.4375C40.6751 80.8946 40.9201 83.3145 41.7181 85.0557C42.5161 86.7968 43.8977 87.9257 45.5657 88.4746C47.2205 89.0217 48.9692 89.0558 50.4411 89.0841C76.8634 89.0841 91.4973 75.6395 93.9679 50.5908Z"
                            fill="currentFill"
                          />
                        </svg>
                      )}
                      {isSignIn ? "Connexion..." : "Se connecter"}
                    </button>
                  </div>
                  <p className="text-center text-base font-medium text-body-color">
                    Pas de compte ?{" "}
                    <Link
                      href="/main/signup"
                      className="text-primary hover:underline"
                    >
                      Inscrivez-vous
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

export default SigninPage;
