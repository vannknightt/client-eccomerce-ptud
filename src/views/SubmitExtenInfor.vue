<template>
  <div class="register-shipper-container">
    <div class="form-container">
      <form @submit.prevent="SubmitData">
        <h1>Cập nhật thông tin sức khỏe mỗi ngày</h1>
        <label>Nhiệt độ cơ thể</label>
        <input
          type="text"
          name="temp"
          v-model="infor.temp"
          placeholder="độ C"
        />
        <br />
        <br />
        <label>Tình trạng sức khỏe</label>
        <input
          type="text"
          name="status"
          v-model="infor.status"
          placeholder="sức khỏe của bạn hôm nay"
        />
        <br />
        <br />
        <div class="submit">
          <button type="submit" class="full-width">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import ExtenInforService from "../api-services/ExtenInforService.js";
export default {
  name: "SubmitExtenInfor",
  data() {
    return {
      infor: {
        id: "61b0ce85536c31dd0b778980",
        shipper_id: "61b0ce9e536c31dd0b778972",
        temp: "",
        status: "",
        rating: "",
      },
    };
  },
  methods: {
    SubmitData() {
      ExtenInforService.create(this.infor)
      console.log(this.infor);
    },
  },
};
</script>
<style>
input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>
