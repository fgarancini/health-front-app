import axios, { RawAxiosRequestHeaders } from "axios";
import { config } from "../../auth/config/config";

export const apiInstance = (accessToken?: string) => {
  const headers: RawAxiosRequestHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (accessToken && accessToken !='') {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return axios.create({
    baseURL:`${config.apiUrl}`,
    headers
  });
};
