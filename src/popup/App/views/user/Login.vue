<template>
  <div class="login">
    <div class="map">节点地图</div>
    <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" class="demo-ruleForm">
      <el-form-item label="" prop="pass">
        <el-input type="password" v-model="loginForm.pass" autocomplete="off" placeholder="请输入密码">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          pass: '',
        },
        loginRules: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            return false;
          }
        });
      },
    }
  }
</script>

<style lang="less">
  .login {
    .map {
      width: 100%;
      height: 300px;
    }
  }
</style>
