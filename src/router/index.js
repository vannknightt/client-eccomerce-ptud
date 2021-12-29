import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home';
import ProductList from '@/components/Product/ProductList';
import CartDisplay from '@/components/Product/CartDisplay';
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
      path: '/cart',
      name: 'CartDisplay',
      component: CartDisplay
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    },
    
  {
    path: '/register-shipper',
    name: 'RegisterShipper',

    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterShipper.vue')
  }

  ]
})
