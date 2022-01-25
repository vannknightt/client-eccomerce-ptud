<template>
  <div class="register-shipper-container">
    <div class="form-container">
      <form @submit.prevent="SubmitData">
        <h1>Đánh giá shipper</h1>
        <label>ID của shipper</label>
        <input
          type="text"
          name="temp"
          v-model="infor.shipper_id"
          placeholder="id của shipper"
        />
        <br />
        <br />
        <label>Đánh giá của bạn</label>
        <input
          type="text"
          name="rating"
          v-model="infor.rating"
          placeholder="Đánh giá của bạn về shipper"
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
        shipper_id: "",
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
