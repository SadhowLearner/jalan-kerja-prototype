import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const PostRequest = async (url: string, data: any) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/${url}`, data);
    return res;
  } catch (error) {
    return error;
  }
};

export const LoginRequest = async (
  url: string,
  credentials: { email: string; password: string }
) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/${url}`, credentials);

    if (res.status === 200 && res.data.token) {
      sessionStorage.setItem("token", res.data.token);
    }

    return res;
  } catch (error: any) {
    return error.response ?? error;
  }
};
