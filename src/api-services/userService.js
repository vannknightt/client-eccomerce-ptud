import axiosClient from "./axiosClient";

// const url = "https://ptud-dotnet-server.herokuapp.com/api/User";
const url = "https://localhost:5001/api/User";
const userService = {
  login(payload) {
    return axiosClient.post(`${url}/Login`, { Username: payload.username, Password: payload.password});
  }
};

export default userService;
