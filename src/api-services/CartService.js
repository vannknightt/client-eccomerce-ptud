import Axios from 'axios';


Axios.defaults.withCredentials = true;


const RESOURCE_NAME = '/api/cart';

export default {
  getCart() {
    return Axios.get(RESOURCE_NAME);
  },

  addToCart(product_id) {
    return Axios.post(RESOURCE_NAME + '/addcart/' + product_id, {withCredentials: true});
  },

  update(id, data) {
    return Axios.put(`${RESOURCE_NAME}/${id}`, data);
  },

  delete(id) {
    return Axios.delete(`${RESOURCE_NAME}/${id}`);
  }
};