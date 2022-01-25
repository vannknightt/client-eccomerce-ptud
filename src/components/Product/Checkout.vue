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
              <tr v-for="cartitem in carts" :key="cartitem.product.product_id">
                <td>
                  <p>Cửa hàng {{ cartitem.product.shop_id }}</p>
                </td>
                <td>
                  <img :src="cartitem.product.image_path" />
                </td>
                <td>{{ cartitem.product.product_name }}</td>
                <td>₫{{ cartitem.product.product_price.toLocaleString() }}</td>
                <td>
                  <input type="text" :value="cartitem.quantity" readonly />
                </td>
                <td style="color: red">
                  ₫{{
                    calcPrice(cartitem.quantity, cartitem.product.product_price)
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-col>
    </b-row>

    <br />
    <h3 align="left">Chọn đơn vị vận chuyển</h3>

    <div id="map"></div>

    <button class="btn btn-success" @click="locatorButtonPressed()">
      Lấy vị trí hiện tại
    </button>

    <br />
    <select
      class="form-select"
      aria-label="Default select example"
      @click="get_shipping_cost()"
    >
      <option selected>Open this select menu</option>
      <option
        v-for="shipper in shipper_list"
        v-bind:key="shipper.id"
        v-bind:value="shipper.name"
      >
        {{ shipper.name }}
      </option>
    </select>
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
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAHzPUAWlDVC61Hqo1cc8g7ErkYnXGX-qE
    &callback=initMap">
</script>

<script>
// Initialize and add the map
var map;
function initMap() {
  // The map, centered on Central Park
  const center = { lat: 40.774102, lng: -73.971734 };
  const options = { zoom: 15, scaleControl: true, center: center };
  map = new google.maps.Map(document.getElementById("map"), options);
  // Locations of landmarks
  const dakota = { lat: 40.7767644, lng: -73.9761399 };
  const frick = { lat: 40.771209, lng: -73.9673991 };
  // The markers for The Dakota and The Frick Collection
  var mk1 = new google.maps.Marker({ position: dakota, map: map });
  var mk2 = new google.maps.Marker({ position: frick, map: map });
}
</script>
    <!--Load the API from the specified URL -- remember to replace YOUR_API_KEY-->



<script>
import CartService from "@/api-services/CartService";
import ShipperService from "@/api-services/ShipperService";
import OrderService from "@/api-services/OrderService";

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
      shipper_id: "",
      address: "",
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
        if (this.checked_cart.includes(temp_carts[i].product.product_id)) {
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
  },
  computed: {
    get_total() {
      let sum = 0;
      for (let i = 0; i < this.carts.length; i++) {
        sum +=
          parseFloat(this.carts[i].product.product_price) *
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
        min = 100000;
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

          delete tempOrderDetail.shop_id;
          delete tempOrderDetail.product_category;

          tempOrderDetail.product_quantity = quantity;
          orderDetail.push(tempOrderDetail);

          // console.log('temp order detail : '+ JSON.stringify(tempOrderDetail));
          totalOrder +=
            curOrder[j].product.product_price * curOrder[j].quantity;
        }

        console.log("Total order " + i + " " + totalOrder);
        console.log(
          "order detail shop " + i + " " + "\n" + JSON.stringify(orderDetail)
        );

        const data = JSON.stringify({
          shop_id: uniqueShopID[i],
          customer_id: "",
          shipper_id: "",
          ship_info: "",
          status: 0,
          total: totalOrder,
          shipper_fee: this.shipping_cost / uniqueShopID.length,
          created_at: "",
          updated_at: "",
          order_detail: orderDetail,
        });

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
          this.getStreetAddressFrom(
            position.coords.latitude,
            position.coords.longitude
          );
          console.log(this.address);
        },

        (error) => {
          console.log(error.message);
        }
      );
    },
    async getStreetAddressFrom(lat, long) {
      try {
        var {
          data,
        } = await Axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            "," +
            long +
            "&key={AIzaSyAHzPUAWlDVC61Hqo1cc8g7ErkYnXGX-qE}",
          { withCredentials: false }
        );

        if (data.error_message) {
          console.log(data.error_message);
        } else {
          this.address = data.results[0].formatted_address;
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>