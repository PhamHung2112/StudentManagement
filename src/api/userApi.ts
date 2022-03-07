import { User, UserPayload } from 'models';
import axiosUser from './axiosUser';

const userApi = {
  register(data: Partial<UserPayload>): Promise<User> {
    const url = '/auth/local/register';
    return axiosUser.post(url, data);
  },
  login(data: Partial<UserPayload>): Promise<User> {
    const url = '/auth/local';
    return axiosUser.post(url, data);
  },
};

export default userApi;
