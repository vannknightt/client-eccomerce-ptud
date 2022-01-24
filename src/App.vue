<template>
  <b-container id="app">
    <a-spin tip="Loading..." :spinning="isLoading">
      <b-row>
        <b-col>
          <navbar />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <router-view />
        </b-col>
      </b-row>
    </a-spin>
  </b-container>
</template>

<script>
import Navbar from "@/components/Navbar";
import "./style.css";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    Navbar
  },
  computed: {
    ...mapState("shipper", {
      isLoading: state => state.isLoading
    })
  },
  mounted() {
    this.$message.config({
      top: "56px",
      duration: 2,
      maxCount: 3
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
