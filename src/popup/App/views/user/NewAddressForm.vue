<template>
  <div class="new_address">
    <el-form :model="newForm" status-icon :rules="newRules" ref="newForm" class="new_form">
      <el-form-item label="请输入您的私钥" prop="key">
        <el-input type="textarea" v-model="newForm.key">
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="newForm.pass" autocomplete="off">
        </el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="newForm.checkPass" autocomplete="off">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="submitForm('newForm')">提交</el-button>
        <el-button size="small" @click="resetForm('newForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      let checkKey = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('私钥不能为空'));
        }
      };
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        newForm: {
          pass: '',
          checkPass: '',
          key: ''
        },
        newRules: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          key: [
            {validator: checkKey, trigger: 'blur'}
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="less">
  .new_address {
    .new_form {
      .el-form-item {
        margin-bottom: 20px;
        .el-form-item__label {
          line-height: 20px;
        }
      }
    }
  }

</style>
