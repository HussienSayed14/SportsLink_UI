import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

function AlertWarning({ message, onClose }) {
  return (
    <div className="fixed bottom-4 left-4 max-w-sm w-full bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded shadow-lg flex items-start space-x-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current text-yellow-500"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4m0 4h.01M20.938 8.938A9 9 0 1111.062 3.062a9 9 0 019.876 5.876z"
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

export default AlertWarning;
