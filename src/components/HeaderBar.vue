<template>
  <div class="header bg-gray">
    <div class="w1400">
      <div class="logo fl">
        <img class="clicks" @click="toUrl('home')" :src="logoSvg"/>
      </div>
      <div class="nav fl">
        <el-menu :default-active="navMenu" class="fl bg-gray" mode="horizontal" @select="handleSelect">
          <el-menu-item index="trading">{{$t('nav.selectItem')}}</el-menu-item>
          <el-menu-item index="dexExplorer">{{$t('nav.issueToken')}}</el-menu-item>
          <el-menu-item index="other" v-show="false">other</el-menu-item>
        </el-menu>
        <div class="user fr">
          <el-menu mode="horizontal" :default-active="rightMenu" @select="handleSelect" class="user_menu bg-gray">
            <el-menu-item index="language" class="language">
              <img :src="langSvg">
            </el-menu-item>
            <el-submenu index="account" v-if="accountAddress" class="nav_account">
              <template slot="title">
                <i class="el-icon-s-custom click" style="font-size:16px"></i>
              </template>
              <el-menu-item index="backupsAddress">{{$t('nav.backup')}}</el-menu-item>
              <el-menu-item index="signOut">{{$t('nav.signOut')}}</el-menu-item>
              <el-menu-item index="other" v-show="false">other</el-menu-item>
            </el-submenu>
            <el-menu-item index="order" v-if="accountAddress">{{$t('user.user1')}}</el-menu-item>
            <el-menu-item index="assets" v-if="accountAddress">{{$t('user.user0')}}</el-menu-item>
            <el-menu-item index="login" v-if="!accountAddress">{{$t('nav.login')}}</el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
    <Password ref="password" @passwordSubmit="passSubmit">
    </Password>
    <div class="cb"></div>
  </div>
</template>

<script>
  import logo from '@/assets/img/logo.svg'
  import cn from '@/assets/img/cn.svg'
  import en from '@/assets/img/en.svg'
  import Password from '@/components/PasswordBar'
  import {passwordVerification} from '@/api/util'
  import {EXPLORER_URL} from '@/config'

  export default {
    data() {
      return {
        logoSvg: logo,
        langSvg: en,
        navMenu: '',//导航选中
        rightMenu: '',//导航选中
        accountInfo: {},//账户信息
        accountAddress: '',//账户地址
        lang: sessionStorage.hasOwnProperty('lang') ? sessionStorage.getItem('lang') : 'en', //语言
        isMenu: true,//手机版菜单显示及隐藏
        urlPath: '',//当前路径
      };
    },
    components: {Password},
    created() {
      this.$i18n.locale = this.lang;
      sessionStorage.setItem('lang', this.lang);
    },
    mounted() {
      setInterval(() => {
        if (localStorage.hasOwnProperty('accountInfo')) {
          this.accountInfo = JSON.parse(localStorage.getItem('accountInfo'));
          this.accountAddress = this.accountInfo.address;
          this.urlPath = this.$route.path
        }
      }, 500);
    },
    watch: {
      urlPath: function (val, oldVal) {
        //console.log(val, oldVal);
        if (val === '/') {
          this.navMenu = 'other';
          this.rightMenu = 'other';
        } else if (val === '/trading/index') {
          this.navMenu = 'trading';
          this.rightMenu = 'other';
        } else if (val === '/dexExplorer') {
          this.navMenu = oldVal;
        } else if (val === '/User') {
          let newHost = window.location.href;
          if (newHost.endsWith('assets')) {
            this.rightMenu = 'assets';
          } else {
            this.rightMenu = 'order';
          }
          this.navMenu = 'other';
        } else if (val === '/BackupsAddress') {
          this.navMenu = 'other';
          this.rightMenu = 'other';
        }
      }
    },
    methods: {

      /**
       * 语言切换
       */
      selectLanguage() {
        this.lang = this.lang === 'en' ? 'cn' : 'en';
        this.langSvg = this.lang === 'en' ? cn : en;
        sessionStorage.setItem('lang', this.lang);
        this.$i18n.locale = this.lang;
      },

      /**
       * 导航切换
       * @param key
       */
      handleSelect(key) {
        //console.log(key);
        if (key === 'trading') {
          this.toUrl('trading');
          this.navMenu = '/trading/index'
        } else if (key === 'dexExplorer') {
          this.toUrl(EXPLORER_URL, '', 1);
          //this.navMenu= '/dexExplorer'
        } else if (key === 'assets') {
          this.toUrl('user', 'assets')
        } else if (key === 'order') {
          this.toUrl('user', 'order')
        } else if (key === 'login') {
          this.toUrl('newAddress', '', 0);
        } else if (key === 'backupsAddress') {
          this.toUrl('backupsAddress');
        } else if (key === 'signOut') {
          this.signOut();
        } else if (key === 'language') {
          this.selectLanguage();
        }
      },

      /**
       * 退出
       */
      signOut() {
        this.$confirm(this.$t('tips.tips12'), this.$t('tips.tips11'), {
          confirmButtonText: this.$t('backupsAddress.backupsAddress41'),
          cancelButtonText: this.$t('nav.signOut'),
          type: 'warning',
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false,
          center: true
        }).then(() => {
          this.toUrl('backupsAddress');
        }).catch(() => {
          this.$refs.password.showPassword(true);
        });
      },

      /**
       *  获取密码框的密码
       * @param password
       **/
      async passSubmit(password) {
        let isPassword = await passwordVerification(this.accountInfo, password);
        if (isPassword.success) {
          localStorage.removeItem('accountInfo');
          sessionStorage.removeItem('data');
          this.accountInfo = {};
          this.accountAddress = '';
          this.toUrl('newAddress')
        } else {
          this.$message({message: this.$t('tips.tips4'), type: 'error', duration: 3000});
        }
      },

      /**
       * @disc: 手机版菜单隐藏
       * @date: 2019-10-11 11:12
       * @author: Wave
       */
      hideMenu() {
        this.isMenu = false;
      },

      /**
       * url 连接
       * @param name
       * @param parameter
       * @param type
       */
      toUrl(name, parameter, type = 0) {
        //console.log(name, parameter, type);
        if (type === 0) {
          let newQuery = {};
          if (name === 'user') {
            newQuery = {orderID: parameter}
          }
          this.$router.push({
            name: name,
            query: newQuery
          })
        } else {
          window.open(name)
        }

      }
    }
  }
