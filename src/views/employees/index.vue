<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <template v-slot:before>
          <span slot="before">共有{{ page.total }}条数据</span>
        </template>
        <template v-slot:after>
          <el-button size="small" type="primary">导入Excel</el-button>
          <el-button size="small" type="danger">导出Excel</el-button>
          <el-button size="small" @click="showDialog=true">新增员工</el-button>
        </template>
      </page-tools>
      <el-card>
        <el-table border :data="employeeList">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column label="聘用形式" sortable="" prop="formOfEmployment" :formatter="formatEmployment" />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <!-- 作用域插槽 -->
            <template slot-scope="{ row }">{{ row.timeOfEntry | formatDate }}</template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template slot-scope="{ row }">
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delEmploye(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination
            layout="prev, pager, next"
            :page-size="page.size"
            :current-page="page.page"
            :total="page.total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
      <add-employee :show-dialog.sync="showDialog" />
    </div>
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import AddEmployee from './components/add-employee'
export default {
  name: '',
  components: { AddEmployee },
  props: {},
  data() {
    return {
      page: {
        page: 1,
        total: 0,
        size: 10
      },
      employeeList: [],
      showDialog: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getEmployeeList()
  },
  mounted() {},
  methods: {
    changePage(newPage) {
      this.page.page = newPage
      this.getEmployeeList()
    },
    async getEmployeeList() {
      const { total, rows } = await getEmployeeList(this.page)
      // console.log(total, rows)
      this.page.total = total
      this.employeeList = rows
    },
    formatEmployment(row, column, cellValue, index) {
      // 要去找 1所对应的值
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    async delEmploye(id) {
      try {
        await this.$confirm('请确认是否删除')
        await delEmployee(id)
        this.getEmployeeList()
        if (document.querySelectorAll('.el-card tbody tr').length === 1) {
          this.page.page = (this.page.page > 1 ? this.page.page - 1 : 1)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style scoped lang="scss"></style>
