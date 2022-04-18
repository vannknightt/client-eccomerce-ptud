<template>
  <div>
    <link
      href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      rel="stylesheet"
      id="bootstrap-css"
    />
    <navbar :pass_carts_length="cart_length" />

    <br />
    <h3 align="left">Danh sách đơn hàng</h3>

    <div class="row">
      <div class="table-responsive">
        <div v-for="order in orderList" v-bind:key="order.id">
          <b-card title="" header-tag="header" footer-tag="footer">
            <template #header>
              <div>
                <h6 class="mb-0" align="left">
                  <b>Mã đơn hàng {{ order.id }}</b>
                </h6>
                <h6 class="mb-0" align="right">
                  <b>Ngày đặt {{ order.created_at }}</b>
                </h6>
              </div>
            </template>

            <table class="table table-striped">
              <thead>
                <tr>
                  <th></th>
                  <th>Sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody v-if="order.order_detail && order.order_detail.length > 0">
                <td>
                  <img :src="order.order_detail[0].imagePath" />
                </td>
                <td>{{ order.order_detail[0].name }}</td>
                <td>₫{{ order.order_detail[0].price.toLocaleString() }}</td>
                <td>{{ order.order_detail[0].quantity }}</td>
                <td>
                  ₫{{
                    (
                      order.order_detail[0].price *
                      order.order_detail[0].quantity
                    ).toLocaleString()
                  }}
                </td>
              </tbody>
            </table>
            <div class="container">
              <div class="text-right">
                <router-link
                  :to="{ name: 'OrderDetail', params: { id: order.id } }"
                >
                  <b-button variant="primary">Xem chi tiết</b-button>
                </router-link>
              </div>
            </div>
            <template class="text-right" #footer>
              <h5 class="mb-0" align="right">
                Tổng tiền : ₫{{ order.total.toLocaleString() }}
              </h5>
            </template>
          </b-card>

          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  border-radius: 20px 20px 0 0;
  height: 100px;
  width: 100px;
}
</style>


<script>
import OrderService from "@/api-services/OrderService";
import CartService from "@/api-services/CartService";
import Navbar from "@/components/Navbar";

export default {
  name: "OrderList",
  components: {
    Navbar,
  },

  data() {
    return {
      orderList: [],
      cart_length: 0,
    };
  },

  created() {
    OrderService.getOrder().then((response) => {
      this.orderList = response.data;
      console.log("created order " + this.orderList);
    });

    CartService.getCart().then((response) => {
      this.cart_length = response.data.length;
      //   console.log(this.cart_length);
    });
  },
};
</script>

