<template>
  <div>
    <a-row class="row-content back">
      <a-button type="primary" class="align-item-center" @click="backToList">
        <a-icon type="left" />Back
      </a-button>
    </a-row>
    <a-row class="row-content">
      <vue-qr :text="urlQr" :size="150"></vue-qr>
    </a-row>
    <a-row class="row-content">
      <a-col :span="12">
        <a-row>
          <a-col :span="24" class="label align-items-center">
            <span :style="{ marginRight: 16 + 'px' }">
              Order Id
            </span>
            <a-tag :color="getStatusColor(order.status)">
              {{ getStatusLabel(order.status) }}
            </a-tag>
          </a-col>
          <a-col :span="24" class="content">{{ order._id }}</a-col>
        </a-row>
      </a-col>
      <a-col :span="12">
        <a-row>
          <a-col :span="24" class="label">Ship info</a-col>
          <a-col :span="24" class="content">{{ order.ship_info }}</a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row class="row-content">
      <a-col :span="12">
        <a-row>
          <a-col :span="24" class="label">Customer name</a-col>
          <a-col :span="24" class="content">{{ order.cus_name }}</a-col>
        </a-row>
      </a-col>
      <a-col :span="12">
        <a-row>
          <a-col :span="24" class="label">Store name</a-col>
          <a-col :span="24" class="content">
            <span class="margin-r-16">{{ order.shop_name }}</span>
            <a-popover v-model="visible" title="Shop info" trigger="click">
              <div slot="content" class="w-300">
                <a-row :style="{ marginBottom: 24 + 'px' }">
                  <a-col :span="12">
                    <a-row class="label">Shop Name</a-row>
                    <a-row class="content">{{ shop.name }}</a-row>
                  </a-col>
                  <a-col :span="12">
                    <a-row class="label">Phone</a-row>
                    <a-row class="content">{{ shop.phone }}</a-row>
                  </a-col>
                </a-row>
                <a-row class="label">Address</a-row>
                <a-row class="content">{{ shop.address }}</a-row>
              </div>
              <a-button type="link" @click="viewShop">View shop</a-button>
            </a-popover>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row>
      <a-divider type="horizontal" />
    </a-row>
    <a-row>
      <a-table
        :columns="orderDetailCols"
        :data-source="order.order_detail"
        :scroll="{ x: 100 + '%' }"
      >
        <span slot="imagePath" slot-scope="imagePath">
          <img :src="imagePath" width="50px" height="50px" />
        </span>
        <span slot="Multiply">✖</span>
        <span slot="Equal"> = </span>
      </a-table>
    </a-row>
    <a-row>
      <a-divider type="horizontal" />
    </a-row>
    <a-row class="row-content">
      <a-col :span="12">
        <a-row>
          <a-col :span="24" class="label">Cost</a-col>
          <a-col :span="24" class="content">{{
            order.total - order.shipper_fee
          }}</a-col>
        </a-row>
      </a-col>
      <a-col :span="12">
        <a-row>
          <a-col :span="24" class="label">Shipper fee</a-col>
          <a-col :span="24" class="content">{{ order.shipper_fee }}</a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row class="row-content">
      <a-col :span="12">
        <a-row>
          <a-col :span="24" class="label">Order date</a-col>
          <a-col :span="24" class="content">{{ order.created_at }}</a-col>
        </a-row>
      </a-col>
      <a-col :span="12">
        <a-row>
          <a-col :span="24" class="label">Total</a-col>
          <a-col :span="24" class="content">{{ order.total }}</a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row class="row-content action">
      <a-col :span="12" class="padding-16">
        <a-button
          type="danger"
          block
          :disabled="order.status !== 2"
          @click="updateStatus(-3)"
          >Customer cancel</a-button
        >
      </a-col>
      <a-col :span="12" class="padding-16">
        <a-button
          type="primary"
          block
          :disabled="order.status !== 2"
          @click="updateStatus(3)"
          >Finish</a-button
        >
      </a-col>
    </a-row>

    <a-modal
      v-model="visibleReceive"
      title=" Are you sure to confirm receiving goods?"
      @ok="handleConfirm"
      @cancel="handleCancel"
      :okText="okText"
      :cancelText="cancelText"
      :ok-button-props="{ props: { loading: isLoading } }"
      :cancel-button-props="{ props: { loading: isLoading } }"
      :maskClosable="false"
      :closable="false"
    >
      <a-form-model
        :model="form"
        ref="otpForm"
        :rules="rules"
        v-if="!getOTPSuccess"
      >
        <a-form-model-item label="Phone to get OTP" prop="phone">
          <a-input v-model="form.phone" />
        </a-form-model-item>
      </a-form-model>
      <a-form-model :model="formOTP" ref="confirmForm" :rules="otpRules" v-else>
        <a-form-model-item label="Enter OTP" prop="otp">
          <a-input v-model="formOTP.otp" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import orderService from "@/api-services/orderService";
import shopService from "@/api-services/shopService";
import { cloneDeep } from "loadsh";
import { format } from "date-fns";
import { mapMutations } from "vuex";
import VueQr from "vue-qr";

