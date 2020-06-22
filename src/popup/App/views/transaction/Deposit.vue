<template>
  <div class="deposit">
    <div class="address">
      {{accountInfo.address}}
      <span v-show="accountInfo.alias">({{accountInfo.alias}})</span>
      <i class="el-icon-document-copy _clicks"></i>
    </div>
    <div>助记词:有钱的 <i class="el-icon-edit _click"></i></div>
    <div class="code">
      二维码
    </div>
    <el-button type="success" plain>备份私钥</el-button>
  </div>
</template>

<script>
  import {Plus, divisionDecimals, tofix} from '@/api/util'

  export default {
    data() {
      return {
        accountInfo: {},//账户信息
        txList: [
          {type: '转账', txhash: 'sd42...sf53', amount: '23215.235', state: '确认中', time: '15:20:58'},
          {type: '跨链', txhash: 'sd42...sf53', amount: '362315.235', state: '已确认', time: '15:20:58'},
          {type: '别名', txhash: 'sd42...sf53', amount: '1.001', state: '已确认', time: '15:20:58'},
          {type: '共识', txhash: 'sd42...sf53', amount: '2000', state: '已确认', time: '15:20:58'}
        ],//交易记录列表
      }
    },
    created() {
      this.init();
    },
    mounted() {
    },
    destroyed() {
      this.accountInfo = {};
    },
    watch: {
      '$store.state.accountList': {
        handler: function () {
          this.init();
        }
      }
    },
    computed: {},
    components: {},
    methods: {

      //初始数据
      init() {
        //console.info("初始数据");
        //console.info(this.$store.getters.getSelectAddress);
        this.accountInfo = this.$store.getters.getSelectAddress;
        if (!this.accountInfo.address) {
          this.$router.push({
            name: 'newAddress',
          })
        }
        this.accountInfo.totalBalance = parseFloat(tofix(Number(divisionDecimals(this.accountInfo.totalBalance, 8)), 3, -1));
        let allLock = Number(Plus(this.accountInfo.consensusLock, this.accountInfo.timeLock));
        this.accountInfo.allLock = allLock === 0 ? 0 : parseFloat(tofix((Number(divisionDecimals(allLock, 8)), 3, -1)));
        this.accountInfo.balance = parseFloat(tofix(Number(divisionDecimals(this.accountInfo.balance, 8)), 3, -1));
        //console.info(this.accountInfo);
      },

      /**
       * url 连接
       * @param name
       * @param parameter
       * @param type 0 路由 1 外部
       */
      toUrl(name, parameter, type = 0) {
        let newQuery = {};
        this.$router.push({
          name: name,
          query: newQuery
        })
      }
    }
  }
</script>

<style lang="less">

</style>


