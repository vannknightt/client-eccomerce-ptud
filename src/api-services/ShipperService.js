import Axios from 'axios';

const RESOURCE_NAME = '/api/shipper';

// const pathjava = 'http://localhost:8080'
const pathjava = 'https://java-ecommerce-ptud.herokuapp.com'

export default {
    getShipper() {
        return Axios.get(pathjava + RESOURCE_NAME);
    },
}
