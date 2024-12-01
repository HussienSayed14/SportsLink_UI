import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import authService from "../services/authService";
import addressService from "../services/addressService";
import AlertError from "../components/AlertError";
import AlertSuccess from "../components/AlertSuccess";
import { useUser } from "../context/UserContext";

function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setLoading } = useUser();

  // Form Fields
  const [selectedCountry, setSelectedCountry] = useState("+20"); // Default to Egypt
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("ROLE_USER"); // Default role
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  // Dropdown States
  const [governorates, setGovernorates] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedGovernorateId, setSelectedGovernorateId] = useState(null);
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const payload = {
        phoneNumber,
        countryCode: selectedCountry,
        password,
        fullName,
        email,
        role,
        governorateId: selectedGovernorateId,
        cityId: selectedCityId,
        districtId: selectedDistrictId,
      };

      const response = await authService.register(payload);

      if (response.status === 201 || response.status === 200) {
        console.log("Registration successful:", response.data);
        setResponseMessage(response.data.message);
        setShowAlertSuccess(true);
        setTimeout(() => {
          navigate("/verify", { state: response.data });
        }, 3000);
      } else {
        console.error("Registration failed:", response.data);
        setError(
          response.data.message || "Registration failed. Please try again."
        );
        setShowAlert(true);
      }
    } catch (err) {
      console.error("Error:", err);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            {t("registerTitle")}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-900"
              >
                {t("fullName")}
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t("enterFullName")}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                {t("email")}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("enterEmail")}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-900"
              >
                {t("phoneNumber")}
              </label>
              <div className="flex">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="border border-gray-300 rounded-l-md px-4 py-2 bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-500"
                >
                  <option value="+20">(مصر)Egypt (+20)</option>
                  <option value="+1">United States (+1)</option>
                  <option value="+44">United Kingdom (+44)</option>
                </select>
                <input
                  id="phone"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder={t("enterPhoneNumber")}
                  className="flex-1 border border-l-0 border-gray-300 rounded-r-md px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                {t("password")}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("enterPassword")}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            {/* Governorate Dropdown */}
            <div>
              <label
                htmlFor="governorate"
                className="block text-sm font-medium text-gray-900"
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
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">{t("selectGovernorate")}</option>
                {governorates.map((gov) => (
                  <option key={gov.id} value={gov.id}>
                    {gov.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City Dropdown */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-900"
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
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">{t("selectCity")}</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            {/* District Dropdown */}
            <div>
              <label
                htmlFor="district"
                className="block text-sm font-medium text-gray-900"
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
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {t("register")}
              </button>
            </div>
          </form>

          {error && (
            <AlertError message={error} onClose={() => setShowAlert(false)} />
          )}
          {showAlertSuccess && (
            <AlertSuccess
              message={responseMessage}
              onClose={() => setShowAlertSuccess(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
