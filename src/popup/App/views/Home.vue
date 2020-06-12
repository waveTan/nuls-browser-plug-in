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
    <div class="signature_list">
      <h6>签名列表</h6>
    </div>
    <div class="transactions">
      <h6>交易记录</h6>
    </div>
  </div>
</template>

<script>
  import {Plus, divisionDecimals, tofix} from '@/api/util'

  export default {
    data() {
      return {
        accountInfo: {},//账户信息
        clickId: document.getElementById('wave'),
      }
    },
    created() {
      this.init();
    },
    mounted() {
      let ev = document.createEvent("HTMLEvents");
      ev.initEvent("change", false, true);
      this.clickId.dispatchEvent(ev);
      console.info(this.clickId)
      //this.clickId.onblur = this.clickIdClick();
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
        console.info("初始数据");
        console.info(this.$store.getters.getSelectAddress);
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
        console.info(this.accountInfo);
      },

      clickIdClick() {
        console.info("wave")
      },
      /*this.clickId.onClick () {
        console.info("wave")

  }*/

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
