<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 根节点 公司名称 -->
        <tree-tools :tree-node="company" :is-root="true" @addDept="addDept" />
        <!-- 树形组织结构 -->
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <tree-tools
            slot-scope="{ data }"
            :tree-node="data"
            @addDept="addDept"
            @delDepts="getDepartmentsList"
            @editDepts="editDepts"
          />
        </el-tree>
      </el-card>
    </div>
    <add-dept
      ref="addDept"
      :show-dialog.sync="showDialog"
      :tree-node="node"
      @addDepts="getDepartmentsList"
    />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import { departments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import AddDept from './components/add-dept'
export default {
  name: '',
  components: { TreeTools, AddDept },
  props: {},
  data() {
    return {
      departs: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      company: {},
      showDialog: false,
      node: null
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getDepartmentsList()
  },
  mounted() {},
  methods: {
    // 获取组织结构列表
    async getDepartmentsList() {
      const result = await departments()
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      // 调用utils里封装的方法将扁平结构的组织结构列表转换为树形结构
      this.departs = tranListToTreeData(result.depts, '')
      // console.log(result)
    },
    addDept(node) {
      this.showDialog = true
      this.node = node
    },
    editDepts(node) {
      this.showDialog = true
      this.node = node // 存储传递过来的node数据
      // 我们需要在这个位置 调用子组件的方法
      // 父组件 调用子组件的方法
      this.$refs.addDept.getDepartDetail(node.id) // 直接调用子组件中的方法 传入一个id
    }
  }
}
</script>
<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
