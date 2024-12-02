import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import fieldService from "../services/fieldService";
import { useUser } from "../context/UserContext";

const SearchFields = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setLoading } = useUser();

  const [filters, setFilters] = useState({
    fieldName: "",
    governorate: "",
    city: "",
    district: "",
    minPrice: "",
    maxPrice: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to results page with filters as query parameters
    const queryParams = new URLSearchParams(filters).toString();
    navigate(`/search-results?${queryParams}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Page Heading */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Search for Fields
        </h1>

        {/* Filters Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Filters</h2>
          <form
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            onSubmit={handleSearch}
          >
            {/* Field Name */}
            <div>
              <label
                htmlFor="fieldName"
                className="block text-sm font-medium text-gray-600"
              >
                Field Name
              </label>
              <input
                type="text"
                id="fieldName"
                name="fieldName"
                value={filters.fieldName}
                onChange={handleInputChange}
                placeholder="Enter field name"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
              />
            </div>

            {/* Governorate */}
            <div>
              <label
                htmlFor="governorate"
                className="block text-sm font-medium text-gray-600"
              >
                Governorate
              </label>
              <select
                id="governorate"
                name="governorate"
                value={filters.governorate}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
              >
                <option value="">Select Governorate</option>
                <option value="Cairo">Cairo</option>
                <option value="Giza">Giza</option>
              </select>
            </div>

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-600"
              >
                City
              </label>
              <select
                id="city"
                name="city"
                value={filters.city}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
              >
                <option value="">Select City</option>
                <option value="Nasr City">Nasr City</option>
                <option value="Heliopolis">Heliopolis</option>
              </select>
            </div>

            {/* District */}
            <div>
              <label
                htmlFor="district"
                className="block text-sm font-medium text-gray-600"
              >
                District
              </label>
              <select
                id="district"
                name="district"
                value={filters.district}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
              >
                <option value="">Select District</option>
                <option value="District 1">District 1</option>
                <option value="District 2">District 2</option>
              </select>
            </div>

            {/* Min Price */}
            <div>
              <label
                htmlFor="minPrice"
                className="block text-sm font-medium text-gray-600"
              >
                Min Price
              </label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleInputChange}
                placeholder="Enter minimum price"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
              />
            </div>

            {/* Max Price */}
            <div>
              <label
                htmlFor="maxPrice"
                className="block text-sm font-medium text-gray-600"
              >
                Max Price
              </label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleInputChange}
                placeholder="Enter maximum price"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
              />
            </div>

            {/* Search Button */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-right">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchFields;
