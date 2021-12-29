<template>
  <div>
    <navbar :pass_carts_length="get_cart_length"/>

    <br />
    <h3 align="left">GIỎ HÀNG</h3>

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
              <tr v-for="cartitem in carts" 
              :key="cartitem.product.product_id">
                <td>
                  <img :src="path + cartitem.product.image_path" />
                </td>
                <td>{{ cartitem.product.product_name }}</td>
                <td>₫{{ cartitem.product.product_price }}</td>
                <td>
                  <input
                    type="number"
                    name="points"
                    step="1"
                    @change="calcItem(itemquantity)"
                    :value="cartitem.quantity"
                  />
                </td>
                <td style="color: red">
                  ₫{{ cartitem.quantity * cartitem.product.product_price }}
                </td>
                <td>
                  <b-button variant="success">Cập nhật</b-button>
                </td>
                <td>
                  <b-button variant="danger">Xóa</b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-col>
    </b-row>

    <a asp-controller="Product" asp-action="Checkout" class="btn btn-success"
      >Gửi đơn hàng</a
    >
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
import Navbar from '@/components/Navbar';

export default {
  name: "CartDisplay",
  components: {
    Navbar
  },
  data() {
    return {
      carts: [],
      cart_length: 0,
      path: "https://localhost:44344",
    };
  },

  created() {
    CartService.getCart().then((response) => {
      this.carts = response.data;
      console.log(this.carts.length)
      this.cart_length = this.carts.length;
    });
  },

  computed: {
    get_cart_length() {
      return this.cart_length;
    }
  },
  methods: {
    calcItem(itemquantity) {
      console.log(itemquantity);
    },
  },
};
</script>