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
  console.log("Getting field reviews");
  try {
    const response = await axiosInstance.get(
      `/review/getFieldReviews/${fieldId}`
    );
    console.log("Get field review response: ", response);
    return response;
  } catch (err) {
    console.error("get field review error : ", err);
    return err.response;
  }
};

export default {
  createReview,
  getFieldReviews,
};
