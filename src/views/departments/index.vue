<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools :tree-node="company" :is-root="true" />
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <tree-tools slot-scope="{ data }" :tree-node="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import { departments } from '@/api/departments'
export default {
  name: '',
  components: { TreeTools },
  props: {},
  data() {
    return {
      departs: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      company: {}
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getDepartmentsList()
  },
  mounted() {},
  methods: {
    async getDepartmentsList() {
      const result = await departments()
      this.company = { name: result.companyName, manager: '负责人' }
      this.departs = result.depts
      console.log(result)
    }
  }
}
</script>
<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
