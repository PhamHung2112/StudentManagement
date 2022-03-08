import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import queryString from 'query-string';

const axiosManagement = axios.create({
  baseURL: process.env.REACT_APP_MANAGEMENT_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosManagement.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosManagement.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

export default axiosManagement;
