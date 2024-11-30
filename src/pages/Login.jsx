import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import authService from "../services/authService";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router";

function Login() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const countryCodes = [
    { name: "Egypt", code: "+20" },
    { name: "United States", code: "+1" },
    { name: "United Kingdom", code: "+44" },
    // Add more country codes as needed
  ];

  const [selectedCountry, setSelectedCountry] = useState("+20"); // Default to Egypt
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser, setIsAuthenticated, setLoading } = useUser(); // Access the user context

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Call the login API
      const response = await authService.login(
        phoneNumber,
        selectedCountry,
        password
      );

      if (response.status != 200 || response.select != 201) {
        console.log("Login Failed");
        return;
        // Add More Logic
      }

      // Redirect to dashboard or another page
      console.log("Login successful:", userData);

      // Update the context with user details
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (err) {
      console.log("errr: ", err);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
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
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            {t("loginTitle")}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm/6 font-medium text-gray-900"
              >
                {t("phoneNumber")}
              </label>
              <div className="mt-2 flex">
                {/* Country Code Dropdown */}
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

                {/* Phone Number Input */}
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  required
                  placeholder={t("enterPhoneNumber")}
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className="flex-1 border border-l-0 border-gray-300 rounded-r-md px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  {t("password")}
                </label>
                <div className="text-sm">
                  <a
                    onClick={navigate("/forgot-password")}
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    {t("forgotPassword")}
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={handlePasswordChange}
                  value={password}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {t("signIn")}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            {t("notMember")}{" "}
            <a
              onClick={navigate("/register")}
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              {t("createAccount")}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
