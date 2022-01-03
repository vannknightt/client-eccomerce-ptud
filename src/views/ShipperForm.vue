<template>
  <div class="register-shipper-container">
    <div class="form-container">
      <a-form-model
        :model="form"
        ref="shipperForm"
        :rules="rules"
        v-bind="formLayout"
      >
        <a-form-model-item prop="avatar">
          <div class="avatar">
            <div
              class="thumb image-circle"
              v-bind:style="{
                backgroundImage: 'url(' + getAvatar + ')',
                width: 180 + 'px',
                height: 180 + 'px'
              }"
            ></div>
            <input
              v-show="false"
              ref="inputImage"
              @change="handleChangeFile"
              type="file"
            />
            <a-button
              type="default"
              @click="handleChangeImage('avatar')"
              icon="cloud-upload"
              :loading="isUploadImage"
            >
              Upload avatar
            </a-button>
            <a-input v-model="form.avatar" v-show="false" />
          </div>
        </a-form-model-item>
        <a-form-model-item label="Name" prop="name">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item label="Phone" prop="phone">
          <a-input v-model="form.phone" />
        </a-form-model-item>
        <a-form-model-item label="Address" prop="address">
          <a-input v-model="form.address" />
        </a-form-model-item>
        <a-form-model-item label="Identify" prop="identify">
          <a-input v-model="form.identify" />
        </a-form-model-item>
        <a-form-model-item label="Negative certification" prop="negative_cert">
          <a-input v-model="form.negative_cert" v-show="false" />
          <input
            v-show="false"
            ref="inputNegativeCert"
            @change="handleChangeFile"
            type="file"
          />
          <div
            v-if="getNegativeCert"
            class="thumb"
            v-bind:style="{
              backgroundImage: 'url(' + getNegativeCert + ')',
              width: 300 + 'px',
              height: 300 + 'px'
            }"
          ></div>

          <a-button
            type="default"
            @click="handleChangeImage('negative')"
            icon="cloud-upload"
            :loading="isUploadImage"
          >
            Upload certification
          </a-button>
        </a-form-model-item>
        <a-form-model-item label="Vaccine certification" prop="vaccine_cert">
          <a-input v-model="form.vaccine_cert" v-show="false" />
          <input
            v-show="false"
            ref="inputVaccineCert"
            @change="handleChangeFile"
            type="file"
          />
          <div
            v-if="getVaccineCert"
            class="thumb"
            v-bind:style="{
              backgroundImage: 'url(' + getVaccineCert + ')',
              width: 300 + 'px',
              height: 300 + 'px'
            }"
          ></div>

          <a-button
            type="default"
            @click="handleChangeImage('vaccine')"
            icon="cloud-upload"
            :loading="isUploadImage"
          >
            Upload certification
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>

    <!-- <div class="submit"><button class="full-width">Submit</button></div> -->
    <div class="submit">
      <div class="edit-shipper" v-if="isEditPage">
        <a-button type="default" @click="cancelEditForm">
          Cancel
        </a-button>
        <a-button type="primary" @click="submitForm">
          Save
        </a-button>
      </div>
      <div class="create-shipper" v-else>
        <a-button type="primary" :block="true" @click="submitForm">
          Register to become shipper
        </a-button>
      </div>
    </div>
  </div>
