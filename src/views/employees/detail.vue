<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="登录账户设置" name="first">
            <el-form ref="userInfo" :model="userInfo" :rules="rules" label-width="120px" style="margin-left: 120px; margin-top:30px">
              <el-form-item label="姓名" prop="username">
                <el-input v-model="userInfo.username" type="text" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码" prop="password2">
                <el-input v-model="userInfo.password2" type="password" style="width:300px" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUserInfo">提交</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="second">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印个人基本信息">
                <router-link :to="`/employees/print/${userId}?type=personal`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <!-- <user-info /> -->
            <component :is="UserComponent" />
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="third">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印个人基本信息">
                <router-link :to="`/employees/print/${userId}?type=job`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <component :is="JobComponent" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import UserInfo from './components/user-info'
import JobInfo from './components/job-info'
export default {
  name: '',
  components: { UserInfo, JobInfo },
  props: {},
  data() {
    return {
      UserComponent: 'user-info',
      JobComponent: 'job-info',
      userId: this.$route.params.id,
      activeName: 'first',
      userInfo: {
        username: '',
        password2: ''
      },
      rules: {
        username: [
          { required: true, message: '员工姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '姓名为一到四位', trigger: 'blur' }
        ],
        password2: [{ required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 12, message: '密码为6-12位', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getUserName()
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    async getUserName() {
      this.userInfo = await getUserDetailById(this.userId)
    },
    async saveUserInfo() {
      try {
        await this.$refs.userInfo.validate()
        await saveUserDetailById({ ...this.userInfo, password: this.userInfo.password2 })
        this.$message.success('保存成功')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style scoped lang="scss"></style>
