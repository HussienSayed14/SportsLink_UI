import React from "react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import authService from "../services/authService";
import AlertError from "../components/AlertError";
import AlertSuccess from "../components/AlertSuccess";
import { useUser } from "../context/UserContext";

function ForgotPassword() {
  const { t } = useTranslation();

  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const { setLoading } = useUser(); // Access the user context

  const countryCodes = [
    { name: "(مصر) Egypt", code: "+20" },
    { name: "United States", code: "+1" },
    { name: "United Kingdom", code: "+44" },
  ];

  const [selectedCountry, setSelectedCountry] = useState("+20"); // Default to Egypt
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Reset error state

    try {
      setLoading(true);
      const payload = {
        phoneNumber,
        countryCode: selectedCountry,
      };

      const response = await authService.forgotPasswordRequest(payload);

      if (response.status === 201 || response.status === 200) {
        console.log("Verififcation Successful successful:", response.data);
        setShowAlertSuccess(true);
      } else {
        setError(
          response?.data?.message || "Verification failed. Please try again."
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
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>{t("forgotPasswordTitle")}</p>
            </div>
          </div>

          <div>
            <form action="" method="post">
              <div className="flex flex-col space-y-16">
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

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                      type="button"
                      onClick={handleSubmit}
                    >
                      {t("submit")}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showAlert && (
        <AlertError message={error} onClose={() => setShowAlert(false)} />
      )}
      {showAlertSuccess && (
        <AlertSuccess
          message={t("userVirefied")}
          onClose={() => setShowAlertSuccess(false)}
        />
      )}
    </div>
  );
}

export default ForgotPassword;
