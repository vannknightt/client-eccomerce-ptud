<template>
  <div>
    <navbar :pass_carts_length="cart_length" />
    <link
      href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      rel="stylesheet"
      id="bootstrap-css"
    />
    <p class="homeText">WELCOME TO ACCOUNT-OWNER APPLICATION</p>
  </div>
</template>
<script>
import Navbar from "./Navbar.vue";
import CartService from "@/api-services/CartService";

export default {
  components: { Navbar },
  name: "Home",
  data() {
    return {
      cart_length: 0,
    };
  },
  created() {
    CartService.getCart().then((response) => {
      this.cart_length = response.data.length;
      console.log(this.cart_length);
    });
  },
};
</script>

<style scoped>
.homeText {
  font-size: 35px;
  color: red;
  text-align: center;
  position: relative;
  top: 30px;
  text-shadow: 2px 2px 2px gray;
}
</style>