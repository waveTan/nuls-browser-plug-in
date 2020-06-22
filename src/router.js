import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// 解决重复点击导航路由报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/*',
      name: 'home',
      component: resolve => require(['./popup/App/views/Home.vue'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['./popup/App/views/user/Login.vue'], resolve)
    },
    {
      path: '/',
      name: 'home',
      component: resolve => require(['./popup/App/views/Home.vue'], resolve)
    },
    {
      path: '/deposit',
      name: 'deposit',
      component: resolve => require(['./popup/App/views/transaction/Deposit.vue'], resolve)
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: resolve => require(['./popup/App/views/transaction/Withdraw.vue'], resolve)
    },
    {
      path: '/NewAddress',
      name: 'newAddress',
      component: resolve => require(['./popup/App/views/user/NewAddress.vue'], resolve)
    },
    {
      path: '/BackupsAddress',
      name: 'backupsAddress',
      component: resolve => require(['./popup/App/views/user/BackupsAddress.vue'], resolve)
    },
    {
      path: '/User',
      name: 'user',
      component: resolve => require(['./popup/App/views/user/User.vue'], resolve)
    }

  ]
})
