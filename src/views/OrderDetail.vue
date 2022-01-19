<template>
  <div>
    <a-row class="row-content back">
      <a-button type="primary" class="align-item-center" @click="backToList">
        <a-icon type="left" />Back
      </a-button>
    </a-row>
    <a-row class="row-content">
      <a-col :span="12">
        <a-row>
          <a-col :span="24" class="label align-items-center">
            <span>
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
          <a-col :span="24" class="content">{{
            formatTime(order.created_at)
          }}</a-col>
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
  </div>
</template>

<script>
import orderService from "@/api-services/orderService";
import shopService from "@/api-services/shopService";
import { cloneDeep } from "loadsh";
import { format } from "date-fns";
import { mapMutations } from "vuex";
export default {
  name: "Order",
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
        scopedSlots: { customRender: "Multiply" },
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
        scopedSlots: { customRender: "Equal" },
      },
      {
        title: "Total",
        dataIndex: "total",
        key: "total",
        width: "200px"
      },
    ]
  }),
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
        c.total = `${(c.price*c.quantity).toFixed(2)} VND`
      })
      this.setLoading(false);
    },
    getStatusColor(status) {
      switch (status) {
        case -2:
        case -3:
          return "red";
        case 2:
          return "blue";
        case 3:
          return "green";
        default:
          break;
      }
    },
    getStatusLabel(status) {
      switch (status) {
        case -3:
          return "Customer cancel"
        case -2:
          return "Shipper cancel";
        case 2:
          return "Shipping";
        case 3:
          return "Ship success";
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
      const rs = await orderService.updateStatus(id, status);
      if (!rs) {
        this.setLoading(false);
        return;
      }
      this.initData();
      this.setLoading(false);
    }
  },
  mounted() {
    this.initData();
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
}

.content {
  text-align: left;
  font-weight: 400;
  font-size: 14px;

  margin-left: 8px;
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
