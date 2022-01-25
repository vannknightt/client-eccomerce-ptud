import Axios from 'axios';

const RESOURCE_NAME = '/api/shipper';
const pathjava = 'https://java-ecommerce-ptud.herokuapp.com'

export default {
    getShipper() {
        return Axios.get(pathjava + RESOURCE_NAME);
    },
}