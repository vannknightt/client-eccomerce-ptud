<template>
  <div v-if="get_cart_length <= 0">
    <link
      href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      rel="stylesheet"
      id="bootstrap-css"
    />

    <navbar :pass_carts_length="get_cart_length" />
    <br /><br />
    <div class="container-fluid mt-100">
      <div class="row">
        <div class="col-md-12">
          <div class="col-sm-12 empty-cart-cls text-center">
            <img
              src="https://cdn3.iconfinder.com/data/icons/shopping-and-ecommerce-29/90/empty_cart-512.png"
              width="130"
              height="130"
              class="img-fluid mb-4 mr-3"
            />
            <h3><strong>Giỏ hàng của bạn còn trống</strong></h3>
            <router-link
              :to="{ name: 'ProductList' }"
              class="btn btn-primary cart-btn-transform m-3"
              >Tiếp tục mua sắm
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <navbar :pass_carts_length="get_cart_length" />
    <link
      href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      rel="stylesheet"
      id="bootstrap-css"
    />
    <br />
    <h3 align="left">GIỎ HÀNG</h3>

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
                  <input
                    type="checkbox"
                    v-model="is_checked"
                    :value="cartitem.product.id"
                    @change="showCheckBoxVal()"
                  />
                </td>
                <td>
                  <img :src="cartitem.product.imagePath" />
                </td>
                <td>{{ cartitem.product.name }}</td>
                <td>₫{{ cartitem.product.price.toLocaleString() }}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    @change="
                      updateCartQuantity(
                        cartitem.product.id,
                        $event.target.value
                      )
                    "
                    :value="cartitem.quantity"
                  />
                </td>
                <td style="color: red">
                  ₫{{
                    calcPrice(cartitem.quantity, cartitem.product.price)
                  }}
                </td>
                <td>
                  <b-button
                    variant="danger"
                    @click="removeItem(cartitem.product.id)"
                    >Xóa</b-button
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-col>
    </b-row>
    <div style="float: right">
      <th>Tổng Tiền : ₫{{ get_total }}</th>
    </div>
    <br />
    <!-- <button class="btn btn-success" @click="sendOrder()">Gửi đơn hàng</button> -->

    <router-link
      :to="{ name: 'Checkout', query: { checked_cart: this.is_checked } }"
    >
      <button class="btn btn-success">Mua hàng</button>
    </router-link>
  </div>
</template>

<style scoped>
img {
  width: 75px;
  height: 75px;
}
</style>

<script>
import CartService from "@/api-services/CartService";
import Navbar from "@/components/Navbar";

export default {
  name: "CartDisplay",
  components: {
    Navbar,
  },
  data() {
    return {
      carts: [],
      cart_length: 0,
      is_checked: [],
      checked_cart: [],
      total: 0,
    };
  },

  created() {
    CartService.getCart().then((response) => {
      this.carts = response.data;
      this.cart_length = this.carts.length;
      // console.log('cart display ' + this.carts.length)
      //console.log('cart display ' + JSON.stringify(this.carts));

    });
  },

  computed: {
    get_cart_length() {
      return this.cart_length;
    },
    get_total() {
      return Math.round(this.total).toLocaleString();
    },
  },
  methods: {
    calcPrice(itemquantity, unitprice) {
      // console.log("item quantity " + itemquantity);

      return Math.round(itemquantity * unitprice).toLocaleString();
    },
    updateCartQuantity(item_id, itemquantity) {
      // console.log("update cart item quantity " + itemquantity);
      // console.log("update cart item id " + item_id);

      CartService.updateCartItem(item_id, itemquantity).then((response) => {
        this.carts = response.data;
        this.showCheckBoxVal();
      });
    },
    removeItem(item_id) {
      // console.log(item_id);

      CartService.removeCartItem(item_id).then((response) => {
        this.carts = response.data;
        // console.log(this.carts.length)
        this.cart_length = this.carts.length;
      });
    },
    showCheckBoxVal() {
      // console.log("checked : " + this.is_checked.length);
      console.log("checked : " + this.is_checked);
      let sum = 0;
      for (let i = 0; i < this.carts.length; i++) {
        if (this.is_checked.includes(this.carts[i].product.id)) {
          sum +=
            parseFloat(this.carts[i].product.price) *
            parseFloat(this.carts[i].quantity);
        }
      }
      this.total = sum;
    },
    sendOrder() {
      for (let i = 0; i < this.carts.length; i++) {
        if (this.is_checked.includes(this.carts[i].product.id)) {
          this.checked_cart.push(this.carts[i]);
        }
      }
      return this.checked_cart;
      // this.checked_cart.sort(function (a, b) {
      //   return a.product.shop_id.localeCompare(b.product.shop_id);
      // });

      // console.log("checked cart : " + JSON.stringify(this.checked_cart.length));
      // // console.log("checked cart : " + JSON.stringify(this.checked_cart));

      // for (let i = 0; i < this.checked_cart.length; i++) {
      //   console.log(JSON.stringify(this.checked_cart[i]));
      // }

      // const uniqueShopID = [
      //   ...new Set(this.checked_cart.map((item) => item.product.shop_id)),
      // ];

      // console.log(JSON.stringify(uniqueShopID));

      // let curOrder = [];
      // for (let i = 0; i < uniqueShopID.length; i++) {
      //   curOrder = this.checked_cart.filter(
      //     (order) => order.product.shop_id === uniqueShopID[i]
      //   );

      //   console.log("order number     " + i + JSON.stringify(curOrder));
      // }
    },
  },
};
</script>