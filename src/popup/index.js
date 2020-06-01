import Vue from "vue";
import router from './../router.js'
import store from './../store'
import i18n from './../i18n'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import AppComponent from "./App/App.vue";

Vue.use(ElementUI,i18n);
Vue.component("app-component", AppComponent);

new Vue({
  router,
  store,
  i18n,
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});
