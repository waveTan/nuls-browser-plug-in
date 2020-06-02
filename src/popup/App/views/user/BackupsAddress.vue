<template>
  <div class="_backups-address bg-gray">
    <div class="bg-white">
      <h3 class="title tc">{{$t('backupsAddress.backupsAddress0')}}</h3>
    </div>
    <div class="bg-white w1200">
      <div class="address w630">
        {{$t('backupsAddress.backupsAddress1')}}
        <span class="yellow">{{accountAddress.address}}</span>
        &nbsp;<i class="el-icon-document-copy _click" @click="copy(accountAddress.address)"></i>
      </div>
      <div class="tips bg-gray w630">
        <p class="sub_info"><i></i> {{$t('backupsAddress.backupsAddress2')}}</p>
        <p class="sub_info"><i></i> {{$t('backupsAddress.backupsAddress3')}}</p>
      </div>

      <div class="w630 _tc  _pb_20">
        <div class="_mt_20">
          <el-button type="success" size="small" @click="backupsKeyStore">{{$t('backupsAddress.backupsAddress41')}}
          </el-button>
        </div>
        <div class="_mt_20">
          <el-button type="success" size="small" @click="backupsKey">{{$t('backupsAddress.backupsAddress4')}}
          </el-button>
        </div>
        <div class="_mt_20 _mb_20">
          <el-button size="small" @click="toUrl('home')"> {{$t('backupsAddress.backupsAddress5')}}</el-button>
        </div>
      </div>
    </div>
    <Password ref="password" @passwordSubmit="passSubmit">
    </Password>
    <el-dialog :title="$t('backupsAddress.backupsAddress6')" width="40%"
               :visible.sync="keyDialog"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
    >
      <span></span>
      <p class="bg-white">
        {{accountAddress.pri}}
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" size="small" @click="copy(accountAddress.pri)">{{$t('public.copy')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Password from '@/components/PasswordBar'
  import {copys, passwordVerification} from '@/api/util'

  export default {
    components: {Password},
    data() {
      return {
        accountAddress: JSON.parse(localStorage.getItem('accountInfo')),
        keyDialog: false, //key弹框
        backupsType: 0,// 备份类型 0:keystore 1:key
      };
    },
    methods: {

      /**
       *  获取密码框的密码
       * @param password
       **/
      async passSubmit(password) {
        let isPassword = await passwordVerification(this.accountAddress, password);
        if (!isPassword.success) {
          this.$message({message: this.$t('tips.tips4'), type: 'error', duration: 3000});
          return;
        }
        if (this.backupsType === 0) {
          let FileSaver = require('file-saver');
          let fileInfo = {
            address: isPassword.address,
            encryptedPrivateKey: isPassword.aesPri,
            pubKey: isPassword.pub,
            priKey: null
          };
          let blob = new Blob([JSON.stringify(fileInfo)], {type: "text/plain;charset=utf-8"});
          FileSaver.saveAs(blob, isPassword.address + ".keystore");
        } else {
          this.keyDialog = true;
          this.accountAddress.pri = isPassword.pri;
        }
      },

      /**
       *  备份私钥
       **/
      backupsKey() {
        this.backupsType = 1;
        this.$refs.password.showPassword(true);
      },

      /**
       * @disc: 备份keystore
       * @date: 2019-10-12 14:24
       * @author: Wave
       */
      backupsKeyStore() {
        try {
          let isFileSaverSupported = !!new Blob;
          if (isFileSaverSupported) {
            this.backupsType = 0;
            this.$refs.password.showPassword(true);
          }
        } catch (e) {
          this.$message({message: this.$t('tips.tips7'), type: 'error', duration: 3000});
          console.log(e);
        }
      },

      /**
       * 连接跳转
       * @param name
       */
      toUrl(name) {
        this.$router.push({
          name: name,
        })
      },

      /**
       * 复制方法
       * @param sting
       **/
      copy(sting) {
        copys(sting);
        this.$message({message: this.$t('public.copyComplete'), type: 'success', duration: 1000});
      },
    }
  }
</script>

<style lang="less">
  //@import "./../../assets/css/style";

  ._backups-address {
    .bg-white {
      .title {
        margin: 0 auto;
        line-height: 4rem;
        text-align: center;
        font-size: 1.5rem;
      }
    }
    .address {
      margin: 0.5rem 0 0.5rem 0.25rem;
      font-size: 0.8rem;
    }
    .tips {
      padding: 0.5rem 0.3rem;
      margin: 0 auto;
      width: 96%;
      background-color: #f9fafd;
      font-size: 0.7rem;
      line-height: 1.4rem;
      word-wrap: break-word;
      .sub_info {
        padding: 0.1rem;
        i {
          width: 5px;
          height: 5px;
          display: block;
          float: left;
          margin: 9px 10px 0 0;
          border-radius: 5px;
          background: #000000;
        }
      }

    }
  }

</style>
