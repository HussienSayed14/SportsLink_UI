import React from "react";
import { useLocation } from "react-router";
import FieldCard from "../components/FieldCard";
function FieldSearchResult() {
  const location = useLocation();

  const fields = location.state || [];
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-white border-b border-gray-200 py-6 shadow-sm">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Fields Search Results
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Discover the best fields available for booking near you!
          </p>
        </div>
      </header>

      {/* Cards Section */}
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields.map((item, index) => (
            <div key={item.fieldId} onClick={() => alert(`${item.fieldName}`)}>
              <FieldCard field={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FieldSearchResult;
