import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import authService from "../services/authService";

function Register() {
  const { t } = useTranslation();

  const countryCodes = [
    { name: "Egypt", code: "+20" },
    { name: "United States", code: "+1" },
    { name: "United Kingdom", code: "+44" },
    // Add more country codes as needed
  ];

  const roles = [
    { name: t("userRole"), value: "USER" },
    { name: t("adminRole"), value: "ADMIN" },
  ];

  const [selectedCountry, setSelectedCountry] = useState("+20"); // Default to Egypt
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER"); // Default role
  const [error, setError] = useState(null);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Reset error state

    try {
      // Call the register API
      const payload = {
        phoneNumber,
        countryCode: selectedCountry,
        password,
        fullName,
        email,
        role,
      };

      const response = await authService.register(payload);

      if (response.status === 201) {
        console.log("Registration successful:", response.data);
        // Redirect to login page or another page
      } else {
        console.error("Registration failed:", response.data);
      }
    } catch (err) {
      console.error("Error:", err);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
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
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            {t("registerTitle")}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm/6 font-medium text-gray-900"
              >
                {t("fullName")}
              </label>
              <div className="mt-2">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={handleFullNameChange}
                  placeholder={t("enterFullName")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                {t("email")}
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder={t("enterEmail")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Country Code and Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm/6 font-medium text-gray-900"
              >
                {t("phoneNumber")}
              </label>
              <div className="mt-2 flex">
                <select
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="border border-gray-300 rounded-l-md px-4 py-2 bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-500"
                >
                  {countryCodes.map((country, index) => (
                    <option key={index} value={country.code}>
                      {country.name} ({country.code})
                    </option>
                  ))}
                </select>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  required
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder={t("enterPhoneNumber")}
                  className="flex-1 border border-l-0 border-gray-300 rounded-r-md px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                {t("password")}
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder={t("enterPassword")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm/6 font-medium text-gray-900"
              >
                {t("role")}
              </label>
              <div className="mt-2">
                <select
                  id="role"
                  value={role}
                  onChange={handleRoleChange}
                  className="block w-full rounded-md border border-gray-300 px-4 py-2 bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-500"
                >
                  {roles.map((r, index) => (
                    <option key={index} value={r.value}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {t("register")}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 text-sm/6 text-red-600">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
