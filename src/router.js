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
      path: '/',
      name: 'home',
      component: resolve => require(['./popup/App/views/Home.vue'], resolve)
    },
    {
      path: '/*',
      name: 'home',
      component: resolve => require(['./popup/App/views/Home.vue'], resolve)
    },
    {
      path: '/NewAddress',
      name: 'newAddress',
      component: resolve => require(['./popup/App/views/user/NewAddress.vue'], resolve)
    },
    /*{
      path: '/page2',
      name: 'page2',
      component: resolve => require(['@/views/page2.vue'], resolve)
    },
    {
      path: '/NewAddress',
      name: 'newAddress',
      component: resolve => require(['@/views/user/NewAddress.vue'], resolve)
    },
    {
      path: '/BackupsAddress',
      name: 'backupsAddress',
      component: resolve => require(['@/views/user/BackupsAddress.vue'], resolve)
    },
    {
      path: '/User',
      name: 'user',
      component: resolve => require(['@/views/user/User.vue'], resolve)
    }*/

  ]
})
