import Axios from 'axios';

const RESOURCE_NAME = '/api/products';

// const pathjava = 'http://localhost:8080'
// const pathasp = 'https://localhost:44344'

const pathasp = 'https://aspnet-ecommerce-ptud.herokuapp.com'
const pathjava = 'https://java-ecommerce-ptud.herokuapp.com'

export default {
  getAll() {
    return Axios.get(pathasp + RESOURCE_NAME);
  },
  getProduct(id) {
    return Axios.get(pathjava + RESOURCE_NAME + '/' + id);
  },
  addComment(id, data) {
    return Axios.put(pathjava + RESOURCE_NAME + '/' + id, data, 
    { headers: {'Content-Type': 'application/json'}});
  },
  create(data) {
    return Axios.post(RESOURCE_NAME, data);
  },
  update(id, data) {
    return Axios.put(`${RESOURCE_NAME}/${id}`, data);
  },
  delete(id) {
    return Axios.delete(`${RESOURCE_NAME}/${id}`);
  }
};