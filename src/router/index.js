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
  mode:'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/product/list',
      name: 'ProductList',
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
    }

  ]
})
