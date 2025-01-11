import axios from "axios";
import Base_URL from "../../Base_Url";

// Register function
export const register = async (postData) => {
  try {
    const response = await axios.post(`${Base_URL}api/auth/register`, postData);
   
    localStorage.setItem('token', response?.data?.token);// Access response data directly
    return response;
  } catch (error) {
    console.error(error);
  }
};

// Login function
export const login = async (data) => {
  try {
    const response = await axios.post(`${Base_URL}api/auth/login`, data);
   // Access response data directly
   console.log(response.data.token)
   localStorage.setItem('token',response?.data?.token);
    return response;
  } catch (error) {
    console.error(error);
  }
};
