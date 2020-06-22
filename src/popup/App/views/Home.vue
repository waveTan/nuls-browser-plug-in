<template>
  <div class="_cb _home">
    <div class="address_info">
      <div class="address">
        {{accountInfo.address}} <span v-show="accountInfo.alias">({{accountInfo.alias}})</span>
      </div>
      <div class="assets">
        <div class="assets_info">总额: {{accountInfo.totalBalance}}</div>
        <div class="assets_info">锁定: {{accountInfo.allLock}}</div>
        <div class="assets_info">可用: {{accountInfo.balance}}</div>
      </div>
    </div>
    <div class="_btn _cb">
      <el-button size="mini" @click="toUrl('deposit','',0)">存入</el-button>
      <el-button size="mini" @click="toUrl('withdraw','',0)">发送</el-button>
    </div>
    <div class="signature_list">
      <h6 class="_title">签名列表</h6>
    </div>
    <div class="transactions">
      <div>
      <h6 class="_title">交易记录</h6>
        <el-table :data="txList" stripe border style="width: 100%">
          <el-table-column prop="type" label="类型" width="50" align="center">
          </el-table-column>
          <el-table-column prop="txhash" label="Hash" min-width="80" align="center">
          </el-table-column>
          <el-table-column prop="amount" label="金额" width="110" align="center">
          </el-table-column>
          <el-table-column prop="state" label="状态" width="70" align="center">
          </el-table-column>
          <el-table-column prop="time" label="时间" width="80" align="center">
          </el-table-column>
        </el-table>
      </div>
    </div>
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
  ._home {
    height: 31rem;
    width: 25rem;
    .address_info {
      margin: 0.5rem 0 0 0;
      height: 4.5rem;
      .address {
        font-size: 0.7rem;
        padding: 0 0.5rem;
        line-height: 2rem;
        height: 2rem;
      }
      .assets {
        margin: 0 0 0 0;
        height: 2rem;
        line-height: 2rem;
        width: 100%;
        .assets_info {
          display: block;
          float: left;
          width: 33.33%;
          text-align: center;
        }
      }
    }
    ._btn {
      text-align: center;
      .el-button--mini {
        width: 100px;
      }
    }
    ._title {
      font-size: 0.7rem;
      padding: 0 0 0 0.5rem;
      line-height: 1.2rem;
    }
    .signature_list {
      margin: 0.5rem 0 0.5rem 0;
      height: 13rem;
      h6 {
        border-bottom: 1px solid #c1c1c1;
      }
    }
    .transactions {
      height: 13rem;
      h6 {
        border-bottom: 1px solid #c1c1c1;
      }
    }
  }
</style>
