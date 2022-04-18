<template>
  <div>
    <link
      href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      rel="stylesheet"
      id="bootstrap-css"
    />
    <navbar />
    <img
      src="http://www.drivingschoolexperts.com/wp-content/themes/reliqus-drivingschoolexpert/images/payment-successful.png"
    />
    <h4 align="text-center">
      <b>Đặt hàng thành công! Vui lòng vào phần đơn hàng để kiểm tra đơn hàng</b>
    </h4>
    <div>
      <router-link :to="{ name: 'OrderList' }">
        <button class="btn btn-primary btn-rounded">
          Đi đến trang đơn hàng
        </button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
img {
  padding-top: 50px;
  padding-bottom: 20px;
}
h4 {
  padding: 20px;
}
</style>

<script>
import Navbar from "@/components/Navbar";
import OrderList from "@/components/Order/OrderList";

export default {
  name: "Success",
  components: { Navbar },
};
</script>