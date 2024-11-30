import { useTranslation } from "react-i18next";

const { t } = useTranslation();

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return null;
  if (!emailRegex.test(email)) return t("emailInvalid");
  return null; // No error
};

export const validatePassword = (password) => {
  if (!password) return t("passwordRequired");
  if (password.length < 8) return t("passwordLength");
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password))
    return t("passwordComplexity");
  return null; // No error
};

export const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^[01][0-9]{9,10}$/; // Starts with 0 or 1, followed by 9 or 10 digits
  if (!phoneNumber) return t("phoneNumberRequired");
  if (!phoneRegex.test(phoneNumber)) return t("phoneNumberInvalid");
  return null; // No error
};

export const validatePasswordMatch = (password, confirmPassword) => {
  if (!password) return t("passwordRequired");
  if (!confirmPassword) return t("confirmPasswordRequired");
  if (password !== confirmPassword) return t("passwordsDoNotMatch");
  return null; // No error
};

export const validateRequiredField = (field, fieldName) => {
  if (!field) return `${fieldName} is required`;
  return null; // No error
};
