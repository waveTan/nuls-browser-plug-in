<template>
  <div class="_bottom">
    <div class="_fl">
      <el-select v-model="urlPath" placeholder="请选择">
        <el-option v-for="item in urlList" :key="item.key" :label="item.url +'('+item.name +')'" :value="item.url">
        </el-option>
      </el-select>
    </div>
    <div class="_fr">高度：{{getInfo.networkHeight}}/{{getInfo.localHeight}}</div>
  </div>

</template>

<script>
  //import {connect} from '@/api/util'
  import axios from 'axios'

  export default {
    data() {
      return {
        urlList: [
          {key: '0', url: 'https://beta.wallet.nuls.io/api', name: '官方'},
          {key: '1', url: 'http://192.168.1.88', name: '测试'},
          {key: '2', url: 'http://192.168.1.168', name: '自己的'}
        ],
        urlPath: 'https://beta.wallet.nuls.io/api',//当前路径
        getInfo: {},//网络信息
      };
    },
    created() {
      this.getHeaderInfo();
    },
    mounted() {
      setInterval(() => {
        this.getHeaderInfo();
      }, 10000);
    },
    destroyed() {
    },
    watch: {},
    methods: {

      /**
       * 获取主网最新高度和本地高度
       */
      async getHeaderInfo() {
        const url = 'https://beta.wallet.nuls.io/api';
        const params = {
          "jsonrpc": "2.0", "method": "getInfo", "params": [2], "id": Math.floor(Math.random() * 1000)
        };
        try {
          let resData = await axios.post(url, params);
          if (resData.data.hasOwnProperty('result')) {
            this.getInfo = resData.data.result;
          }
        }
        catch (err) {
          console.log(err)
        }

        //console.log(url);
        //console.log(params);
        /*axios.post(url, params)
          .then((response) => {
            //console.log(response.data);
            if (response.data.hasOwnProperty("result")) {
              this.heightInfo = response.data.result;
              sessionStorage.setItem("info", JSON.stringify(response.data.result))
            } else {
              this.heightInfo = {localHeight: 0, networkHeight: 0};
              sessionStorage.removeItem("info")
            }
          })
          .catch((error) => {
            sessionStorage.removeItem("info");
            this.heightInfo = {localHeight: 0, networkHeight: 0};
            console.log("getInfo:" + error)
          })*/
      },

      /**
       * @disc: url 连接
       * @params: name, parameter, type
       * @date: 2019-08-22 14:26
       * @author: Wave
       */
      toUrl(name, parameter, type) {
        let newPath = connect(name, parameter, type);
        if (newPath.success) {
          this.$router.push(newPath.data);
        }
      },
    }
  }
</script>

<style lang="less">
  @import "./../assets/css/style";

  ._bottom {
    height: 30px;
    width: 100%;
    line-height: 30px;
    padding: 0 10px;
    position: fixed;
    bottom: 0;
    .el-select{
      .el-input{
        .el-input__inner{
          height: 25px;
          line-height: 25px;
          padding: 0;
          border: 0;
          width: 200px;
        }
        .el-input__suffix{
          display: none;
        }
      }
    }
  }
</style>
