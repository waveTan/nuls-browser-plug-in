import Vue from "vue";
import AppComponent from "./App/App.vue";
import {Icon,Divider, Button, Select, Option} from 'element-ui';

//Vue.use(Icon, Button, Select, Option);
Vue.component(Icon.name, Icon);
Vue.component(Divider.name, Divider);
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
//Vue.component(Icon.name, Icon, Button.name, Button, Select.name, Select, Option.name, Option);
Vue.component("app-component", AppComponent);

new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});
