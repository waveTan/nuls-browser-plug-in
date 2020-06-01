import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import AppComponent from "./App/App.vue";

Vue.use(ElementUI);
Vue.component("app-component", AppComponent);

new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});
