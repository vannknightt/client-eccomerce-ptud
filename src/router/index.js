import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home';
import ProductList from '@/components/Product/ProductList';
import CartDisplay from '@/components/Product/CartDisplay';
import ProductDetail from '@/components/Product/ProductDetail';
import Checkout from '@/components/Product/Checkout';
import OrderList from '@/components/Order/OrderList';
import OrderDetail from '@/components/Order/OrderDetail';

import NotFound from '@/components/error-pages/NotFound';

Vue.use(Router)
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/home",
      redirect: "/"
    },
    {
      path: "/product/list",
      name: "ProductList",
      component: ProductList
    },
    {
      path: '/product/detail/:id',
      name: 'ProductDetail',
      component: ProductDetail
    },
    {
      path: '/cart',
      name: 'CartDisplay',
      component: CartDisplay
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout
    },
    {
      path: '/order',
      name: 'OrderList',
      component: OrderList
    },
    {
      path: '/order/detail/:id',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '*',
      name: 'NotFound',

      component: NotFound
    },

    {
      path: "/register-shipper",
      name: "RegisterShipper",

      component: () =>
        import(/* webpackChunkName: "about" */ "../views/ShipperForm.vue")
    },
    {
      path: "/shipper/me",
      name: "ShipperDetail",

      component: () =>
        import(/* webpackChunkName: "about" */ "../views/ShipperForm.vue")
    },
  {
    path: '/update-shipper',
    name: 'UpdateShipper',
    component: () => import(/* webpackChunkName: "about" */ '../views/UpdateShipper.vue')

  },
  {
    path: '/submit-exteninfor',
    name: 'SubmitExtenInfor',
    component: () => import(/* webpackChunkName: "about" */ '../views/SubmitExtenInfor.vue')

  },
  {
    path: '/rating-shipper',
    name: 'RatingShipper',
    component: () => import(/* webpackChunkName: "about" */ '../views/RatingShipper.vue')

  },
  {
    path: '/rating-ofshipper',
    name: 'RatingofShipper',
    component: () => import(/* webpackChunkName: "about" */ '../views/RateofShiper.vue')

  },
    {
      path: "/submit-trouble",
      name: "SubmitTrouble",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/SubmitTrouble.vue")
    },
    {
      path: "/order/all",
      name: "OrderByShipper",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/Order.vue")
    },
    {
      path: "/order/:id",
      name: "OrderDetail",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/OrderDetail.vue")
    },
    {
      path: "/login-shipper",
      name: "LoginShipper",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/ShipperLogin.vue")
    },
    {
      path: "/income-shipper",
      name: "IncomeShipper",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/IncomeShipper.vue")
    },
  ]
});
