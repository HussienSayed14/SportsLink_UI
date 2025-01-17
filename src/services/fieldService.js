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

const createField = async (payload) => {
  try {
    const response = await axiosInstance.post("/fields/createField", payload);
    return response;
  } catch (err) {
    console.error("Create field error : ", err);
    return err.response;
  }
};

const isFollowingField = async (fieldId) => {
  try {
    const response = await axiosInstance.get(`/fields/is-following/${fieldId}`);
    console.log("is following reponse: ", response);
    return response;
  } catch (err) {
    console.error("is following field error : ", err);
    return err.response;
  }
};

const followField = async (fieldId) => {
  try {
    const response = await axiosInstance.post(`/fields/followField/${fieldId}`);
    return response;
  } catch (err) {
    console.error("follow field error : ", err);
    return err.response;
  }
};

const unFollowField = async (fieldId) => {
  try {
    const response = await axiosInstance.post(
      `/fields/unfollowField/${fieldId}`
    );
    return response;
  } catch (err) {
    console.error("unfollow field error : ", err);
    return err.response;
  }
};

export default {
  searchFields,
  createField,
  isFollowingField,
  unFollowField,
  followField,
};
