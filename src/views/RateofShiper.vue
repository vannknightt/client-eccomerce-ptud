<template>
  <div class="register-shipper-container">
    <div class="form-container">
      <form @submit.prevent="SubmitData">
        <h1>Kiểm tra đánh giá của khách hàng với shipper</h1>
        <label>ID của shipper cần xem</label>
        <input
          type="text"
          name="temp"
          v-model="infor.shipper_id"
          placeholder="id của shipper"
        />
        <div class="submit">
          <button type="submit" class="full-width">Xem đánh giá</button>
        </div>
      </form>
    </div>
    <label for="w3review">Các đánh giá của khách hàng</label>

  <table class="table table-hover table-striped">
            <thead>
                <th>Rating</th>
            </thead>
            <tbody>
                <tr v-for="shipper in infor" :key="shipper.rating">
                    <td>{{shipper.rating}}</td>

                </tr>
            </tbody>
        </table>
  </div>
</template>
<script>
import ExtenInforService from "../api-services/ExtenInforService.js";
export default {
  name: "SubmitExtenInfor",
  data() {
    return {
      infor:[],
    };
  },
  methods: {
    SubmitData() {
     this.infor = ExtenInforService.get(this.infor.shipper_id)
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
