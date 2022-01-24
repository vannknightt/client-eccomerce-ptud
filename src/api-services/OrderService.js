import Axios from 'axios';

const RESOURCE_NAME = '/api/order';
const pathasp = 'https://localhost:44344'
const pathjava = 'http://localhost:8080'

// const pathasp = 'https://aspnet-ecommerce-ptud.herokuapp.com'
// const pathjava = 'https://java-ecommerce-ptud.herokuapp.com'

export default {
  getOrder() {
    return Axios.get(pathasp + RESOURCE_NAME);
  },
  getOrderId(id) {
    return Axios.get(pathasp + RESOURCE_NAME+ '/' + id);
  },
  createOrder(order) {
    return Axios.post(pathasp + RESOURCE_NAME, order,
        { headers: {'Content-Type': 'application/json'}});
  },
  updateOrderStatus(id, status) {
    return Axios.put(pathjava + RESOURCE_NAME 
      + '/' + id + '/' + status);
  },
};