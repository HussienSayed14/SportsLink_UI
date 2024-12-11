import React from "react";
import { useLocation } from "react-router";
import logo from "../assets/logo_transparent.png";

function FieldSearchResult() {
  const location = useLocation();

  const fields = location.state || [];
  console.log("Fields: ", fields);
  return (
    <div>
      <h1>Fields Search Results</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src={logo} alt="Field Image" class="w-full h-40 object-cover" />
          <div class="p-4">
            <h2 class="text-lg font-bold text-gray-800">Field Name</h2>
            <p class="text-sm text-gray-500">Location: City, Area</p>
            <p class="text-sm text-gray-500">Landmark: Famous Landmark</p>
            <div class="flex justify-between items-center mt-4">
              <p class="text-green-500 font-bold">$50/hour</p>
              <p class="text-yellow-400 flex items-center">
                <span>⭐</span> 4.5
              </p>
            </div>
            <div class="flex justify-between items-center mt-2 text-sm text-gray-500">
              <p>Followers: 1.2k</p>
              <p>Address: Street Name</p>
            </div>
          </div>
        </div>
      </div>

      {/* <ul>
        {fields.map((item, index) => (
          <li key={index}>{item.fieldName}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default FieldSearchResult;
