import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { UserError } from 'models';

const axiosUser = axios.create({
  baseURL: process.env.REACT_APP_USER_URL,
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
  function (error: UserError) {
    const { data, status } = error.response;
    if (status === 400) {
      const errorList = data.data || [];
      const messageList = errorList.length > 0 ? errorList[0].messages : [];
      const firstMessage: any = messageList[0].message;

      throw new Error(firstMessage);
    }
    return Promise.reject(error);
  }
);

export default axiosUser;
