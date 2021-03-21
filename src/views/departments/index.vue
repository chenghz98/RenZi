<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-row type="flex" justify="space-between">
          <el-col><span>江苏传智播客学院有限公司</span></el-col>
          <el-col :span="4">
            <el-row type="flex" justify="space-between">
              <el-col><span>负责人</span></el-col>
              <el-col>
                <el-dropdown>
                  <span>
                    操作
                    <i class="el-icon-arrow-down" />
                  </span>
                  <!-- 具名插槽 -->
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                    <el-dropdown-item>删除部门</el-dropdown-item>
                    <el-dropdown-item>修改部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
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
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="less"></style>
