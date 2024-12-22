"use client";

import React from "react";

const Upgrade = ({ userId, userEmail }) => {
  const handleUpgradeClick = async () => {
    // Load Razorpay script
    const loadRazorpay = () =>
      new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });

    const isRazorpayLoaded = await loadRazorpay();
    if (!isRazorpayLoaded) {
      alert("Failed to load payment gateway. Please try again later.");
      return;
    }

    // Create a subscription on the server
    const response = await fetch("/api/create-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, userEmail }),
    });

    const { subscriptionId } = await response.json();

    if (!subscriptionId) {
      alert("Failed to create subscription. Please try again later.");
      return;
    }

    // Initialize Razorpay checkout
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      subscription_id: subscriptionId,
      name: "Videomatic AI",
      description: "Upgrade to Premium Plan",
      handler: async function (response) {
        // Handle successful payment here
        const res = await fetch("/api/verify-subscription", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_subscription_id: response.razorpay_subscription_id,
            razorpay_signature: response.razorpay_signature,
            userId,
            userEmail,
          }),
        });

        const data = await res.json();
        if (data.success) {
          alert("Subscription upgraded successfully!");
        } else {
          alert("Payment successful, but failed to verify subscription.");
        }
      },
      prefill: {
        email: userEmail,
      },
      theme: {
        color: "#6366F1",
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-16">
        Upgrade to Premium
      </h1>
      <div className="border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Premium Plan
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Unlock all features for just ₹999/month.
        </p>
        <ul className="space-y-4 text-gray-600">
          <li className="flex items-center">
            <span className="mr-2 text-green-500">&#10003;</span> Generate 60
            videos per month
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-green-500">&#10003;</span> Access
            exclusive styles
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-green-500">&#10003;</span> Priority
            support
          </li>
        </ul>
        <button
          onClick={handleUpgradeClick}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
        >
          Subscribe for ₹999/month
        </button>
      </div>
      <p className="text-sm text-gray-500 text-center mt-4">Upgrade Now.</p>
    </div>
  );
};

export default Upgrade;
