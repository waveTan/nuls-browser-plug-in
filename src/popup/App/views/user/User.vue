<template>
  <div class="_account w1200">
    <!--<div class="address">
      <span class="font16">{{$t('public.address')}}: {{accountInfo.address}}</span>
      <font class="fr font16">{{$t('public.balance')}}: {{accountInfo.balance}}<em class="fCN"> NULS</em></font>
    </div>-->

    <div class="account_list">
      <el-table :data="accountList" stripe style="width: 100%">
        <el-table-column prop="addresss" label="账户" width="100" align="center">
        </el-table-column>
        <el-table-column label="可用" width="100" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.balances}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="alias" label="别名" width="80" align="center">
        </el-table-column>
        <el-table-column label="操作" min-width="60" align="center">
          <template slot-scope="scope">
            <i class="_click"
               :class="scope.row.selection ? 'el-icon-star-on':'el-icon-star-off'"
               :title="scope.row.selection ? '当前默认':'设为默认'"></i>
            <i class="el-icon-lock _click" title="记住密码"></i>
            <i class="el-icon-delete _click" title="移除账户"></i>
          </template>
        </el-table-column>
      </el-table>
      <div class="new_account _tc">
        <el-button type="success" size="small" @click="toUrl('newAddress','',0)">添加账户</el-button>
      </div>
    </div>

    <Password ref="password" @passwordSubmit="passSubmit">
    </Password>
  </div>
</template>

<script>
  import Password from './../../../../components/PasswordBar'
  import {divisionDecimals, connect, addressList, superLong, tofix} from '@/api/util'
  import {getAddressInfoByAddress} from '@/api/requestData'

  export default {
    data() {
      return {
        accountInfo: {},//账户信息
        accountList: [],//账户列表
      }
    },
    created() {
      this.accountInfo = addressList(1);
      console.info(this.accountInfo);
      this.addressInfoByAddress(this.accountInfo.address);

      this.accountList = addressList(0);
      for (let item of this.accountList) {
        item.addresss = superLong(item.address, 5);
        item.balances = tofix(Number(divisionDecimals(item.balance, 8)), 3, -1);
      }
      console.info(this.accountList);

    },
    mounted() {
      this.userSetInterval = setInterval(() => {
        this.addressInfoByAddress(this.accountInfo.address);
      }, 10000)
    },
    destroyed() {
      clearInterval(this.userSetInterval);
    },
    components: {
      Password,
    },
    methods: {

      /**
       * @disc:获取地址信息
       * @param address
       * @date: 2019-08-20 16:58
       * @author: Wave
       */
      async addressInfoByAddress(address) {
        let newData = {aesPri: this.accountInfo.aesPri, pub: this.accountInfo.pub};
        let newAddressInfo = await getAddressInfoByAddress(address);
        if (newAddressInfo.success) {
          this.accountInfo = {};
          newAddressInfo.data.balance = divisionDecimals(newAddressInfo.data.balance);
          this.accountInfo = {...newData, ...newAddressInfo.data};
        } else {
          this.accountInfo.balance = 0
        }
      },

      /**
       * @disc: url 连接
       * @params: name
       * @params: params
       * @params: type
       * @date: 2019-08-20 18:01
       * @author: Wave
       */
      toUrl(name, parameter, type) {
        let newPath = connect(name, parameter, type);
        if (newPath.success) {
          this.$router.push(newPath.data);
        }
      },
    },
  }
</script>

<style lang="less">
  ._account {
    margin: 1.5rem auto 0;
    .account_list {
      .el-table {
        th {
          background-color: #f5f6f9;
        }
        td, th {
          padding: 5px 0;
          .cell {
            line-height: 20px;
            font-size: 12px;
            padding: 0 2px;
            i {
              margin: 0 5px 0 0;
              font-size: 14px;
            }
          }
        }

      }
      .new_account {
        margin: 1rem auto;
      }
    }

    .address {
      span {
        color: #17202e;
        @media screen and (max-width: 1024px) {
          font-size: 0.8rem;
          display: block;
          margin: 0.5rem 0 0 0.5rem;
        }
      }
      font {
        @media screen and (max-width: 1024px) {
          font-size: 0.8rem;
          display: block;
          float: none;
          margin: 0.5rem 0 0 0.5rem;
        }
      }
    }
  }
</style>