</script>

<style lang="less">
  @import "./../assets/css/style";

  .header {
    height: 49px;
    line-height: 48px;
    @media screen and (max-width: 1024px) {
      height: 60px;
      line-height: 60px;
    }

    .logo {
      width: 104px;
      margin: 7px 0 0 0;
      height: 42px;
      @media screen and (max-width: 1024px) {
        margin: 10px 0 0 5px;
        height: 40px;
      }

      img {
        width: 100px;
        @media screen and (max-width: 1024px) {
          width: 80px;
        }
      }
    }

    .nav {
      width: 1295px;
      height: 48px;
      @media screen and (max-width: 1200px) {
        width: 920px;
      }
      @media screen and (max-width: 1024px) {
        display: none;
      }

      .el-menu.el-menu--horizontal {
        border-bottom: 0;
        width: 850px;
        height: 47px;
        @media screen and (max-width: 1200px) {
          width: 680px;
        }

        .el-menu-item {
          height: 48px;
          line-height: 48px;
          padding: 0;
          margin: 0 25px;
          font-size: 16px;
          color: @Fcolour;

          &:hover {
            color: @Ncolour;
            background-color: transparent !important;
          }

          &:first-child {
            margin-left: 75px;
          }
        }

        .is-active {
          color: @Ncolour;
          border-bottom: 0 solid transparent;
          background-color: transparent !important;
        }
      }

      .user {
        width: auto;
        .user_menu {
          text-align: center;
          height: 47px;
          width: 300px;
          .el-menu-item {
            font-size: 14px;
            margin: 0 10px;
            float: right;
            background-color: #141627 !important;
            &:first-child {
              margin: 0 0 0 0;
            }
          }
          .language {
            margin: 0 0 0 0;
            img {
              width: 18px;
              height: 18px;
            }
          }
          .el-submenu {
            float: right;
            &:hover {
              background-color: transparent;
            }
            .el-submenu__title {
              line-height: 20px;
              height: 20px;
              margin: 12px 15px 0 6px;
              padding: 0;
              width: 25px;
              border: 0;
              color: #FFFFFF;
              &:hover {
                background-color: transparent;
              }
              i {
                color: #FFFFFF;
              }
              .el-icon-arrow-down {
                font-size: 0;
              }
            }
          }
        }

      }

      .landing {
        width: 40px;
        line-height: 60px;
        text-align: center;
        z-index: 99;
        position: relative;
        right: -30px;
      }
    }
  }

  .el-message-box__wrapper {
    .el-message-box__content {
      .el-message-box__message {
        p {
          color: red;
        }
      }
    }
  }
</style>
