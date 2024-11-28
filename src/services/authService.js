import axiosInstance from "../api/axiosInstance";

const login = async (phoneNumber, countryCode, password) => {
  const response = await axiosInstance.post("/auth/login", {
    phoneNumber,
    countryCode,
    password,
  });
  return response.data;
};

const register = async (phoneNumber, countryCode, password) => {
  const response = await axiosInstance.post("/auth/login", {
    phoneNumber,
    countryCode,
    password,
  });
  console.log(response);
  return response.data;
};

// Fetch user details: Fetches the authenticated user's info
export const getUserDetails = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
};

// Logout function: Clears the user's session
export const logout = async () => {
  await axiosInstance.post("/auth/logout");
};

export default {
  login,
  register,
  getUserDetails,
};
