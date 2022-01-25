import axiosClient from "./axiosClient";

const url = "https://localhost:5001/api/Order";
// const url = "https://ptud-dotnet-server.herokuapp.com/api/Order";
const javaUrl = "https://ptud-java-server.herokuapp.com/api/order";
const shipperId = localStorage.getItem("shipperId").replace("str", "");
const shipperService = {
  create(payload) {
    return axiosClient.post(`${url}/Create`, payload);
  },
  update(id, payload) {
    return axiosClient.put(`${url}/Update/${id}`, payload);
  },
  getAll() {
    return axiosClient.post(`${url}/GetAll`, { shipper_id: shipperId });
  },
  getDetail(id) {
    return axiosClient.get(`${url}/GetDetail/${id}`);
  },
  delete(id) {
    return axiosClient.delete(`${url}/Delete/${id}`);
  },
  updateStatus(id, status) {
    return axiosClient.put(`${url}/UpdateStatus?id=${id}&status=${status}`);
  },
  javaUpdateStatus(id, status) {
    return axiosClient.post(`${javaUrl}/${id}/status/${status}`);
  },
  getOTP(phone) {
    return axiosClient.post(`${url}/GetOTP`, { phone: phone });
  },
  verifyOTP(id, otp) {
    return axiosClient.post(`${url}/VerifyOTP`, { id: id, otp: otp });
  }
};

export default shipperService;
