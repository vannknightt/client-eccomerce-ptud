<template>
  <b-navbar toggleable="lg" type="dark" variant="info" fixed="top">
    <b-navbar-brand :to="{ name: 'Home' }">Home</b-navbar-brand>
    <b-navbar-nav>
      <b-nav-item :to="{ name: 'ProductList' }">Products</b-nav-item>
    </b-navbar-nav>

    <b-navbar-brand
      :to="{ name: 'CartDisplay' }"
      class="ms-auto"
      style="margin-right: 100px"
      >Giỏ hàng
      <span>({{navbar_carts_length}})</span>

    </b-navbar-brand>
  </b-navbar>
</template>
<script>

export default {
  name: "Navbar",
  props: ['pass_carts_length'],
  navbar_carts_length: 0,

  computed: {
    navbar_carts_length: function() {
      return this.pass_carts_length;
    }
  }
};
</script>