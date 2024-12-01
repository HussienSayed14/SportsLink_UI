import axiosInstance from "../api/axiosInstance";

const getGovernorates = async () => {
  try {
    const response = await axiosInstance.get("/address/governorates");
    return response;
  } catch (err) {
    console.error("Governorate error : ", err);
    return err.response;
  }
};

const getCitiesInGovernorate = async (govId) => {
  try {
    const response = await axiosInstance.get(
      `/address/governorates/${govId}/cities`
    );
    return response;
  } catch (err) {
    console.error(err.response);
    return err.response;
  }
};

const getDistrictsInCity = async (cityId) => {
  try {
    const response = await axiosInstance.get(
      `/address/cities/${cityId}/districts`
    );
    return response;
  } catch (err) {
    console.error(err.response);
    return err.response;
  }
};

export default {
  getGovernorates,
  getCitiesInGovernorate,
  getDistrictsInCity,
};
