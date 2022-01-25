<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="orders"
      :scroll="{ x: 100 + '%', y: 500 + 'px' }"
    >
      <span slot="status" slot-scope="status">
        <a-tag :color="getStatusColor(status)">
          {{ getStatusLabel(status) }}
        </a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <a-button @click="handleViewDetail(record)" type="primary"
          >View</a-button
        >
      </span>
    </a-table>
    <a-modal
      v-model="visible"
      title="You have new order"
      @ok="handleConfirm"
      @cancel="handleCancel"
      okText="Confirm"
      cancelText="Cancel"
      :ok-button-props="{ props: { loading: isLoading } }"
      :cancel-button-props="{ props: { loading: isLoading, type: 'danger' } }"
      :maskClosable="false"
      :closable="false"
    >
      <div v-if="newOrder.length > 0">
        Ship info: {{ newOrder[0].ship_info }} <br />
        Ship fee: {{ newOrder[0].shipper_fee }}
      </div>
    </a-modal>
  </div>
</template>

<script>
import orderService from "@/api-services/orderService";
import { cloneDeep } from "loadsh";
import { format } from "date-fns";
import { mapMutations } from "vuex";
export default {
  name: "Order",
  data: () => ({
    columns: [
      {
        title: "ID",
        dataIndex: "_id",
        key: "id",
        width: "300px"
      },
      {
        title: "Shop",
        dataIndex: "shop_name",
        key: "shop_name",
        width: "200px"
      },
      {
        title: "Customer",
        dataIndex: "cus_name",
        key: "customer_name",
        width: "200px"
      },
      {
        title: "Shiping info",
        dataIndex: "ship_info",
        key: "ship_info",
        width: "400px"
      },
      {
        title: "Product's total cost",
        dataIndex: "total",
        key: "total",
        width: "170px"
      },
      {
        title: "Shipper fee",
        dataIndex: "shipper_fee",
        key: "shipper_fee",
        width: "150px"
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        scopedSlots: { customRender: "status" },
        width: "150px"
      },
      {
        title: "Created",
        dataIndex: "created_at",
        key: "created_at",
        width: "200px"
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        scopedSlots: { customRender: "action" },
        width: "100px"
      }
    ],
    orders: [],
    shipperId: "",
    timmer: "",
    newOrder: [],
    visible: false,
    isLoading: false
  }),
  methods: {
    ...mapMutations("shipper", ["setLoading"]),

    async initData() {
      this.setLoading(true);
      const rs = await orderService.getAll();
      if (!rs) {
        this.setLoading(false);
        return;
      }

      this.orders = cloneDeep(rs);
      this.orders.forEach(o => {
        o.key = o._id;
      });
      this.newOrder = this.orders.filter(v => v.status == 1);
      if (this.newOrder.length > 0) {
        clearInterval(this.timmer);
        this.visible = true;
      }
      this.setLoading(false);
    },
    handleRefreshOrder() {
      this.timmer = setInterval(() => {
        this.initData();
      }, 5000);
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
        case -4:
          return "Customer not receive goods";
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
    handleViewDetail(rec) {
      this.$router.push({ name: "OrderDetail", params: { id: rec._id } });
    },
    async handleConfirm() {
      try {
        const orderId = this.newOrder[0]._id;
        const receiveRs = await orderService.javaUpdateStatus(orderId, 2);
        this.$message["success"]("Confirm success", 3);

        this.isLoading = false;
        this.visible = false;
        this.initData();
        this.handleRefreshOrder();
      } catch (err) {
        this.$message["error"]("Confirm failed", 3);
        this.isLoading = false;
      }
    },
    async handleCancel() {
      try {
        const orderId = this.newOrder[0]._id;
        const receiveRs = await orderService.javaUpdateStatus(orderId, -2);
        this.$message["success"]("Cancel success", 3);

        this.isLoading = false;
        this.visible = false;
        this.initData();
        this.handleRefreshOrder();
      } catch (err) {
        this.$message["error"]("Cancel failed", 3);
        this.isLoading = false;
      }
    }
  },
  mounted() {
    this.initData();
    this.handleRefreshOrder();
  },
  beforeDestroy() {
    clearInterval(this.timmer);
  }
};
</script>
<style>
th {
  font-weight: 700 !important;
}
</style>
