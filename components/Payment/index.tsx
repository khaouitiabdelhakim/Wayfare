"use client"; // If you are using React components

import React, { useState } from "react";

const PaymentComponent = () => {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
        <img src="/images/logo/logo-black.png" alt="Company Logo" className="h-20" /> {/* Replace with actual logo path */}
      </div>
      <h2 className="text-2xl font-bold mb-6 text-center">Paiement</h2>

      {/* Amount to pay */}
      <div className="mb-4">
        <p className="text-xl font-semibold">Montant à payer:</p>
        <p className="text-2xl text-blue-600">100 MAD</p> {/* Replace with dynamic amount */}
      </div>

      {/* Ticket Information */}
      <div className="border rounded-lg p-4 mb-4">
        <h3 className="font-semibold mb-2">Informations sur le billet</h3>
        <p><strong>De:</strong> Casablanca</p>
        <p><strong>À:</strong> Marrakech</p>
        <p><strong>Date:</strong> 2024-11-20</p>
        <p><strong>Heure:</strong> 08:00 AM</p>
      </div>


      

      {/* User Information */}
      <div className="border rounded-lg p-4 mb-4">
        <h3 className="font-semibold mb-2">Détails de l&apos;utilisateur</h3>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="exemple@domaine.com"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="address">Adresse</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="123 Rue Exemple, Casablanca"
            required
          />
        </div>
      </div>

      {/* Card Information */}
      <div className="border rounded-lg p-4 mb-4">
        <h3 className="font-semibold mb-2">Informations de carte</h3>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="cardNumber">Numéro de carte</label>
          <input
            type="text"
            id="cardNumber"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="**** **** **** ****"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1" htmlFor="expiryDate">Date d&apos;expiration</label>
            <input
              type="text"
              id="expiryDate"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="MM/AA"
              required
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="cvc">CVC</label>
            <input
              type="text"
              id="cvc"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="***"
              required
            />
          </div>
        </div>
        <div className="flex justify-center mb-2">
          <img src="/images/cards.jpg" alt="Card Logos" className="h-40" /> 
        </div>
      </div>

      {/* Pay Button */}
      <div className="flex justify-center">
        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-200">
          Payer
        </button>
      </div>
    </div>
  );
};

export default PaymentComponent;
