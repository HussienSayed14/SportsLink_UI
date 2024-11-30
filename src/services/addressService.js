import axiosInstance from "../api/axiosInstance";

const getGovernorates = async () => {
  try {
    console.log("Payload: ", payload);
    const response = await axiosInstance.get("/address/governorates");
    console.log("Governorates Response: ", response);
    return response;
  } catch (err) {
    console.log("Err : ", err.response);
    return err.response;
  }
};

const getCitiesInGovernorate = async (govId) => {
  try {
    console.log("Payload: ", payload);
    const response = await axiosInstance.get(
      `/address/governorates/${govId}/cities`
    );
    console.log("Governorates Response: ", response);
    return response;
  } catch (err) {
    console.log("Err : ", err.response);
    return err.response;
  }
};

const getDistrictsInCity = async (cityId) => {
  try {
    console.log("Payload: ", payload);
    const response = await axiosInstance.get(
      `/address/cities/${cityId}/districts`
    );
    console.log("Governorates Response: ", response);
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
