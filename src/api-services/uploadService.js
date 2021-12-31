import axiosClient from "./axiosClient";

const url =
  "https://d2h-backend-server.herokuapp.com/api/upload/cloudinary-upload";
const uploadService = {
  uploadToServer(fileToUpload) {
    return axiosClient.post(url, fileToUpload);
  },
};

export default uploadService;
