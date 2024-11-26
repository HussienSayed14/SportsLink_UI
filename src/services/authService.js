import axiosInstance from "../api/axiosInstance";

const loginApiCall = async (phoneNumber, countryCode, password) => {
  const response = await axiosInstance.post("/auth/login", {
    phoneNumber,
    countryCode,
    password,
  });
  return response.data;
};

const registerApiCall = async (phoneNumber, countryCode, password) => {
  const response = await axiosInstance.post("/auth/login", {
    phoneNumber,
    countryCode,
    password,
  });
  console.log(response);
  return response.data;
};

export default {
  loginApiCall,
  registerApiCall,
};
