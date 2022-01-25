import axiosClient from "./axiosClient";
import { cloneDeep } from "loadsh";
const url = "https://ptud-dotnet-server.herokuapp.com/api/Shipper";
const javaUrl = "https://ptud-java-server.herokuapp.com/api/shipper";
const shipperId = localStorage.getItem("shipperId").replace("str", "");

const shipperService = {
  create(payload) {
    const clone = cloneDeep(payload);
    delete clone.username;
    delete clone.password;
    const data = {
      username: payload.username,
      password: payload.password,
      type: "shipper",
      shipper: clone
    };
    return axiosClient.post(url, data);
  },
  update(id, payload) {
    return axiosClient.put(`${url}/${id}`, payload);
  },
  getAll() {
    return axiosClient.get(url);
  },
  getDetail() {
    return axiosClient.get(`${url}/${shipperId}`);
  },
  delete(id) {
    return axiosClient.delete(`${url}/${id}`);
  },
  getIncome(date) {
    return axiosClient.get(
      `${javaUrl}/${shipperId}/salary/month/${date.getMonth() +
        1}/year/${date.getFullYear()}`
    );
  }
};

export default shipperService;
