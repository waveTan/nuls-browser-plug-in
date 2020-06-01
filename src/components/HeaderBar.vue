<template>
  <div class="_header">
    <div class="_fl"><img src="./../assets/img/logn.png"></div>
    <div class="_fr"><i class="el-icon-setting" @click="setDrawer=!setDrawer"></i></div>
  </div>
</template>

<script>
  /* import logo from '@/assets/img/logo.svg'
   import cn from '@/assets/img/cn.svg'
   import en from '@/assets/img/en.svg'*/

  export default {
    data() {
      return {
        //logoSvg: logo,
        //langSvg: en,
        //lang: sessionStorage.hasOwnProperty('lang') ? sessionStorage.getItem('lang') : 'en', //语言
      };
    },
    components: {},
    created() {
      /*this.$i18n.locale = this.lang;
      sessionStorage.setItem('lang', this.lang);*/
    },
    mounted() {

    },
    watch: {},
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
  ._header {
    height: 30px;
    border-bottom: 1px solid #c1c1c1;
    img {
      height: 20px;
      margin: 5px 0 0 10px;
    }
    .el-icon-setting {
      font-size: 20px;
      cursor: pointer;
      margin: 5px 10px 0 0;
    }
  }
</style>
