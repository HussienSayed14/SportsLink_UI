import { useTranslation } from "react-i18next";

const { t } = useTranslation();

const comparePassword = async (password, confirmPassword) => {
  if (password === confirmPassword) {
    return true;
  }
  return "false";
};

const validateLength = async (value, size) => {
  if (value.length >= size) {
    return true;
  }
  return "false";
};

export default { comparePassword, validateLength };