</template>
<script>
import uploadService from "../api-services/uploadService.js";
import { mapMutations } from "vuex";
import { cloneDeep } from "loadsh";
import shipperService from "../api-services/shipperService.js";
export default {
  name: "RegisterShipper",
  data: () => ({
    defaultForm: {
      id: "",
      name: "",
      avatar: "",
      phone: "",
      address: "",
      negative_cert: "",
      vaccine_cert: "",
      identify: ""
    },
    form: {},
    originForm: {},
    formLayout: {
      labelCol: { span: 4 },
      wrapperCol: { span: 24 },
      labelAlign: "left"
    },
    type: "",
    rules: {
      name: [
        { required: true, message: "This field is required", trigger: "blur" }
      ],
      phone: [
        { required: true, message: "This field is required", trigger: "blur" }
      ],
      address: [
        { required: true, message: "This field is required", trigger: "blur" }
      ],
      avatar: [
        { required: true, message: "This field is required", trigger: "change" }
      ],
      negative_cert: [
        { required: true, message: "This field is required", trigger: "change" }
      ],
      vaccine_cert: [
        { required: true, message: "This field is required", trigger: "change" }
      ],
      identify: [
        { required: true, message: "This field is required", trigger: "blur" }
      ]
    },
    isEditPage: false,
    shipperId: null,
    isUploadImage: false
  }),
  computed: {
    defaultAvatar() {
      return require("../assets/avatar-default.svg");
    },
    getAvatar() {
      if (!this.form.avatar) {
        return this.defaultAvatar;
      }
      return this.form.avatar;
    },
    getNegativeCert() {
      if (!this.form.negative_cert) {
        return "";
      }
      return this.form.negative_cert;
    },
    getVaccineCert() {
      if (!this.form.vaccine_cert) {
        return "";
      }
      return this.form.vaccine_cert;
    }
  },
  methods: {
    handleBlur() {},

    handleChangeImage(type) {
      switch (type) {
        case "avatar":
          this.type = "avatar";
          this.$refs.inputImage.value = null;
          this.$refs.inputImage.click();
          break;
        case "negative":
          this.type = "negative";
          this.$refs.inputNegativeCert.value = null;
          this.$refs.inputNegativeCert.click();
          break;
        case "vaccine":
          this.type = "vaccine";
          this.$refs.inputVaccineCert.value = null;
          this.$refs.inputVaccineCert.click();
          break;
        default:
          this.type = "avatar";
          break;
      }
    },
    async handleChangeFile(event) {
      if (event.target.files.length === 0) {
        return;
      }
      this.isUploadImage = true;
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      const rs = await uploadService.uploadToServer(formData);
      if (!rs || !rs.success) {
        this.isUploadImage = false;

        return;
      }
      switch (this.type) {
        case "avatar":
          this.form.avatar = rs.data.path;
          break;
        case "negative":
          this.form.negative_cert = rs.data.path;
          break;
        case "vaccine":
          this.form.vaccine_cert = rs.data.path;
          break;
        default:
          break;
      }
      this.isUploadImage = false;
    },
    submitForm() {
      this.$refs["shipperForm"].validate(async valid => {
        if (!valid) {
          return;
        }
        this.setLoading(true);
        const payload = cloneDeep(this.form);
        delete payload.id;
        try {
          let rs;
          if (this.isEditPage) {
            rs = await shipperService.update(this.shipperId, payload);
          } else {
            rs = await shipperService.create(payload);
          }
          this.setLoading(false);
          let type = "success";
          let msg = "Register successfully";
          if (!rs) {
            type = "error";
            msg = "Register failed";
          }
          this.$message[type](msg, 3);
          this.$router.push({ name: "ShipperDetail", params: { id: rs._id } });
        } catch (error) {
          this.setLoading(false);
        }
      });
    },
    ...mapMutations("shipper", ["setLoading"]),
    async initData() {
    
      this.setLoading(true);
      let type = "error";
      let msg = "Load data fail";
      this.shipperId = this.$route.params.id;
      if (!this.shipperId) {
        this.$message[type](msg, 3);
        this.setLoading(false);

        return;
      }

      const rs = await shipperService.getDetail(this.shipperId);
      if (!rs) {
        this.$message[type](msg, 3);
        this.setLoading(false);

        return;
      }

      this.originForm = cloneDeep(rs);
      this.form = cloneDeep(rs);
      this.setLoading(false);
    },
    cancelEditForm() {
      this.form = cloneDeep(this.originForm);
    }
  },
  async mounted() {
    this.form = cloneDeep(this.defaultForm);
    if (this.$route.name !== "ShipperDetail") {
      return;
    }
    this.isEditPage = true;
    await this.initData();
  }
};
</script>
<style scoped>
.register-shipper-container {
  display: flex;
  flex-direction: column;

  margin: 40px;
}
.form-input {
  display: flex;
  flex-direction: column;

  margin: 16px 0;
}

.avatar {
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.form {
  flex-grow: 4;
}

.button-upload {
  max-width: 160px;
}
.full-width {
  width: 100%;
  height: 40px;
}
</style>
