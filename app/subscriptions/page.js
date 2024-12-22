"use client";

import React from "react";

const Subscriptions = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Upgrade to Premium
        </h1>
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Premium Plan
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Unlock all features for just $14/month.
          </p>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-center">
              <span className="mr-2 text-green-500">&#10003;</span> Generate unlimited videos
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-green-500">&#10003;</span> Access exclusive styles
            </li>
            <li className="flex items-center">
              <span className="mr-2 text-green-500">&#10003;</span> Priority support
            </li>
          </ul>
          <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition">
            Subscribe for $14/month
          </button>
        </div>
        <p className="text-sm text-gray-500 text-center mt-4">
          Cancel anytime. No hidden fees.
        </p>
      </div>
    </div>
  );
};

export default Subscriptions;
