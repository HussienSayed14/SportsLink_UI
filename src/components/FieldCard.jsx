import React from "react";
import logo from "../assets/logo_transparent.png";

function FieldCard({ field }) {
  return (
    <div
      key={field.fieldId}
      className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
    >
      <img src={logo} alt="Field Image" className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{field.fieldName}</h2>
        <p className="text-sm text-gray-500">
          Location: {field.googleMapsLocation}
        </p>
        <p className="text-sm text-gray-500">Landmark: {field.landMark}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-green-500 font-bold">${field.hourPrice}</p>
          <p className="text-yellow-400 flex items-center">
            <span>⭐</span> {field.averageRating}
          </p>
        </div>
        <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
          <p>Followers: {field.followersCount}</p>
        </div>
      </div>
    </div>
  );
}

export default FieldCard;
