<template>
  <b-navbar toggleable="lg" type="dark" variant="info" fixed="top">
    <b-navbar-brand :to="{ name: 'Home' }" v-if="!isShipper"
      >Home</b-navbar-brand
    >
    <b-navbar-nav>
      <b-nav-item :to="{ name: 'ProductList' }">Products</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav>
      <b-nav-item :to="{ name: 'RegisterShipper' }">Regíter</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav>
      <b-nav-item :to="{ name: 'LoginShipper' }">Login</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav>
      <b-nav-item :to="{ name: 'OrderByShipper' }" v-if="isShipper"
        >Orders history</b-nav-item
      >
    </b-navbar-nav>
    <b-navbar-nav>
      <b-nav-item :to="{ name: 'IncomeShipper' }" v-if="isShipper"
        >Income</b-nav-item
      >
    </b-navbar-nav>

    <b-navbar-nav>
      <b-nav-item :to="{ name: 'OrderList' }">Đơn hàng</b-nav-item>
    </b-navbar-nav>

    <b-navbar-brand
      v-if="!isShipper"
      :to="{ name: 'CartDisplay' }"
      class="ms-auto"
      style="margin-right: 100px"
      >Giỏ hàng
      <span>({{ navbar_carts_length }})</span>
    </b-navbar-brand>
    <b-navbar-brand
      v-if="isShipper"
      :to="{ name: 'ShipperDetail' }"
      class="ms-auto"
      style="margin-right: 100px"
      ><a-avatar size="medium" icon="user" />
      <span>{{ navbar_carts_length }}</span>
    </b-navbar-brand>
  </b-navbar>
</template>
<script>
export default {
  name: "Navbar",
  props: ["pass_carts_length"],
  navbar_carts_length: 0,

  computed: {
    navbar_carts_length: function () {
      return this.pass_carts_length;
    },
    isShipper() {
      const shipper = localStorage.getItem("accountType");
      return shipper && shipper === "shipper";
    }
  }
};
</script>
