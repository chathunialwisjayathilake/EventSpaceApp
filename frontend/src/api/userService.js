import api from './axiosConfig';

export const fetchUsers = async () => {
  const { data } = await api.get('/users');
  return data;
};

export const deleteUser = async (userId) => {
  const { data } = await api.delete(`/users/${userId}`);
  return data;
};
