<template>
  <div class="p_main">
    <div class="p_main_header">
      <div class="_fl"><img src="./../../assets/img/logn.png"></div>
      <div class="_fr"><i class="el-icon-setting" @click="setDrawer=!setDrawer"></i></div>
    </div>
    <transition name="el-fade-in-linear">
      <div v-show="setDrawer" class="transition-box">.el-fade-in-linear</div>
    </transition>
    <div class="p_main_middle">

      <!--创建/导入账户-->
      <div v-if="!addressInfo.address" class="home_new_address">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="Keystore导入" name="first">用户管理</el-tab-pane>
          <el-tab-pane label="私钥导入" name="second">
            <NewAddress>
            </NewAddress>
          </el-tab-pane>
          <el-tab-pane label="创建账户" name="third">角色管理</el-tab-pane>
        </el-tabs>
      </div>

      <!--首页信息-->
      <div v-if="addressInfo.address">
        <div class="address_info" v-show="false">
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

    </div>
    <div class="p_main_bottom">
      <div class="_fl">
        节点：http://192.168.1.118:17003
      </div>
      <div class="_fr">高度：898989/565864</div>
    </div>
  </div>
</template>

<script>
  import NewAddress from '@/components/NewAddress.vue'

  export default {
    data() {
      return {
        setDrawer: false,

        addressInfo: {},//账户信息

        activeName: 'second',

        addressList: [
          {
            address: 'tNULSeBaMvH8TmMZUPQKvc19qeLrD7oN643aBL',
            addresss: 'tNULSeBa...oN643aBL',
            alias: 'bolang',
            balance: '5555.2888',
            available: '8883.656',
            locking: '9865.235'
          },
          {
            address: 'tNULSeBaMqeQB2kjB86EApUGBAhLEy5SRMcUeo',
            addresss: 'tNULSeBa...oN643aBL',
            alias: '',
            balance: '5555.2888',
            available: '8883.656',
            locking: '9865.235'
          },
          {
            address: 'tNULSeBaMqywZjfSrKNQKBfuQtVxAHBQ8rB2Zn',
            addresss: 'tNULSeBa...oN643aBL',
            alias: 'kais',
            balance: '5555.2888',
            available: '8883.656',
            locking: '9865.235'
          },
        ],
        addressValue: '',

        urlOptions: [
          {value: 'http://192.168.1.11:18004', label: '/api'},
          {value: 'http://192.168.1.21:18004', label: 'public'},
          {value: 'http://192.168.1.31:18004', label: 'public1'},
          {value: 'http://192.168.1.41:18004', label: 'public2'},
        ],
        urlValue: ''
      }
    },
    created() {
      this.addressValue = this.addressList[0]
    },
    mounted() {

    },
    watch: {},
    computed: {},
    components: {NewAddress},
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
    }
  }
</script>

<style lang="less">
  .p_main {

    /*公共*/
    ._fl {
      float: left;
    }
    ._fr {
      float: right;
    }

    width: 360px;
    height: 580px;
    .p_main_header {
      height: 30px;
      border-bottom: 1px solid #c1c1c1;
      img {
        height: 20px;
      }
      .el-icon-setting {
        font-size: 24px;
        cursor: pointer;
      }
    }
    .p_main_middle {
      clear: both;
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
    .p_main_bottom {
      clear: both;
      height: 25px;
      width: 96.5%;
      line-height: 25px;
      position: fixed;
      bottom: 0;
      border-top: 1px solid #c1c1c1;
    }
  }
</style>
