<template>
  <div class="_cb _home">
    <div class="address_info">
      <div class="address">
        地址：tNULSeBaMvH8TmMZUPQKvc19qeLrD7oN643aBL(bolang)
      </div>
      <div class="assets">
        <span>总额：5000.00</span>
        <span>锁定：5000.00</span>
        <span>可用：5000.00</span>
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

  export default {
    data() {
      return {}
    },
    created() {

    },
    mounted() {
      localStorage.setItem("admin","admins");
      sessionStorage.setItem("key","admins");
    },
    watch: {},
    computed: {},
    components: {},
    methods: {}
  }
</script>

<style lang="less">
  ._home {
    height: 400px;
    width: 360px;
    .address_info {
      margin: 10px 0 0 0;
      height: 50px;
      .address {
        font-size: 12px;
      }
      .assets {
        margin: 5px 0 0 0;
        span {
          display: block;
          float: left;
          width: 33.33%;
          text-align: center;
        }
      }
    }
    .signature_list {
      margin: 10px 0 10px 0;
      height: 200px;
      h6 {
        border-bottom: 1px solid #c1c1c1;
      }
    }
    .transactions {
      height: 200px;
      h6 {
        border-bottom: 1px solid #c1c1c1;
      }
    }
  }
</style>
