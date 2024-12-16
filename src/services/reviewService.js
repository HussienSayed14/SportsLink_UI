import axiosInstance from "../api/axiosInstance";

const createReview = async (payload) => {
  try {
    const response = await axiosInstance.post("/review/createReview", payload);
    return response;
  } catch (err) {
    console.error("Search Fields error : ", err);
    return err.response;
  }
};

const getFieldReviews = async (fieldId) => {
  try {
    const response = await axiosInstance.get(
      `/review/getFieldReviews/${fieldId}`
    );
    return response;
  } catch (err) {
    console.error("Create field error : ", err);
    return err.response;
  }
};

export default {
  createReview,
  getFieldReviews,
};
