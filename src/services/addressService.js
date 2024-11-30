import axiosInstance from "../api/axiosInstance";

const getGovernorates = async () => {
  try {
    const response = await axiosInstance.get("/address/governorates");
    console.log("Governorates Response: ", response);
    return response;
  } catch (err) {
    console.log("Governorate error : ", err);
    return err.response;
  }
};

const getCitiesInGovernorate = async (govId) => {
  try {
    const response = await axiosInstance.get(
      `/address/governorates/${govId}/cities`
    );
    console.log("Cities Response: ", response);
    return response;
  } catch (err) {
    console.log("Err : ", err.response);
    return err.response;
  }
};

const getDistrictsInCity = async (cityId) => {
  try {
    const response = await axiosInstance.get(
      `/address/cities/${cityId}/districts`
    );
    console.log("Districs Response: ", response);
    return response;
  } catch (err) {
    console.log("Err : ", err.response);
    return err.response;
  }
};

export default {
  getGovernorates,
  getCitiesInGovernorate,
  getDistrictsInCity,
};
