<template>
  <div class="_bottom">
    <div class="_fl">
      节点：http://192.168.1.118:17003
    </div>
    <div class="_fr">高度：898989/565864</div>
  </div>

</template>

<script>
  //import {connect} from '@/api/util'

  export default {
    data() {
      return {
        urlPath: '',//当前路径
      };
    },
    created() {
    },
    mounted() {
      setInterval(() => {
        this.urlPath = this.$route.path
      }, 500);
    },
    destroyed() {
    },
    watch: {},
    methods: {

      /**
       * @disc: url 连接
       * @params: name, parameter, type
       * @date: 2019-08-22 14:26
       * @author: Wave
       */
      toUrl(name, parameter, type) {
        let newPath = connect(name, parameter, type);
        if (newPath.success) {
          this.$router.push(newPath.data);
        }
      },
    }
  }
</script>

<style lang="less">
  @import "./../assets/css/style";

  ._bottom {
    height: 30px;
    width: 100%;
    line-height: 30px;
    padding: 0 10px;
    position: fixed;
    bottom: 0;
  }
</style>
