import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import fieldService from "../services/fieldService";
import { useUser } from "../context/UserContext";
import addressService from "../services/addressService";

const SearchFields = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setLoading } = useUser();

  // Dropdown States
  const [governorates, setGovernorates] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedGovernorateId, setSelectedGovernorateId] = useState(null);
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    fieldName: "",
    minPrice: "",
    maxPrice: "",
  });

  // Fetch governorates on mount
  useEffect(() => {
    async function fetchGovernorates() {
      try {
        const response = await addressService.getGovernorates();
        setGovernorates(response.data);
      } catch (err) {
        console.error("Error fetching governorates:", err);
      }
    }
    fetchGovernorates();
  }, []);

  // Fetch cities when governorate changes
  useEffect(() => {
    async function fetchCities() {
      if (!selectedGovernorateId) return;
      try {
        const response = await addressService.getCitiesInGovernorate(
          selectedGovernorateId
        );
        setCities(response.data);
        setSelectedCityId(null);
        setDistricts([]); // Reset districts
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    }
    fetchCities();
  }, [selectedGovernorateId]);

  // Fetch districts when city changes
  useEffect(() => {
    async function fetchDistricts() {
      if (!selectedCityId) return;
      try {
        const response = await addressService.getDistrictsInCity(
          selectedCityId
        );
        setDistricts(response.data);
        setSelectedDistrictId(null);
      } catch (err) {
        console.error("Error fetching districts:", err);
      }
    }
    fetchDistricts();
  }, [selectedCityId]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      setLoading(true);
      const payload = {
        fieldName: filters.fieldName,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        governorateId: selectedGovernorateId,
        cityId: selectedCityId,
        districtId: selectedDistrictId,
      };

      const response = await fieldService.searchFields(payload);

      if (response.status === 201 || response.status === 200) {
        console.log("Search Fields successful:", response.data);
        setResponseMessage(response.data.message);
        setShowAlertSuccess(true);
        setTimeout(() => {
          navigate("/search-result", { state: response.data });
        }, 3000);
      } else {
        console.error("search field failed:", response);
        setError(response.data.message || "Something Wrong Happened");
        setShowAlert(true);
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.message || "Something Wrong Happened");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Page Heading */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          {t("searchFields")}
        </h1>

        {/* Filters Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {t("filters")}
          </h2>
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
                {t("fieldName")}
              </label>
              <input
                type="text"
                id="fieldName"
                name="fieldName"
                value={filters.fieldName}
                onChange={handleInputChange}
                placeholder={t("enterFieldName")}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
              />
            </div>

            {/* Governorate */}
            <div>
              <label
                htmlFor="governorate"
                className="block text-sm font-medium text-gray-600"
              >
                {t("governorate")}
              </label>
              <select
                id="governorate"
                value={selectedGovernorateId || ""}
                onChange={(e) => {
                  const selected = governorates.find(
                    (g) => g.id === parseInt(e.target.value)
                  );
                  setSelectedGovernorateId(selected?.id || null);
                }}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
              >
                <option value="">{t("selectGovernorate")}</option>
                {governorates.map((gov) => (
                  <option key={gov.id} value={gov.id}>
                    {gov.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-600"
              >
                {t("city")}
              </label>
              <select
                id="city"
                value={selectedCityId || ""}
                onChange={(e) => {
                  const selected = cities.find(
                    (c) => c.id === parseInt(e.target.value)
                  );
                  setSelectedCityId(selected?.id || null);
                }}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
              >
                <option value="">{t("selectCity")}</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label
                htmlFor="district"
                className="block text-sm font-medium text-gray-600"
              >
                {t("district")}
              </label>
              <select
                id="district"
                value={selectedDistrictId || ""}
                onChange={(e) => {
                  const selected = districts.find(
                    (d) => d.id === parseInt(e.target.value)
                  );
                  setSelectedDistrictId(selected?.id || null);
                }}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
              >
                <option value="">{t("selectDistrict")}</option>
                {districts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Price */}
            <div>
              <label
                htmlFor="minPrice"
                className="block text-sm font-medium text-gray-600"
              >
                {t("minPrice")}
              </label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleInputChange}
                placeholder={t("enterMinPrice")}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
              />
            </div>

            {/* Max Price */}
            <div>
              <label
                htmlFor="maxPrice"
                className="block text-sm font-medium text-gray-600"
              >
                {t("maxPrice")}
              </label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleInputChange}
                placeholder={t("enterMaxPrice")}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
              />
            </div>

            {/* Search Button */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-right">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300"
              >
                {t("search")}
              </button>
            </div>
          </form>
        </div>
      </div>
      {error && (
        <AlertError message={error} onClose={() => setShowAlert(false)} />
      )}
    </div>
  );
};

export default SearchFields;
