<template>
  <div>
    <link
      href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      rel="stylesheet"
      id="bootstrap-css"
    />
    <br />
    <h3 align="left">Xác nhận đơn hàng</h3>

    <b-row>
      <b-col md="12">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cartitem in carts" :key="cartitem.product.id">
                <td>
                  <p>Cửa hàng {{ cartitem.product.shop_id }}</p>
                </td>
                <td>
                  <img :src="cartitem.product.imagePath" />
                </td>
                <td>{{ cartitem.product.name }}</td>
                <td>₫{{ cartitem.product.price.toLocaleString() }}</td>
                <td>
                  <input type="text" :value="cartitem.quantity" readonly />
                </td>
                <td style="color: red">
                  ₫{{ calcPrice(cartitem.quantity, cartitem.product.price) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-col>
    </b-row>

    <br />
    <br />
    <h3 align="left">Địa chỉ giao hàng</h3>
    <br />

    <input
      type="text"
      size="100"
      placeholder="Enter your address"
      v-model="address"
    />

    <button class="btn btn-success" @click="locatorButtonPressed()">
      Lấy vị trí hiện tại
    </button>
    <br />
    <br />
    <h3 align="left">Chọn đơn vị vận chuyển</h3>
    <br />
    <button class="btn btn-success" @click="findShipper()">
      Tìm kiếm shipper
    </button>

    <br />
    <br />
    <div v-if="is_find_shipper == 1">
      <h4 align="left">Danh sách shipper gần nhất</h4>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>></th>
              <th>Ảnh đại diện</th>
              <th>Tên</th>
              <th>Số điện thoại</th>
              <th>Khoảng cách đến địa điểm của bạn</th>
              <th>Giá vận chuyển</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="shipper in shipper_list" v-bind:key="shipper.id">
              <td>
                <input
                  type="checkbox"
                  v-model="shipper_id"
                  :value="shipper.id"
                  @change="showCheckBoxVal()"
                />
              </td>
              <td>
                <img :src="shipper.avatar" />
              </td>
              <td>{{ shipper.name }}</td>
              <td>{{ shipper.phone }}</td>
              <td>{{ shipper.distance.toFixed(3) }} km</td>
              <td>{{ Math.round(5000 * shipper.distance).toLocaleString()}}₫</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <br />
    <div style="float: right">
      <th>
        Giá vận chuyển : ₫{{ Math.round(shipping_cost).toLocaleString() }}
      </th>
    </div>
    <br />
    <br />

    <div style="float: right">
      <th>Tổng Tiền : ₫{{ get_total }}</th>
    </div>
    <br />
    <br />
    <!-- <router-link @click.native="sendOrder()" :to="{ name: 'OrderList' }"> -->
    <button class="btn btn-success" @click="sendOrder()">Gửi đơn hàng</button>
    <!-- </router-link> -->
  </div>
</template>

<style scoped>
img {
  width: 75px;
  height: 75px;
}
#map {
  height: 400px;
  width: 600px;
}
</style>

<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=
    AIzaSyC3C6sepP8uOS9lFDwK67Hn66AMB-Dh2AY
    &callback=initMap">
</script>

<script>
import CartService from "@/api-services/CartService";
import ShipperService from "@/api-services/cusShipperService";
import OrderService from "@/api-services/cusOrderService";

import Axios from "axios";

export default {
  name: "Checkout",
  components: {},
  data() {
    return {
      carts: [],
      checked_cart: [],
      total: 0,
      shipper_list: [],
      shipping_cost: 0,
      shipper_id: [],
      address: "",
      customer_id: "61b0cd3b536c31dd0b77896b",
      lati: 0,
      long: 0,
      is_find_shipper: -1,
      shipper_found: [],
    };
  },
  mounted() {
    // console.log("receive checked cart");
    this.checked_cart = this.$route.query.checked_cart;
    // console.log(JSON.stringify(this.checked_cart));

    CartService.getCart().then((response) => {
      let temp_carts = response.data;
      // console.log(JSON.stringify(temp_carts));

      for (let i = 0; i < temp_carts.length; i++) {
        if (this.checked_cart.includes(temp_carts[i].product.id)) {
          this.carts.push(temp_carts[i]);
        }
      }

      this.carts.sort(function (a, b) {
        return a.product.shop_id.localeCompare(b.product.shop_id);
      });
      // console.log("checkout cart" + JSON.stringify(this.carts));
    });

    ShipperService.getShipper().then((response) => {
      this.shipper_list = response.data;
      // console.log(JSON.stringify(this.shipper_list));
      //   console.log("checkout cart" + JSON.stringify(this.carts));
    });

    navigator.geolocation.getCurrentPosition((position) => {
      this.lati = position.coords.latitude;
      this.long = position.coords.longitude;
      console.log("mounted Lat : " + this.lati);
      console.log("mounted Long : " + this.long);
    });
  },
  computed: {
    get_total() {
      let sum = 0;
      for (let i = 0; i < this.carts.length; i++) {
        sum +=
          parseFloat(this.carts[i].product.price) *
          parseFloat(this.carts[i].quantity);
      }
      sum += this.shipping_cost;
      this.total = sum;
      return Math.round(this.total).toLocaleString();
    },
  },
  methods: {
    calcPrice(itemquantity, unitprice) {
      return Math.round(itemquantity * unitprice).toLocaleString();
    },
    get_shipping_cost() {
      let max = 20000,
        min = 50000;
      this.shipping_cost = Math.random() * (max - min) + min;
      return this.shipping_cost.toFixed(0).toLocaleString();
    },
    sendOrder() {
      this.carts.sort(function (a, b) {
        return a.product.shop_id.localeCompare(b.product.shop_id);
      });

      //console.log("checked cart : " + JSON.stringify(this.carts.length));
      //console.log("group by cart : " + JSON.stringify(this.carts));

      // for (let i = 0; i < this.carts.length; i++) {
      //   console.log(JSON.stringify(this.carts[i]));
      // }

      const uniqueShopID = [
        ...new Set(this.carts.map((item) => item.product.shop_id)),
      ];

      console.log(JSON.stringify(uniqueShopID));

      let curOrder = [];
      for (let i = 0; i < uniqueShopID.length; i++) {
        curOrder = this.carts.filter(
          (order) => order.product.shop_id === uniqueShopID[i]
        );

        console.log("order shop " + i + " " + "\n" + JSON.stringify(curOrder));

        let totalOrder = 0;
        let orderDetail = [];

        for (let j = 0; j < curOrder.length; j++) {
          //let tempOrderDetail = curOrder[j];
          let tempOrderDetail = JSON.parse(JSON.stringify(curOrder[j]));

          let quantity = tempOrderDetail.quantity;
          tempOrderDetail = tempOrderDetail.product;
          tempOrderDetail.ProductID = tempOrderDetail.id;

          delete tempOrderDetail.id;
          delete tempOrderDetail.shop_id;
          delete tempOrderDetail.product_category;

          tempOrderDetail.Quantity = quantity;
          orderDetail.push(tempOrderDetail);

          // console.log('temp order detail : '+ JSON.stringify(tempOrderDetail));
          totalOrder += curOrder[j].product.price * curOrder[j].quantity;
        }

        console.log("Total order " + i + " " + totalOrder);
        console.log(
          "order detail shop " + i + " " + "\n" + JSON.stringify(orderDetail)
        );

        const data = JSON.stringify({
          shop_id: uniqueShopID[i],
          customer_id: this.customer_id,
          shipper_id: this.shipper_id[0],
          ship_info: this.address,
          status: 0,
          total: totalOrder + Math.round(this.shipping_cost),
          shipper_fee: Math.round(this.shipping_cost),
          created_at: new Date(),
          updated_at: new Date(),
          order_detail: orderDetail,
        });
        
        console.log('order data before create' + data);
        OrderService.createOrder(data);
      }

      for (let i = 0; i < this.checked_cart.length; i++) {
        CartService.removeCartItem(this.checked_cart[i]);
      }
      this.carts = [];

      CartService.getCart().then((response) => {
        this.cart_length = this.carts.length;
      });
    },
    locatorButtonPressed() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Lat : " + position.coords.latitude);
          console.log("Long : " + position.coords.longitude);

          this.getStreetAddressFrom(
            position.coords.latitude,
            position.coords.longitude
          );
        },

        (error) => {
          console.log(error.message);
        }
      );
    },
    getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
      var R = 6371;
      var dLat = (Math.PI / 180) * (lat2 - lat1);
      var dLon = (Math.PI / 180) * (lon2 - lon1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((Math.PI / 180) * lat1) *
          Math.cos((Math.PI / 180) * lat2) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km

      console.log("distance : " + d + " km");
      return d;
    },
    findShipper() {
      for (let i = 0; i < this.shipper_list.length; i++) {
        let distance = this.getDistanceFromLatLonInKm(
          this.lati,
          this.long,
          this.shipper_list[i].coor.lat,
          this.shipper_list[i].coor.long
        );

        this.shipper_list[i].distance = distance;
        console.log(JSON.stringify(this.shipper_list[i]));
      }
      this.shipper_list.sort(function (a, b) {
        return parseFloat(a.distance) - parseFloat(b.distance);
      });

      this.shipper_list = this.shipper_list.filter((shipper, idx) => idx < 3);
      this.is_find_shipper = 1;
    },
    showCheckBoxVal() {
      console.log(JSON.stringify(this.shipper_id[0]));
      this.get_shipping_cost();
    }
  },

};
</script>