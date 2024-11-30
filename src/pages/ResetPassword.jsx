import React from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import authService from "../services/authService";
import AlertError from "../components/AlertError";
import AlertSuccess from "../components/AlertSuccess";
import { useUser } from "../context/UserContext";
import { useLocation } from "react-router";
import inputValidation from "../utils/inputValidation";

function ResetPassword() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate;

  // Parse the query parameters
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("id");
  const token = queryParams.get("token");

  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const { setLoading } = useUser(); // Access the user context
  const [responeMessage, setResponseMessage] = useState(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  if (!userId || !token) {
    console.error("Missing userId or token in the URL!");
    navigate("/");
    return;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Reset error state

    const passwordError = inputValidation.validatePassword(password, t);
    const passwordConfirmationError = inputValidation.validatePassword(
      confirmPassword,
      t
    );
    const passwordMatchError = inputValidation.validatePasswordMatch(
      password,
      confirmPassword,
      t
    );

    if ((passwordError || passwordConfirmationError, passwordMatchError)) {
      setErrors({
        passwordMatch: passwordMatchError,
        password: passwordError,
        confirmPassword: passwordConfirmationError,
      });
      return;
    }

    setErrors({});

    try {
      setLoading(true);
      const payload = {
        userId,
        token,
        password,
      };

      const response = await authService.resetPassword(payload);

      if (response.status === 201 || response.status === 200) {
        console.log("Verififcation Successful successful:", response.data);
        setResponseMessage(responeMessage?.data?.message);
        setShowAlertSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
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
    <div className="flex flex-wrap justify-center items-center min-h-screen bg-indigo-50">
      <div className="w-full max-w-md mx-auto ">
        <div className="text-center mb-10 flex flex-col items-center justify-center">
          <h1 className="text-xl font-semibold mb-2">{t("resetPassword")}</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="newPassword"
            >
              {t("newPassword")}
            </label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handlePasswordChange}
              value={password}
              required
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmNewPassword"
            >
              {t("confirmNewPassword")}
            </label>
            <input
              type="password"
              name="confirmNewPassword"
              id="confirmNewPassword"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleConfirmPasswordChange}
              value={confirmPassword}
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword}</p>
            )}
            {errors.passwordMatch && (
              <p className="text-red-500">{errors.passwordMatch}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {t("submit")}
            </button>
          </div>
        </form>
      </div>
      {showAlert && (
        <AlertError message={error} onClose={() => setShowAlert(false)} />
      )}
      {showAlertSuccess && (
        <AlertSuccess
          message={responeMessage}
          onClose={() => setShowAlertSuccess(false)}
        />
      )}
    </div>
  );
}

export default ResetPassword;
