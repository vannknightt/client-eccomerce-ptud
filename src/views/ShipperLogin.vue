<template>
  <div class="mt-50">
    <a-form-model
      :model="form"
      ref="shipperLogin"
      :rules="rules"
      :label-col="{ span: 2 }"
      :wrapper-col="{ span: 22 }"
      label-align="left"
    >
      <a-form-model-item label="Username" prop="username">
        <a-input v-model="form.username" />
      </a-form-model-item>
      <a-form-model-item label="Password" prop="password">
        <a-input-password allow-clear v-model="form.password" />
      </a-form-model-item>
    </a-form-model>
    <div class="submit">
      <div class="create-shipper">
        <a-button type="primary" :block="true" @click="submitForm">
          Login
        </a-button>
      </div>
    </div>
  </div>
</template>
<script>
import userService from "../api-services/userService.js";
import { mapMutations } from "vuex";
import { cloneDeep } from "loadsh";
export default {
  name: "ShipperLogin",
  data: () => ({
    form: {
      username: "",
      password: ""
    },

    rules: {
      username: [
        { required: true, message: "This field is required", trigger: "blur" }
      ],
      password: [
        { required: true, message: "This field is required", trigger: "blur" }
      ]
    }
  }),
  methods: {
    ...mapMutations("shipper", ["setLoading"]),

    submitForm() {
      this.$refs["shipperLogin"].validate(async valid => {
        if (!valid) {
          return;
        }
        this.setLoading(true);
        const payload = cloneDeep(this.form);
        try {
          const rs = await userService.login(payload);

          this.setLoading(false);
          let type = "success";
          let msg = "Login successfully";
          if (!rs) {
            type = "error";
            msg = "Login failed";
          }
          this.$message[type](msg, 3);
          localStorage.removeItem("shipperId");
          localStorage.setItem("shipperId", rs);
          localStorage.setItem("accountType", "shipper");
          window.location.href = '/order/all'
          // this.$router.push({ name: "OrderByShipper" });
        } catch (error) {
          this.setLoading(false);
        }
      });
    }
  }
};
</script>
<style>
.mt-50 {
  margin-top: 50px;
}
</style>
