<template>
  <div id="app" class="_app">
    <HeaderBar>
    </HeaderBar>
    <router-view>
    </router-view>
    <BottomBar>
    </BottomBar>
  </div>
</template>

<script>
  import HeaderBar from './../../components/HeaderBar'
  import BottomBar from './../../components/BottomBar'

  export default {
    data() {
      return {}
    },
    created() {
    },
    mounted() {
      /*
      if (!localStorage.hasOwnProperty('accountInfo')) {
        this.$router.push({
          name: 'newAddress',
        })
      }
      */
    },
    watch: {},
    computed: {},
    components: {HeaderBar, BottomBar},
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
    }
  }
</script>

<style lang="less">
  @import "./../../assets/css/base.less";

  ._app {
    width: 25rem;
    height: 35rem;
  }
</style>
