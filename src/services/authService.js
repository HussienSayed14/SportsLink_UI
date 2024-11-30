import axiosInstance from "../api/axiosInstance";

const login = async (phone, countryCode, password) => {
  try {
    const payload = {
      phone,
      countryCode,
      password,
    };
    console.log("Payload: ", payload);
    const response = await axiosInstance.post("/userAuth/login", payload);
    console.log("Login Response: ", response);
    return response;
  } catch (err) {
    console.log("Err 12: ", err.response);
    return err.response;
  }
};

const register = async (payload) => {
  try {
    console.log("Payload: ", payload);
    const response = await axiosInstance.post("/userAuth/signUp", payload);
    console.log("Register Response: ", response);
    return response;
  } catch (err) {
    console.log("Err 12: ", err.response);
    return err.response;
  }
};

const verifyUser = async (payload) => {
  try {
    console.log("Payload: ", payload);
    const response = await axiosInstance.post("/userAuth/verifyUser", payload);
    console.log("Verify User Response: ", response);
    return response;
  } catch (err) {
    console.log("Err 12: ", err.response);
    return err.response;
  }
};

const resendCode = async (userId) => {
  try {
    const response = await axiosInstance.post(`/userAuth/resendCode/${userId}`);
    console.log("resend code Response: ", response);
    return response;
  } catch (err) {
    console.log("Err 12: ", err.response);
    return err.response;
  }
};

const forgotPasswordRequest = async (payload) => {
  try {
    console.log("Payload: ", payload);
    const response = await axiosInstance.post(
      "/userAuth/forgotPassword",
      payload
    );
    console.log("Forgot Password Response: ", response);
    return response;
  } catch (err) {
    console.log("Err 12: ", err.response);
    return err.response;
  }
};

const resetPassword = async (payload) => {
  try {
    console.log("Payload: ", payload);
    const response = await axiosInstance.post(
      "/userAuth/resetPassword",
      payload
    );
    console.log("Forgot Password Response: ", response);
    return response;
  } catch (err) {
    console.error(err);
    return err.response;
  }
};

// Fetch user details: Fetches the authenticated user's info
const getUserDetails = async () => {
  try {
    const response = await axiosInstance.get("/user/getDetails");
    console.log("get user details ", response);
    return response;
  } catch (err) {
    console.error("Get User details error", err);
    return err.response;
  }

  return response.data;
};

// Logout function: Clears the user's session
const logout = async () => {
  await axiosInstance.post("/auth/logout");
};

export default {
  login,
  register,
  getUserDetails,
  verifyUser,
  resendCode,
  resetPassword,
  forgotPasswordRequest,
  logout,
};
