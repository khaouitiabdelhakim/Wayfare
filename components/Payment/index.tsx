'use client'

import React, { useState } from "react";
import axios from "axios";
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

const PaymentComponent = () => {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [ticketId, setTicketId] = useState("ticket123"); // Example ticketId, replace with actual ticketId

  const handlePayment = async () => {
    if (!email || !address || !cardNumber || !expiryDate || !cvc) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    const paymentData = {
      amount: 100,
      userId: "user123",
      ticketId, // Pass the ticketId here
      date: new Date().toISOString(),
      status: "completed",
      cardInfo: { cardNumber, expiryDate, cvc },
    };

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("/api/v1/payment", paymentData);
      if (response.status === 201) {
        setSuccess("Paiement réussi!");
        setEmail("");
        setAddress("");
        setCardNumber("");
        setExpiryDate("");
        setCvc("");
      }
    } catch (error) {
      setError("Échec du paiement. Veuillez réessayer.");
      console.error("Error during payment:", error);
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
          <p className="text-3xl font-bold text-blue-600">100 MAD</p>
        </div>

        <div className="space-y-2 rounded-lg bg-gray-50 p-4">
          <h3 className="flex items-center gap-2 font-semibold">
            <Calendar className="h-5 w-5 text-blue-500" />
            Informations sur le billet
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p>
              <span className="font-medium">De:</span> Casablanca
            </p>
            <p>
              <span className="font-medium">À:</span> Marrakech
            </p>
            <p>
              <span className="font-medium">Date:</span> 2024-11-20
            </p>
            <p>
              <span className="font-medium">Heure:</span> 08:00 AM
            </p>
          </div>
        </div>

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