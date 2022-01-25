import Axios from 'axios';
const RESOURCE_NAME = 'https://trung-ptud-dotnet.herokuapp.com/api/Trouble';


export default {

  getAll() {
    return Axios.get(RESOURCE_NAME);
  },

  get(id) {
    return Axios.get(`${RESOURCE_NAME}/${id}`);
  },

  create(data) {
    return Axios.post(RESOURCE_NAME, data, {withCredentials: false});
  },

  update(id, data) {
    return Axios.put(`${RESOURCE_NAME}/${id}`, data);
  },

  delete(id) {
    return Axios.delete(`${RESOURCE_NAME}/${id}`);
  }
};
