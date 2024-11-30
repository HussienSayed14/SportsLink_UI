import React from "react";
import { useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import authService from "../services/authService";
import AlertError from "../components/AlertError";
import AlertSuccess from "../components/AlertSuccess";

function VerifyUser() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const location = useLocation();
  const { userId, phoneNumber } = location.state || {};
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);

  const handelCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Reset error state

    try {
      const payload = {
        userId,
        code,
      };
      const response = await authService.verifyUser(payload);

      if (response.status === 201 || response.status === 200) {
        console.log("Verififcation Successful successful:", response.data);
        setShowAlertSuccess(true);
        // Wait for 3 seconds and navigate to login
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
    }
  };

  const handleResendCode = async (event) => {
    event.preventDefault();
    setError(null); // Reset error state

    try {
      const response = await authService.resendCode(userId);

      if (response.status === 201 || response.status === 200) {
        console.log("Resend Code successful:", response.data);
        setShowAlertSuccess(true);
      } else {
        setError(
          response?.data?.message || "Resend code failed. Please try again."
        );
        setShowAlert(true);
      }
    } catch (err) {
      console.error("Error:", err);
      setError(
        err.response?.data?.message || "Resend Code failed. Please try again."
      );
      setShowAlert(true);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>{t("verificationTitle")}</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>
                {t("weSentCode")} {phoneNumber}
              </p>
            </div>
          </div>

          <div>
            <form action="" method="post">
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  <input
                    type="text"
                    placeholder={t("enterCode")}
                    onChange={handelCodeChange}
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                      type="button"
                      onClick={handleSubmit}
                    >
                      {t("verifyAccount")}
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>{t("didntGetCode")}</p>
                    <a
                      className="flex flex-row items-center text-blue-600"
                      rel="noopener noreferrer"
                      onClick={handleResendCode}
                    >
                      {t("resendCode")}
                    </a>
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

export default VerifyUser;
