import * as Axios from 'axios';
const RESOURCE_NAME = 'https://trung-ptud-dotnet.herokuapp.com/api/ExtenInfor';


export default {

  getAll() {
    return Axios.get(RESOURCE_NAME);
  },

  get(id) {
    return Axios.get(`${RESOURCE_NAME}/${id}`,{withCredentials: false});
  },

  create(data) {
    return Axios.post(RESOURCE_NAME, data, {withCredentials: false});
  },

  update(id, data) {
    return Axios.put(`${RESOURCE_NAME}/${id}`, data,{withCredentials: false});
  },

  delete(id) {
    return Axios.delete(`${RESOURCE_NAME}/${id}`);
  }
};
