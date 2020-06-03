import Vue from 'vue'
import Vuex from 'vuex'
import {chainIdNumber} from '@/api/util'

Vue.use(Vuex);

//let urlName = IS_DEV ? 'TestUrlData' : 'mainUrlData';

export default new Vuex.Store({
  state: {
    addressInfo: localStorage.hasOwnProperty(chainIdNumber()) ? JSON.parse(localStorage.getItem(chainIdNumber())) : [],//所有账户信息
    //urlData: localStorage.hasOwnProperty(urlName) ? JSON.parse(localStorage.getItem(urlName)) : explorerData,  //服务节点配置信息
  },
  mutations: {},
  getters: {
    //当前选中账户
    getSelectAddress(state) {
      const data = state.addressInfo.filter(v => v.selection);
      return data.length ? data[0] : {}
    },
    //当前选中服务节点
    /* getCurrentUrlData(state) {
       const data = state.urlData.filter(v => v.selection);
       const res = data.length ? data[0] : {urls: ''};
       localStorage.setItem('url', JSON.stringify(res));
       return res
     },*/
  },
  actions: {}
})
