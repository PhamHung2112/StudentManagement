import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosManagement = axios.create({
  baseURL: 'http://js-post-api.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
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
