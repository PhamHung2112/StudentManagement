import { City, ListParams, ListResponse } from 'models';
import axiosManagement from './axiosManagement';

const cityApi = {
  getAll(params: ListParams): Promise<ListResponse<City>> {
    const url = '/cities';
    return axiosManagement.get(url, {
      params,
    });
  },
};

export default cityApi;
