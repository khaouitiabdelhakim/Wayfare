"use client";
import { useEffect, useState } from "react";
import {
  push as dbPush,
  set,
} from "@firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "@firebase/storage";
import { storage } from "../../configs/firebase.config"; // Import Firebase storage
import { database } from "../../configs/firebase.config";
import { ref, get, update, remove, onValue, off } from "@firebase/database";
import { useSearchParams } from "next/navigation"; // Assuming you're using React Router


const Settings = () => {
  const [participationDetails, setParticipationDetails] = useState(null);
  const [isSavingSettings, setSavingSettings] = useState(false);
  const [isResetingData, setResetingData] = useState(false);

  const [formData, setFormData] = useState({
    upload_01: { start: "", end: "" },
    upload_02: { start: "", end: "" },
    upload_03: { start: "", end: "" },
    upload_04: { start: "", end: "" },
  });

  const resetData = async () => {
    try {
      setResetingData(true);
  
      // Delete data at 'fintech/2024/participations'
      const participationsRef = ref(database, 'fintech/2024/participations');
      await remove(participationsRef);
  
      // Delete data at 'fintech/2024/teams'
      const teamsRef = ref(database, 'fintech/2024/teams');
      await remove(teamsRef);
  
      // Delete all files in '/files' storage if it exists
      
      
  
      console.log('Data reset successful');
      setSuccesMessages('Data reset successful');
      setSuccess(true);
    } catch (error) {
      console.error('Error resetting data:', error.message);
      setSuccesMessages('Error resetting data');
      setSuccess(true);
    } finally {
      setResetingData(false);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Split the name to access nested properties
    const [uploadKey, field] = name.split(".");

    // Update the state immutably
    setFormData((prevState) => ({
      ...prevState,
      [uploadKey]: {
        ...prevState[uploadKey],
        [field]: value,
      },
    }));
  };

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccesMessages] = useState("");
  const [password, updatePassword] = useState("");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 5000); // Set timeout for 5 seconds

      return () => clearTimeout(timer); // Clear timeout on component unmount
    }
  }, [success]);

  useEffect(() => {
    const rulesRef = ref(database, `fintech/2024/uploadRules`);

    const fetchParticipationDetails = async () => {
      try {
        const snapshot = await get(rulesRef);
        if (snapshot.exists()) {
          setFormData(snapshot.val());
        } else {
          console.log("No rules available");
        }
      } catch (error) {
        console.error("Error fetching rules :", error.message);
      }
    };

    fetchParticipationDetails();

    return () => {
      // Cleanup function to remove the listener when component unmounts
      off(rulesRef);
    };
  }, [id]);

  const handleSubmit = async (e, formData) => {
    setSavingSettings(true);
    e.preventDefault();
    // setUploading(true);
    const uploadRulesRef = ref(database, "fintech/2024/uploadRules");

    const uploadRules = {
      upload_01: {
        start: formData.upload_01.start,
        end: formData.upload_01.end,
      },
      upload_02: {
        start: formData.upload_02.start,
        end: formData.upload_02.end,
      },
      upload_03: {
        start: formData.upload_03.start,
        end: formData.upload_03.end,
      },
      upload_04: {
        start: formData.upload_04.start,
        end: formData.upload_04.end,
      },
    };

    try {
      await update(uploadRulesRef, uploadRules); // Update isQualified to false in participations node
      console.log("Rules saved successfully!");
      setSuccesMessages("Rules saved successfully!");
      setSuccess(true); // Set success state to true
    } catch (error) {
      console.error("Error saving Rules!", error.message);
    } finally {
      setSavingSettings(false);
    }
  };

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      {success && (
        <div
          style={{
            position: "fixed",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 999,
          }}
          id="toast-default"
          className="flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400"
          role="alert"
        >
          <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
            <svg
              className="h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"
              />
            </svg>
            <span className="sr-only">Fire icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">{successMessage}</div>
        </div>
      )}
      <div className="container">
        <form onSubmit={(e) => handleSubmit(e, formData)}>
          <h3
            className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl"
            style={{ fontSize: "25px" }}
          >
            Rules for{" "}
            <span className="underline-offset-3 underline decoration-blue-400 decoration-4 dark:decoration-blue-600">
              Upload 01
            </span>
          </h3>

          <br />

          <div className="flex w-full items-center">
            <span className="mx-4 text-gray-500">From</span>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                <svg
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                name="upload_01.start"
                value={formData.upload_01.start}
                onChange={handleChange}
                type="text"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="date start"
              />
            </div>
            <span className="mx-4 text-gray-500">To</span>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                <svg
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                name="upload_01.end"
                value={formData.upload_01.end}
                onChange={handleChange}
                type="text"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="date end"
              />
            </div>
          </div>

          <br />
          <br />

          <h3
            className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl"
            style={{ fontSize: "25px" }}
          >
            Rules for{" "}
            <span className="underline-offset-3 underline decoration-blue-400 decoration-4 dark:decoration-blue-600">
              Upload 02
            </span>
          </h3>

          <br />

          <div className="flex w-full items-center">
            <span className="mx-4 text-gray-500">From</span>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                <svg
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                name="upload_02.start"
                value={formData.upload_02.start}
                onChange={handleChange}
                type="text"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="date start"
              />
            </div>
            <span className="mx-4 text-gray-500">To</span>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                <svg
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                name="upload_02.end"
                value={formData.upload_02.end}
                onChange={handleChange}
                type="text"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="date end"
              />
            </div>
          </div>

          <br />
          <br />

          <h3
            className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl"
            style={{ fontSize: "25px" }}
          >
            Rules for{" "}
            <span className="underline-offset-3 underline decoration-blue-400 decoration-4 dark:decoration-blue-600">
              Upload 02
            </span>
          </h3>

          <br />

          <div className="flex w-full items-center">
            <span className="mx-4 text-gray-500">From</span>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                <svg
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                name="upload_03.start"
                value={formData.upload_03.start}
                onChange={handleChange}
                type="text"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="date start"
              />
            </div>
            <span className="mx-4 text-gray-500">To</span>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                <svg
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                name="upload_03.end"
                value={formData.upload_03.end}
                onChange={handleChange}
                type="text"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="date end"
              />
            </div>
          </div>

          <br />
          <br />

          <h3
            className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl"
            style={{ fontSize: "25px" }}
          >
            Rules for{" "}
            <span className="underline-offset-3 underline decoration-blue-400 decoration-4 dark:decoration-blue-600">
              Upload 04
            </span>
          </h3>

          <br />

          <div className="flex w-full items-center">
            <span className="mx-4 text-gray-500">From</span>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                <svg
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                name="upload_04.start"
                value={formData.upload_04.start}
                onChange={handleChange}
                type="text"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="date start"
              />
            </div>
            <span className="mx-4 text-gray-500">To</span>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                <svg
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                name="upload_04.end"
                value={formData.upload_04.end}
                onChange={handleChange}
                type="text"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="date end"
              />
            </div>
          </div>

          <br />
          <br />
          <div className="mx-4 text-gray-500">
            <button
              type="submit"
              className="mb-2 me-2 flex  items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
              style={{
                paddingTop: "12px",
                paddingBottom: "12px",
                paddingLeft: "25px",
                paddingRight: "25px",
                marginTop: "0px",
              }}
            >
              {isSavingSettings && (
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
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
              Save Settings
            </button>
          </div>
        </form>

        <br />
        <br /><br />

        <div className="mb-4">
          <button
            type="button"
            className="mb-2 me-2 rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800"
            style={{
              paddingTop: "15px",
              paddingBottom: "15px",
              paddingLeft: "22px",
              paddingRight: "22px",
            }}
            onClick={resetData}
          >
            {isResetingData && (
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
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            )}
            Reset Data (be causious!)
          </button>
        </div>
      </div>
    </section>
  );
};

export default Settings;
