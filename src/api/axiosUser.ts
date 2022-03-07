import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosUser = axios.create({
  baseURL: 'https://api.ezfrontend.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosUser.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosUser.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

export default axiosUser;
