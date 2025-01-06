"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaCamera,
  FaCheck,
  FaTimes,
  FaSpinner,
} from "react-icons/fa";

enum Role {
  ADMIN = "ADMIN",
  PASSENGER = "PASSENGER",
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

interface Passenger extends User {
  phone: string;
  address: string;
  profilePicture: string | null;
}

const Profile = ({ userId }: { userId: number }) => {
  const [profile, setProfile] = useState<Passenger | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Passenger | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/v1/passengers/${userId}`);
        setProfile(response.data);
        setEditedProfile(response.data);
      } catch (err) {
        setError("Failed to fetch profile. Please try again.");
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [userId]);

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && editedProfile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditedProfile({
          ...editedProfile,
          profilePicture: e.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Form validation
  const validateForm = () => {
    if (!editedProfile) return "Profile data is missing.";
    if (!editedProfile.firstName.trim()) return "First name is required";
    if (!editedProfile.lastName.trim()) return "Last name is required";
    if (!editedProfile.email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(editedProfile.email)) return "Invalid email format";
    if (!editedProfile.phone.trim()) return "Phone number is required";
    if (!editedProfile.address.trim()) return "Address is required";
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedProfile) return;

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Update profile on the backend
      const response = await axios.put(
        `/api/v1/passengers/${userId}`,
        editedProfile
      );
      setProfile(response.data);
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      console.error("Error updating profile:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    if (profile) {
      setEditedProfile(profile);
      setIsEditing(false);
      setError(null);
    }
  };

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 rounded bg-purple-500 px-4 py-2 text-white transition hover:bg-purple-600"
          >
            <FaEdit /> Edit Profile
          </button>
        )}
      </div>

      <div className="mb-8 flex flex-col items-center">
        <div className="relative">
          <div className="mb-4 h-32 w-32 overflow-hidden rounded-full">
            {editedProfile?.profilePicture ? (
              <img
                src={editedProfile.profilePicture}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <FaUser className="text-4xl text-gray-400" />
              </div>
            )}
          </div>
          {isEditing && (
            <>
              <button
                onClick={triggerFileInput}
                className="absolute bottom-0 right-0 rounded-full bg-purple-500 p-2 text-white shadow-lg transition hover:bg-purple-600"
              >
                <FaCamera />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </>
          )}
        </div>
        <h2 className="mt-4 text-xl font-semibold">
          {profile.firstName} {profile.lastName}
        </h2>
        <span className="text-sm text-gray-500">{profile.role}</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* First Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              value={editedProfile?.firstName || ""}
              onChange={(e) =>
                editedProfile &&
                setEditedProfile({ ...editedProfile, firstName: e.target.value })
              }
              disabled={!isEditing}
              className="w-full rounded-lg border p-2 focus:border-purple-500 focus:outline-none disabled:bg-gray-100"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              value={editedProfile?.lastName || ""}
              onChange={(e) =>
                editedProfile &&
                setEditedProfile({ ...editedProfile, lastName: e.target.value })
              }
              disabled={!isEditing}
              className="w-full rounded-lg border p-2 focus:border-purple-500 focus:outline-none disabled:bg-gray-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-gray-400" />
              <input
                type="email"
                value={editedProfile?.email || ""}
                onChange={(e) =>
                  editedProfile &&
                  setEditedProfile({ ...editedProfile, email: e.target.value })
                }
                disabled={!isEditing}
                className="w-full rounded-lg border p-2 focus:border-purple-500 focus:outline-none disabled:bg-gray-100"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Phone
            </label>
            <div className="flex items-center">
              <FaPhone className="mr-2 text-gray-400" />
              <input
                type="tel"
                value={editedProfile?.phone || ""}
                onChange={(e) =>
                  editedProfile &&
                  setEditedProfile({ ...editedProfile, phone: e.target.value })
                }
                disabled={!isEditing}
                className="w-full rounded-lg border p-2 focus:border-purple-500 focus:outline-none disabled:bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Address
          </label>
          <div className="flex items-start">
            <FaMapMarkerAlt className="mr-2 mt-3 text-gray-400" />
            <textarea
              value={editedProfile?.address || ""}
              onChange={(e) =>
                editedProfile &&
                setEditedProfile({ ...editedProfile, address: e.target.value })
              }
              disabled={!isEditing}
              rows={3}
              className="w-full rounded-lg border p-2 focus:border-purple-500 focus:outline-none disabled:bg-gray-100"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-red-500">
            <FaTimes className="mr-2 inline" />
            {error}
          </div>
        )}

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-2 rounded bg-gray-200 px-6 py-2 transition hover:bg-gray-300"
              disabled={isLoading}
            >
              <FaTimes /> Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded bg-purple-500 px-6 py-2 text-white transition hover:bg-purple-600 disabled:bg-purple-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" /> Updating...
                </>
              ) : (
                <>
                  <FaCheck /> Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;