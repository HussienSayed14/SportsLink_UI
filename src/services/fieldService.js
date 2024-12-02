import axiosInstance from "../api/axiosInstance";

const searchFields = async (payload) => {
  try {
    const response = await axiosInstance.post("/fields/search", payload);
    return response;
  } catch (err) {
    console.error("Search Fields error : ", err);
    return err.response;
  }
};

export default {
  searchFields,
};
