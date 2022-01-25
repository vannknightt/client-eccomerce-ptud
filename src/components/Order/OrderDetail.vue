<template>
  <div>
    <link
      href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      rel="stylesheet"
      id="bootstrap-css"
    />
    <navbar :pass_carts_length="cart_length" />

    <br />
    <h3 align="left">Trạng thái đơn hàng</h3>

    <div class="container">
      <article class="card">
        <div class="card-body">
          <h6>Mã đơn hàng: {{ order.id }}</h6>
          <article class="card">
            <div class="card-body row">
              <div class="col">
                <strong>Đơn hàng được khởi tạo</strong> <br />
                <p>{{ order.created_at }}</p>
              </div>
              <div class="col">
                <strong>Đã xác nhận bởi cửa hàng</strong> <br />
              </div>
              <div class="col"><strong>Đã giao cho shipper</strong> <br /></div>
              <div class="col">
                <strong>Giao hàng thành công</strong> <br />
              </div>

              <div v-if="getStatus() - 1 == -1" class="col">
                <strong></strong> <br />
              </div>
            </div>
          </article>
          <div class="track">
            <div class="step active" v-for="n in getStatus()" :key="n">
              <span class="icon"> <i class="fa fa-check"></i> </span>
            </div>

            <div class="step noactive" v-for="n in 4 - getStatus()" :key="n">
              <span class="icon"> <i class="fa fa-check"></i> </span>
            </div>

            <div v-if="getStatus() - 1 == -1" class="step active">
              <span class="icon"> <i class="fa fa-truck"></i> </span>
              <span class="text"> Đơn hàng đã bị hủy </span>
            </div>
          </div>
        </div>
      </article>
    </div>
    <br />
    <h3 align="left">Chi tiết đơn hàng</h3>

    <b-row>
      <b-col md="12">
        <div class="table-responsive">
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
            <tbody>
              <td>
                <p>Cửa hàng {{ order.shop_id }}</p>
              </td>
              <tr v-for="detail in order.order_detail" :key="detail.productID">
                <td>
                  <img :src="detail.imagePath" />
                </td>
                <td>{{ detail.name }}</td>
                <td>₫{{ detail.price.toLocaleString() }}</td>
                <td>
                  <input type="text" :value="detail.quantity" readonly />
                </td>
                <td style="color: red">
                  ₫{{ (detail.quantity * detail.price).toLocaleString() }}
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <div style="float: right">
            <th>Giá vận chuyển : ₫{{ order.shipper_fee.toLocaleString() }}</th>
          </div>
          <br />
          <br />
          <div style="float: right">
            <th>Tổng Tiền : ₫{{ order.total.toLocaleString() }}</th>
          </div>

          <br />
          <br />

          <div v-if="getStatus() - 1 == 0">
            <b-button variant="danger" @click="cancelOrder()"
              >Hủy đơn hàng</b-button
            >
          </div>

          <div v-if="getStatus() - 1 > 0 || getStatus() - 1 == -1">
            <b-button variant="danger" disabled>Hủy đơn hàng</b-button>
          </div>

          <br />
          <router-link :to="{ name: 'OrderList' }">
            <button class="btn btn-success" data-abc="true">
              <i class="fa fa-chevron-left"></i> Quay về danh sách đơn hàng
            </button>
          </router-link>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<style scoped>
img {
  border-radius: 20px 20px 0 0;
  height: 100px;
  width: 100px;
}
@import url("https://fonts.googleapis.com/css?family=Open+Sans&display=swap");

body {
  background-color: #eeeeee;
  font-family: "Open Sans", serif;
}

.container {
  margin-top: 50px;
  margin-bottom: 50px;
}

.card {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.1rem;
}

.card-header:first-child {
  border-radius: calc(0.37rem - 1px) calc(0.37rem - 1px) 0 0;
}

.card-header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.track {
  position: relative;
  background-color: #ddd;
  height: 7px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 60px;
  margin-top: 50px;
}

.track .step {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  width: 25%;
  margin-top: -18px;
  text-align: center;
  position: relative;
}

.track .step.active:before {
  background: #ff5722;
}

.track .step::before {
  height: 7px;
  position: absolute;
  content: "";
  width: 100%;
  left: 0;
  top: 18px;
}

.track .step.active .icon {
  background: #ee5435;
  color: #fff;
}

.track .icon {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  position: relative;
  border-radius: 100%;
  background: #ddd;
}

.track .step.active .text {
  font-weight: 400;
  color: #000;
}

.track .text {
  display: block;
  margin-top: 7px;
}

.itemside {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
}

.itemside .aside {
  position: relative;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}

.img-sm {
  width: 80px;
  height: 80px;
  padding: 7px;
}

ul.row,
ul.row-sm {
  list-style: none;
  padding: 0;
}

.itemside .info {
  padding-left: 15px;
  padding-right: 7px;
}

.itemside .title {
  display: block;
  margin-bottom: 5px;
  color: #212529;
}

p {
  margin-top: 0;
  margin-bottom: 1rem;
}

.btn-warning {
  color: #ffffff;
  background-color: #ee5435;
  border-color: #ee5435;
  border-radius: 1px;
}

.btn-warning:hover {
  color: #ffffff;
  background-color: #ff2b00;
  border-color: #ff2b00;
  border-radius: 1px;
}
</style>


<script>
import OrderService from "@/api-services/cusOrderService";
import CartService from "@/api-services/CartService";
import Navbar from "@/components/Navbar";

export default {
  name: "OrderDetail",
  components: {
    Navbar,
  },

  data() {
    return {
      id: "",
      order: [],
      cart_length: 0,
      order_status: 0,
    };
  },

  mounted() {
    this.id = this.$route.params.id;
    OrderService.getOrderId(this.id).then((response) => {
      this.order = response.data;
      console.log(JSON.stringify(this.order));
    });
    CartService.getCart().then((response) => {
      this.cart_length = response.data.length;
      //   console.log(this.cart_length);
    });
  },

  methods: {
    getStatus() {
      return this.order.status + 1;
    },
    cancelOrder() {
      OrderService.updateOrderStatus(this.id, -1).then((response) => {
        this.order = response.data;
        console.log(JSON.stringify(this.order));
        window.location.reload();
      });
    },
  },
};
</script>

