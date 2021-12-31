import axiosClient from "./axiosClient";

const url = "https://localhost:5001/api/Shipper";
const shipperService = {
  create(payload) {
    return axiosClient.post(url, payload);
  },
  update(id, payload) {
    return axiosClient.put(`${url}/${id}`, payload);
  },
  getAll() {
    return axiosClient.get(url);
  },
  getDetail(id) {
    return axiosClient.get(`${url}/${id}`);
  },
  delete(id) {
    return axiosClient.delete(`${url}/${id}`);
  }
};

export default shipperService;
