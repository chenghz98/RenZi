<template>

  <el-row type="flex" justify="space-between" align="middle" style="height: 40px ;width: 100%">
    <el-col><span>{{ treeNode.name }}</span></el-col>
    <el-col :span="4">
      <el-row type="flex" justify="space-between">
        <el-col><span>{{ treeNode.manager }}</span></el-col>
        <el-col>
          <el-dropdown @command="operateDepts">
            <span>
              操作
              <i class="el-icon-arrow-down" />
            </span>
            <!-- 具名插槽 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  name: 'TreeTools',
  components: {},
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    operateDepts(type) {
      if (type === 'add') {
        // 增加子部门
        this.$emit('addDept', this.treeNode)
      } else if (type === 'edit') {
        // 修改部门信息
        this.$emit('editDepts', this.treeNode)
      } else {
        // del删除部门
        this.$confirm('您是否确认删除该部门？', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        }).then(() => {
          return delDepartments(this.treeNode.id)
        }).then(() => {
          this.$emit('delDepts')
          this.$message.success('删除部门成功')
        })
      }
    }
  }
}
</script>
<style scoped lang="less"></style>
