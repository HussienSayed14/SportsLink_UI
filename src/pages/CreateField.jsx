import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import fieldService from "../services/fieldService";
import { useUser } from "../context/UserContext";
import addressService from "../services/addressService";

const CreateField = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setLoading } = useUser();
  // State for form inputs
  const [formData, setFormData] = useState({
    fieldOwnerId: "",
    fieldNameEn: "",
    fieldNameAr: "",
    landMarkEn: "",
    landMarkAr: "",
    hourPrice: "",
    googleMapsLocation: "",
  });

  // State for form errors
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Dropdown States
  const [governorates, setGovernorates] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedGovernorateId, setSelectedGovernorateId] = useState(null);
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(null);

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

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fieldOwnerId)
      newErrors.fieldOwnerId = "Field owner ID is required.";
    if (!formData.fieldNameEn)
      newErrors.fieldNameEn = "Field name in English is required.";
    if (formData.fieldNameEn.length > 100)
      newErrors.fieldNameEn =
        "Field name in English cannot exceed 100 characters.";
    if (!formData.fieldNameAr)
      newErrors.fieldNameAr = "Field name in Arabic is required.";
    if (formData.fieldNameAr.length > 100)
      newErrors.fieldNameAr =
        "Field name in Arabic cannot exceed 100 characters.";
    if (formData.landMarkEn && formData.landMarkEn.length > 150)
      newErrors.landMarkEn =
        "Landmark in English cannot exceed 150 characters.";
    if (formData.landMarkAr && formData.landMarkAr.length > 150)
      newErrors.landMarkAr = "Landmark in Arabic cannot exceed 150 characters.";
    if (!formData.hourPrice) newErrors.hourPrice = "Hour price is required.";
    if (formData.hourPrice <= 0)
      newErrors.hourPrice = "Hour price must be positive.";
    if (!formData.googleMapsLocation)
      newErrors.googleMapsLocation = "Google Maps location is required.";
    if (formData.googleMapsLocation.length > 255)
      newErrors.googleMapsLocation =
        "Google Maps location cannot exceed 255 characters.";
    if (!formData.governorateId)
      newErrors.governorateId = "Governorate ID is required.";
    if (!formData.cityId) newErrors.cityId = "City ID is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form data submitted:", formData);
      // Send data to the backend
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Page Heading */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Create Football Field
        </h1>

        {/* Form */}
        <form
          className="bg-white shadow-md rounded-lg p-6 space-y-4"
          onSubmit={handleSubmit}
        >
          {/* Field Owner ID */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Field Owner ID
            </label>
            <input
              type="number"
              name="fieldOwnerId"
              value={formData.fieldOwnerId}
              onChange={handleChange}
              className={`w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200 ${
                errors.fieldOwnerId ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.fieldOwnerId && (
              <p className="text-red-500 text-sm mt-1">{errors.fieldOwnerId}</p>
            )}
          </div>

          {/* Field Name (English) */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Field Name (English)
            </label>
            <input
              type="text"
              name="fieldNameEn"
              value={formData.fieldNameEn}
              onChange={handleChange}
              className={`w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200 ${
                errors.fieldNameEn ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.fieldNameEn && (
              <p className="text-red-500 text-sm mt-1">{errors.fieldNameEn}</p>
            )}
          </div>

          {/* Field Name (Arabic) */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Field Name (Arabic)
            </label>
            <input
              type="text"
              name="fieldNameAr"
              value={formData.fieldNameAr}
              onChange={handleChange}
              className={`w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200 ${
                errors.fieldNameAr ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.fieldNameAr && (
              <p className="text-red-500 text-sm mt-1">{errors.fieldNameAr}</p>
            )}
          </div>

          {/* Landmark (English) */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Landmark (English)
            </label>
            <input
              type="text"
              name="landMarkEn"
              value={formData.landMarkEn}
              onChange={handleChange}
              className={`w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200 ${
                errors.landMarkEn ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.landMarkEn && (
              <p className="text-red-500 text-sm mt-1">{errors.landMarkEn}</p>
            )}
          </div>
          {/* Landmark (Arabic) */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Landmark (Arabic)
            </label>
            <input
              type="text"
              name="landMarkEn"
              value={formData.landMarkAr}
              onChange={handleChange}
              className={`w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200 ${
                errors.landMarkAr ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.landMarkAr && (
              <p className="text-red-500 text-sm mt-1">{errors.landMarkAr}</p>
            )}
          </div>

          {/* Hour Price */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Hour Price
            </label>
            <input
              type="number"
              name="hourPrice"
              value={formData.hourPrice}
              onChange={handleChange}
              className={`w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200 ${
                errors.hourPrice ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.hourPrice && (
              <p className="text-red-500 text-sm mt-1">{errors.hourPrice}</p>
            )}
          </div>

          {/* Google Maps Location */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Google Maps Location
            </label>
            <input
              type="text"
              name="googleMapsLocation"
              value={formData.googleMapsLocation}
              onChange={handleChange}
              className={`w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200 ${
                errors.googleMapsLocation ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.googleMapsLocation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.googleMapsLocation}
              </p>
            )}
          </div>

          {/* Governorate ID */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
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
              className={`w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200 ${
                errors.governorateId ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">{t("selectGovernorate")}</option>
              {governorates.map((gov) => (
                <option key={gov.id} value={gov.id}>
                  {gov.name}
                </option>
              ))}
            </select>
            {errors.governorateId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.governorateId}
              </p>
            )}
          </div>

          {/* City ID */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
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
              className={`w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200 ${
                errors.cityId ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">{t("selectCity")}</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.cityId && (
              <p className="text-red-500 text-sm mt-1">{errors.cityId}</p>
            )}
          </div>

          {/* District ID */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
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
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-indigo-200"
            >
              <option value="">{t("selectDistrict")}</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-indigo-500 focus:ring focus:ring-indigo-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateField;
