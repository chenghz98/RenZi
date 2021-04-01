<template>
  <el-dialog
    title="角色管理"
    :visible="showRolesDialog"
    @close="btnCancel"
  >
    <el-row>
      <el-checkbox-group v-model="roleIds">
        <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
    </el-row>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="assignRoles()">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  name: '',
  components: {},
  props: {
    showRolesDialog: {
      type: Boolean,
      default: false
    },
    // 用户的id 用来查询当前用户的角色信息
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      checkList: [],
      roleList: [],
      roleIds: []

    }
  },
  computed: {},
  watch: {},
  created() {
    this.getRoleList()
  },
  mounted() {},
  methods: {
    async getRoleList() {
      const { rows } = await getRoleList()
      this.roleList = rows
      console.log(this.roleList)
    },
    // userId是父组件传过来通过props接收,无法用this.userIdc传入，需在父组件中调用该方法并传入id
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id)
      this.roleIds = roleIds // 赋值本用户的角色
    },
    async assignRoles() {
      await assignRoles({ id: this.userId, roleIds: this.roleIds })
      //   关闭窗体
      this.$emit('update:showRolesDialog', false)
    },
    btnCancel() {
      this.roleIds = [] // 清空原来的数组
      //   关闭窗体
      this.$emit('update:showRolesDialog', false)
    }
  }
}
</script>
<style scoped lang="less"></style>
