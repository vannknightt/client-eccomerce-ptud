<template>
  <div>
    <p class="homeText">WELCOME TO ACCOUNT-OWNER APPLICATION</p>
  </div>
</template>
<script>
import ProductService from "@/api-services/ProductService";
import Navbar from "./Navbar.vue";

export default {
  components: { Navbar },
  name: "Home",

  created() {
    ProductService.getAll()
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
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