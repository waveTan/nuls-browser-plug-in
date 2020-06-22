<template>
  <div class="withdraw">
    <el-form :model="withdrawForm" status-icon :rules="withdrawRules" ref="withdrawForm" class="withdraw_form">
      <el-form-item label="from" prop="from">
        <el-inpu v-model="withdrawForm.from" autocomplete="off">
        </el-inpu>
      </el-form-item>
      <el-form-item label="to" prop="to">
        <el-input v-model="withdrawForm.to" autocomplete="off">
        </el-input>
      </el-form-item>
      <el-form-item label="金额" prop="amount">
        <div>余额:5555.2664 NULS</div>
        <el-input v-model.number="withdrawForm.amount">
        </el-input>
      </el-form-item>
      <div>手续费:0.001 NULS</div>
      <el-form-item>
        <el-button @click="resetForm('withdrawForm')">取消</el-button>
        <el-button type="primary" @click="submitForm('withdrawForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "withdraw"
  }
</script>

<style lang="less">

</style>
