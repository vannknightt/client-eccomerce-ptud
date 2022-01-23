// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Vuex from "vuex";
import App from "./App";
import router from "./router";

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import { store } from "./store/store";

import Axios from "axios";

Vue.config.productionTip = false;
Axios.defaults.baseURL = process.env.API_ENDPOINT;

Vue.use(BootstrapVue);
Vue.use(Vuex);
Vue.use(Antd);



/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
