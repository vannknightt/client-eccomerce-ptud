import Axios from 'axios';


Axios.defaults.withCredentials = true;


const RESOURCE_NAME = '/api/cart';

// const pathasp = 'https://localhost:44344'
const pathasp = 'https://aspnet-ecommerce-ptud.herokuapp.com'

export default {
  getCart() {
    return Axios.get(pathasp + RESOURCE_NAME);
  },
  addToCart(product_id) {
    return Axios.post(pathasp + RESOURCE_NAME + '/addcart/' + product_id);
  },
  updateCartItem(product_id, quantity) {
    return Axios.put(pathasp + RESOURCE_NAME + '/updatecartquantity/' + product_id + '/' + quantity)
  },
  removeCartItem(product_id) {
    return Axios.delete(pathasp + RESOURCE_NAME + '/removecart/' + product_id);
  },
};