<template>
  <b-navbar toggleable="lg" type="dark" variant="info" fixed="top">
    <b-navbar-brand :to="{ name: 'Home' }">Home</b-navbar-brand>
    <b-navbar-nav>
      <b-nav-item :to="{ name: 'ProductList' }">Sản phẩm</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav>
      <b-nav-item :to="{ name: 'OrderList' }">Đơn hàng</b-nav-item>
    </b-navbar-nav>

    <b-navbar-brand class="ml-auto" :to="{ name: 'CartDisplay' }"
      >Giỏ hàng
      <span>({{ navbar_carts_length }})</span>
    </b-navbar-brand>
  </b-navbar>
</template>
<script>
import CartService from "@/api-services/CartService";

export default {
  name: "Navbar",
  props: ["pass_carts_length"],
  navbar_carts_length: 0, 
  computed: {
    navbar_carts_length: function () {
      return this.pass_carts_length;
    },
  },
};
</script>
