import { ListParams, ListResponse, Student } from 'models';
import axiosManagement from './axiosManagement';

const studentApi = {
  getAll(params: ListParams): Promise<ListResponse<Student>> {
    const url = '/students';
    return axiosManagement.get(url, {
      params,
    });
  },
  getById(id: string): Promise<Student> {
    const url = `/students/${id}`;
    return axiosManagement.get(url);
  },
  create(data: Student): Promise<Student> {
    const url = '/students';
    return axiosManagement.post(url, data);
  },
  update(data: Partial<Student>): Promise<Student> {
    const url = `/students/${data.id}`;
    return axiosManagement.patch(url, data);
  },
  delete(id: string): Promise<any> {
    const url = `/students/${id}`;
    return axiosManagement.delete(url);
  },
};

export default studentApi;
