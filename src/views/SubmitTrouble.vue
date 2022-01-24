<template>
  <div class="register-shipper-container">
    <div class="form-container">
      <form @submit.prevent="SubmitData">
        <h1>Báo cáo sự cố</h1>
        <label>Order_id</label>
        <input
          type="text"
          name="order_id"
          v-model="trouble.order_id"
          placeholder="Mã đơn"
        />
        <br />
        <br />
        <label>Description</label>
        <input
          type="text"
          name="description"
          v-model="trouble.description"
          placeholder="Mô tả sự cố"
        />
        <div class="form-input">
          <label>Gửi hình ảnh sự cố</label>
          <input
            v-show="false"
            ref="inputPicture"
            @change="handleChangeFile"
            type="file"
          />
          <div
            v-if="getPicture"
            class="thumb"
            v-bind:style="{
              backgroundImage: 'url(' + getPicture + ')',
              width: 300 + 'px',
              height: 300 + 'px',
            }"
          ></div>
          <button class="button-upload" @click="handleChangeImage('picture')">
            Gửi hình ảnh sự cố
          </button>
        </div>
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
import uploadService from "../api-services/uploadService.js";
import TroubleService from "../api-services/TroubleService.js";
import ExtenInforService from "../api-services/ExtenInforService.js";
export default {
  name: "SubmitTrouble",
  data() {
    return {
      trouble: {
        id: "61b0ce85536c31dd0b778980",
        order_id: "",
        shipper_id: "61b0ce9e536c31dd0b778972",
        created_at: "2019-12-31T17:00:00.000+00:00",
        updated_at: "2020-12-31T17:00:00.000+00:00",
        description: "",
        status: 1,
        picture: "",

        type:"",
      },
    };
  },
  computed: {
    getPicture() {
      if (!this.picture) {
        return "";
      }
      return this.picture;
    },
  },
  methods: {
    SubmitData() {
      TroubleService.create(this.trouble);
      console.log(this.trouble);
    },
    handleBlur() {},

    handleChangeImage(type) {
      switch (type) {
        case "picture":
          this.type = "picture";
          this.$refs.inputPicture.value = null;
          this.$refs.inputPicture.click();
          break;

        default:
          this.type = "avatar";
          break;
      }
    },
    async handleChangeFile(event) {
      console.log(event.target.files);
      if (event.target.files.length === 0) {
        return;
      }
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      const rs = await uploadService.uploadToServer(formData);
      if (!rs || !rs.success) {
        return;
      }
      switch (this.type) {
        case "picture":
          this.picture = rs.data.path;
          break;
        default:
          break;
      }
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
