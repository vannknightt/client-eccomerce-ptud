<template>
  <a-table :columns="columns" :data-source="orders">
    <span slot="status" slot-scope="status">
      <a-tag :color="getStatusColor(status)">
        {{getStatusLabel(status)}}
      </a-tag>
    </span>
  </a-table>
</template>

<script>
import orderService from "@/api-services/orderService";
import { cloneDeep } from "loadsh";
import { format } from "date-fns";
export default {
  name: "Order",
  data: () => ({
    columns: [
      {
        title: "ID",
        dataIndex: "_id",
        key: "id"
      },
      {
        title: "Shop",
        dataIndex: "shop_name",
        key: "shop_name"
      },
      {
        title: "Customer",
        dataIndex: "cus_name",
        key: "customer_name"
      },
      {
        title: "Shiping info",
        dataIndex: "ship_info",
        key: "ship_info"
      },
      {
        title: "Product's total cost",
        dataIndex: "total",
        key: "total"
      },
      {
        title: "Shipper fee",
        dataIndex: "shipper_fee",
        key: "shipper_fee"
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        scopedSlots: { customRender: "status" }
      },
      {
        title: "Created",
        dataIndex: "created_at",
        key: "created_at"
      }
    ],
    orders: [],
    shipperId: ""
  }),
  methods: {
    async initData() {
      this.shipperId = this.$route.params.shipperId;
      if (!this.shipperId) {
        return;
      }

      const rs = await orderService.getAll({ shipper_id: this.shipperId });
      if (!rs) {
        return;
      }

      this.orders = cloneDeep(rs);
      this.orders.forEach(o => {
        o.key = o._id;
        o.created_at = format(new Date(o.created_at), "dd/MM/yyyy HH:mm");
      });
    },
    getStatusColor(status) {

        switch (status) {
            case -2:
                return 'red'
            case 2:
                return 'blue'
            case 3:
                return 'green'
            default:
                break;
        }
    },
    getStatusLabel(status) {
        switch (status) {
            case -2:
                return 'Shipper Cancel'
            case 2:
                return 'Shipping'
            case 3:
                return 'Ship success'
            default:
                break;
        }
    },
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
