import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

function AlertSuccess({ message, onClose }) {
  return (
    <div className="fixed bottom-4 left-4 max-w-sm w-full bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg flex items-start space-x-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current text-green-500"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Close"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export default AlertSuccess;
