<template>
  <div class="bottom bg-gray" :style="urlPath==='/User' ? 'position:fixed;bottom:0px;':''">
    <div class="w1400">
      <ul class="font14">
        <li class="fl" @click="toUrl('http://nerve.network/','',1)">{{$t('bottom.website')}}</li>
        <li class="fl" @click="toUrl('https://github.com/NerveNetwork/','',1)">Github</li>
        <li class="fl" @click="toUrl('http://doc.nervedex.com/','',1)">Docs</li>
      </ul>
    </div>
  </div>

</template>

<script>
  import {connect} from '@/api/util'

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

  .bottom {
    height: 60px;
    width: 100%;
    /*position: fixed;
    z-index: 111;*/
    position: absolute;
    .w1400 {
      height: 100%;
      line-height: 60px;
      ul {
        li {
          padding: 0 10px;
          color: #dedede;
          cursor: pointer;
          &:first-child {
            padding: 0 10px 0 0;
          }
        }
      }
    }
  }
</style>
