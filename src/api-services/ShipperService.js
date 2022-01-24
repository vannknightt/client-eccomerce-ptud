import Axios from 'axios';

const RESOURCE_NAME = '/api/shipper';
const path = 'http://localhost:8080'

export default {
    getShipper() {
        return Axios.get(path + RESOURCE_NAME);
    },
}