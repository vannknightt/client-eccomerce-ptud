<template>
  <a-table :columns="columns" :data-source="orders" :scroll="{x: 100 + '%'}">
    <span slot="status" slot-scope="status">
      <a-tag :color="getStatusColor(status)">
        {{ getStatusLabel(status) }}
      </a-tag>
    </span>
    <span slot="action" slot-scope="text, record">
      <a-button @click="handleViewDetail(record)" type="primary">View</a-button>
    </span>
  </a-table>
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
    shipperId: ""
  }),
  methods: {
    ...mapMutations("shipper", ["setLoading"]),

    async initData() {
      this.shipperId = this.$route.params.shipperId;
      if (!this.shipperId) {
        return;
      }
      this.setLoading(true);
      const rs = await orderService.getAll({ shipper_id: this.shipperId });
      if (!rs) {
        this.setLoading(false);
        return;
      }

      this.orders = cloneDeep(rs);
      this.orders.forEach(o => {
        o.key = o._id;
        o.created_at = format(new Date(o.created_at), "dd/MM/yyyy HH:mm");
      });
      this.setLoading(false);
    },
    getStatusColor(status) {
      switch (status) {
        case -2:
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
        case -2:
          return "Shipper Cancel";
        case 2:
          return "Shipping";
        case 3:
          return "Ship success";
        default:
          break;
      }
    },
    handleViewDetail(rec) {
      this.$router.push({name: 'OrderDetail', params: {id: rec._id}})
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
</style>
