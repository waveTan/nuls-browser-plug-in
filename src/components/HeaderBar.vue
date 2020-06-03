<template>
  <div class="_header">
    <div class="_fl"><img @click="handleSelect('home')" class="_click" src="./../assets/img/logn.png"></div>
    <div class="_fr"><i class="el-icon-menu" @click="showMenu"></i></div>
    <el-drawer title="" :visible.sync="navDrawer" :with-header="false" size="35%">
      <el-menu default-active="navActive" @select="handleSelect" class="_menu">
        <el-menu-item index="home">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="user">
          <i class="el-icon-s-custom"></i>
          <span slot="title">账户管理</span>
        </el-menu-item>
        <el-menu-item index="node">
          <i class="el-icon-s-opportunity"></i>
          <span slot="title">服务节点</span>
        </el-menu-item>
        <!--<el-menu-item index="4">
          <span slot="title">语言</span>
        </el-menu-item>-->
      </el-menu>
      <div class="language _click" @click="selectLanguage"> {{this.lang === 'en' ? '中文' : 'EN'}}</div>
    </el-drawer>
  </div>
</template>

<script>
  /* import logo from '@/assets/img/logo.svg'
   import cn from '@/assets/img/cn.svg'
   import en from '@/assets/img/en.svg'*/

  export default {
    data() {
      return {
        navDrawer: false,//导航显示抽屉
        navActive: 'home',
        lang: sessionStorage.hasOwnProperty('lang') ? sessionStorage.getItem('lang') : 'en', //语言
        //logoSvg: logo,
        //langSvg: en,

      };
    },
    components: {},
    created() {
      this.$i18n.locale = this.lang;
      sessionStorage.setItem('lang', this.lang);
    },
    mounted() {

    },
    watch: {},
    methods: {

      /**
       * @disc: 显示导航
       * @date: 2020-06-01 16:31
       * @author: Wave
       */
      showMenu() {
        this.navDrawer = !this.navDrawer;
      },

      /**
       * 语言切换
       */
      selectLanguage() {
        this.lang = this.lang === 'en' ? 'cn' : 'en';
        sessionStorage.setItem('lang', this.lang);
        this.$i18n.locale = this.lang;
        this.navDrawer = false;
      },

      /**
       * 导航切换
       * @param key
       */
      handleSelect(key) {
        //console.log(key);
        this.navDrawer = false;
        if (key === 'home') {
          this.toUrl('home', '', 0);
        } else if (key === 'user') {
          this.toUrl('user', '', 0);
        } else if (key === 'backupsAddress') {
          this.toUrl('backupsAddress');
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
    .el-icon-menu {
      font-size: 20px;
      cursor: pointer;
      margin: 5px 10px 0 0;
      color: #06ba63;
    }

    ._menu {
      .el-menu-item {
        height: 40px;
        line-height: 40px;
      }
    }
    .language {
      height: 40px;
      line-height: 40px;
      padding: 0 0 0 40px;
    }
  }
</style>
