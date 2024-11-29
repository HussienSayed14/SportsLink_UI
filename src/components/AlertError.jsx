import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

function AlertError({ message, onClose }) {
  return (
    <div className="fixed bottom-4 left-4 max-w-sm w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg flex items-start space-x-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current text-red-500"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
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

export default AlertError;
