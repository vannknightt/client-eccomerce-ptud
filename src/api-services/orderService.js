import axiosClient from "./axiosClient";

const url = "https://localhost:5001/api/Order";
// const url = "https://ptud-dotnet-server.herokuapp.com/api/Order";
const shipperService = {
  create(payload) {
    return axiosClient.post(`${url}/Create`, payload);
  },
  update(id, payload) {
    return axiosClient.put(`${url}/Update/${id}`, payload);
  },
  getAll(payload) {
    return axiosClient.post(`${url}/GetAll`, payload);
  },
  getDetail(id) {
    return axiosClient.get(`${url}/GetDetail/${id}`);
  },
  delete(id) {
    return axiosClient.delete(`${url}/Delete/${id}`);
  },
  updateStatus(id, status) {
    return axiosClient.put(`${url}/UpdateStatus?id=${id}&status=${status}`)
  },
};

export default shipperService;
