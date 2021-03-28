<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="登录账户设置" name="first">
            <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
              <el-form-item label="姓名" prop="pass">
                <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
              </el-form-item>
              <el-form-item label="密码" prop="checkPass">
                <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="岗位信息" name="third">角色管理</el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      activeName: 'first',
      ruleForm: {},
      rules: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style scoped lang="scss"></style>
