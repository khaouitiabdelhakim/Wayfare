"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Mail,
  MapPin,
  Calendar,
  Lock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@mui/material";

const host = "http://localhost:8080"; // API host for tickets
const paymentHost = "http://localhost:3400"; // API host for payments

const PaymentComponent = () => {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [reservedTrips, setReservedTrips] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const router = useRouter();

  // Fetch reserved trips from localStorage
  useEffect(() => {
    const fetchReservedTrips = async () => {
      const savedTrips = JSON.parse(localStorage.getItem("reservedTrips") || "[]");
      if (!savedTrips.length) return;

      try {
        // Fetch trip details for the reserved trip IDs
        const response = await axios.get(`${host}/api/trips`, {
          params: { ids: savedTrips.join(",") },
        });
        setReservedTrips(response.data);

        // Calculate total amount
        const total = response.data.reduce((sum: number, trip: any) => sum + trip.price, 0);
        setTotalAmount(total);
      } catch (err) {
        setError("Failed to fetch reserved trips. Please try again.");
        console.error("Error fetching reserved trips:", err);
      }
    };

    fetchReservedTrips();
  }, []);

  // Handle payment submission
  const handlePayment = async () => {
    if (!email || !address || !cardNumber || !expiryDate || !cvc) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      for (const trip of reservedTrips) {
        // Step 1: Create a ticket for the trip
        const ticketResponse = await axios.post(`${host}/api/ticket`, {
          passengerId: 101, // Replace with actual passenger ID
          trip: { id: trip.id },
          seatNumber: trip.seatNumber || 15, // Use trip-specific seat number if available
          status: true,
        });

        const ticketId = ticketResponse.data.id; // Get the created ticket ID

        // Step 2: Create a payment for the ticket
        const paymentData = {
          amount: trip.price, // Use the trip's price
          ticketId, // Include the ticket ID
          date: new Date().toISOString(),
          status: "completed",
          cardInfo: { cardNumber, expiryDate, cvc },
        };

        const paymentResponse = await axios.post(
          `${paymentHost}/api/v1/payment`,
          paymentData,
        );

        if (paymentResponse.data.status !== "completed") {
          throw new Error("Payment failed for trip ID: " + trip.id);
        }
      }

      setSuccess("Paiement réussi!");
      localStorage.removeItem("reservedTrips"); // Clear reserved trips after payment
      setTimeout(() => router.push("/main"), 3000); // Redirect to home page after 3 seconds
    } catch (error) {
      setError("Échec du paiement. Veuillez réessayer.");
      console.error("Error during payment or ticket creation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto my-8 max-w-2xl bg-white">
      <CardHeader className="space-y-2 text-center text-2xl font-bold">
        <img
          src="/api/placeholder/150/60"
          alt="Company Logo"
          className="mx-auto"
        />
        Paiement Sécurisé
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="rounded-lg bg-blue-50 p-4">
          <p className="text-lg font-medium">Montant à payer:</p>
          <p className="text-3xl font-bold text-blue-600">
            {totalAmount.toFixed(2)} MAD
          </p>
        </div>

        {/* Display reserved trips */}
        {reservedTrips.map((trip) => (
          <div key={trip.id} className="space-y-2 rounded-lg bg-gray-50 p-4">
            <h3 className="flex items-center gap-2 font-semibold">
              <Calendar className="h-5 w-5 text-blue-500" />
              Informations sur le billet
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p>
                <span className="font-medium">De:</span>{" "}
                {trip.route.source.name}
              </p>
              <p>
                <span className="font-medium">À:</span>{" "}
                {trip.route.destination.name}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(trip.departureTime).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Heure:</span>{" "}
                {new Date(trip.departureTime).toLocaleTimeString()}
              </p>
              <p>
                <span className="font-medium">Prix:</span>{" "}
                {trip.price.toFixed(2)} MAD
              </p>
            </div>
          </div>
        ))}

        {/* Payment form */}
        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-200 p-2 pl-10"
              placeholder="exemple@domaine.com"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
            <label className="mb-1 block text-sm font-medium">Adresse</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-lg border border-gray-200 p-2 pl-10"
              placeholder="123 Rue Exemple, Casablanca"
            />
          </div>
        </div>

        <div className="space-y-4 border-t pt-4">
          <h3 className="flex items-center gap-2 font-semibold">
            <CreditCard className="h-5 w-5 text-blue-500" />
            Informations de carte
          </h3>

          <div className="relative">
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full rounded-lg border border-gray-200 p-2 pl-10"
              placeholder="**** **** **** ****"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Calendar className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full rounded-lg border border-gray-200 p-2 pl-10"
                placeholder="MM/AA"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                className="w-full rounded-lg border border-gray-200 p-2 pl-10"
                placeholder="CVC"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-center justify-center gap-2 text-red-500">
            <XCircle className="h-5 w-5" />
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-center justify-center gap-2 text-green-500">
            <CheckCircle className="h-5 w-5" />
            {success}
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition duration-200 hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? (
            <>Traitement...</>
          ) : (
            <>
              <Lock className="h-5 w-5" />
              Payer Maintenant
            </>
          )}
        </button>
      </CardContent>
    </Card>
  );
};

export default PaymentComponent;