export default {
  name: "Order",
  components: { VueQr },
  data: () => ({
    order: {},
    shop: {},
    visible: false,
    orderDetailCols: [
      {
        title: "Image",
        dataIndex: "imagePath",
        key: "imagePath",
        scopedSlots: { customRender: "imagePath" },
        width: "150px"
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "200px"
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        width: "200px"
      },
      {
        title: "",
        dataIndex: "Multiply",
        key: "Multiply",
        width: "100px",
        scopedSlots: { customRender: "Multiply" }
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        width: "100px",
        align: "center"
      },
      {
        title: "",
        dataIndex: "Equal",
        key: "Equal",
        width: "50px",
        scopedSlots: { customRender: "Equal" }
      },
      {
        title: "Total",
        dataIndex: "total",
        key: "total",
        width: "200px"
      }
    ],
    visibleReceive: false,
    url: `https://ptud.vercel.app/order/id?action=confirm`,
    form: {
      phone: ""
    },
    rules: {
      phone: [
        { required: true, message: "This field is required", trigger: "blur" }
      ]
    },
    formOTP: {
      otp: ""
    },
    otpRules: {
      otp: [
        { required: true, message: "This field is required", trigger: "blur" }
      ]
    },
    getOTPSuccess: false,
    cusIDConfirm: "",
    isLoading: false
  }),
  computed: {
    urlQr() {
      return this.url.replace("id", this.$route.params.id);
    },
    okText() {
      if (!this.getOTPSuccess) {
        return "Get OTP";
      }

      return "Received successfully";
    },
    cancelText() {
      if (!this.getOTPSuccess) {
        return "Cancel";
      }

      return "Not Received goods";
    }
  },
  methods: {
    ...mapMutations("shipper", ["setLoading"]),

    async initData() {
      const id = this.$route.params.id;
      if (!id) {
        return;
      }
      this.setLoading(true);
      const rs = await orderService.getDetail(id);
      if (!rs) {
        this.setLoading(false);
        return;
      }

      this.order = cloneDeep(rs);
      this.order.order_detail.forEach(c => {
        c.total = `${(c.price * c.quantity).toFixed(2)} VND`;
      });
      this.setLoading(false);
    },
    getStatusColor(status) {
      switch (status) {
        case -2:
        case -3:
        case -4:
          return "red";
        case 2:
          return "yellow";
        case 3:
          return "blue";
        case 4:
          return "green";
        default:
          break;
      }
    },
    getStatusLabel(status) {
      switch (status) {
        case -3:
          return "Customer cancel";
        case -2:
          return "Shipper cancel";
        case 2:
          return "Shipping";
        case 3:
          return "Ship success";
        case 4:
          return "Customer confirm";
        default:
          break;
      }
    },
    formatTime(time) {
      return format(new Date(time), "dd/MM/yyyy HH:mm");
    },
    backToList() {
      this.$router.push({
        name: "OrderByShipper",
        params: { shipperId: this.order.shipper_id }
      });
    },
    async viewShop() {
      if (this.shop._id) {
        return;
      }
      this.setLoading(true);
      const rs = await shopService.getDetail(this.order.shop_id);
      if (!rs) {
        this.setLoading(false);
        return;
      }
      this.shop = rs;
      this.setLoading(false);
    },
    async updateStatus(status) {
      const id = this.$route.params.id;
      if (!id) {
        return;
      }
      this.setLoading(true);
      const rs = await orderService.javaUpdateStatus(id, status);
      if (!rs) {
        this.setLoading(false);
        return;
      }
      this.initData();
      this.setLoading(false);
    },
    async handleConfirm() {
      if (!this.getOTPSuccess) {
        this.$refs["otpForm"].validate(async valid => {
          if (!valid) {
            return;
          }
          this.isLoading = true;
          const rs = await orderService.getOTP(this.form.phone);
          if (!rs) {
            this.isLoading = false;
            return;
          }
          this.getOTPSuccess = !!rs;
          this.cusIDConfirm = rs;
          this.isLoading = false;
        });

        return;
      }

      this.$refs["confirmForm"].validate(async valid => {
        if (!valid) {
          return;
        }
        this.isLoading = true;
        const rs = await orderService.verifyOTP(
          this.cusIDConfirm,
          this.formOTP.otp
        );
        if (!rs) {
          this.isLoading = false;
          return;
        }

        try {
          const receiveRs = await orderService.javaUpdateStatus(
            this.order._id,
            4
          );
          this.$message["success"]("Confirm receive success", 3);

          this.isLoading = false;
          this.visibleReceive = false;
        } catch (err) {
          this.$message["error"]("Confirm receive failed", 3);
          this.isLoading = false;
        }
      });
    },
    handleCancel() {
      if (!this.getOTPSuccess) {
        this.visibleReceive = false;
        return;
      }

      this.$refs["confirmForm"].validate(async valid => {
        if (!valid) {
          return;
        }
        this.isLoading = true;
        const rs = await orderService.verifyOTP(
          this.cusIDConfirm,
          this.formOTP.otp
        );
        if (!rs) {
          this.isLoading = false;

          return;
        }

        try {
          const receiveRs = await orderService.javaUpdateStatus(
            this.order._id,
            -4
          );
          this.visibleReceive = false;
          this.$message["success"]("Confirm receive success", 3);

          this.isLoading = false;
        } catch (err) {
          this.isLoading = false;
          this.$message["error"]("Confirm receive failed", 3);
        }
      });
    }
  },
  mounted() {
    this.initData();
    const confirmReceive = this.$route.query.action === "confirm";
    if (confirmReceive) {
      this.visibleReceive = true;
    }
  }
};
</script>
<style>
th {
  font-weight: 700 !important;
}
.label {
  text-align: left;
  font-weight: bold;
  font-size: 16px;

  margin-bottom: 8px;

  display: flex;
  justify-content: center;
}

.content {
  text-align: left;
  font-weight: 400;
  font-size: 14px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.row-content {
  margin-bottom: 24px;
}

.align-item-center {
  display: flex;
  align-items: center;
}

.padding-16 {
  padding: 16px;
}

.margin-r-16 {
  margin-right: 16px;
}

.back {
  text-align: left;
}

.w-300 {
  width: 300px;
}
</style>
