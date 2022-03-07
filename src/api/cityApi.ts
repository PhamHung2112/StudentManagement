import { City, ListResponse } from 'models';
import axiosManagement from './axiosManagement';

const cityApi = {
  getAll(): Promise<ListResponse<City>> {
    const url = '/cities';
    return axiosManagement.get(url, {
      params: {
        _page: 1,
        _limit: 5,
      },
    });
  },
};

export default cityApi;
