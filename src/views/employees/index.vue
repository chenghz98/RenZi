<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <template v-slot:before>
          <span slot="before">共有{{ page.total }}条数据</span>
        </template>
        <template v-slot:after>
          <el-button
            size="small"
            type="primary"
            @click="$router.push('/import')"
          >导入Excel</el-button>
          <el-button
            size="small"
            type="danger"
            @click="exportData"
          >导出Excel</el-button>
          <el-button
            size="small"
            @click="showDialog = true"
          >新增员工</el-button>
        </template>
      </page-tools>
      <el-card>
        <el-table border :data="employeeList">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="头像" prop="staffPhoto">
            <template v-slot="{ row }">
              <img
                v-imagerror="require('@/assets/common/bigUserHeader.png')"
                :src="row.staffPhoto"
                alt=""
                style="border-radius: 50%; width: 100px; height: 100px; padding: 10px"
                @click="showQrCode(row.staffPhoto)"
              >
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <!-- 作用域插槽 -->
            <template slot-scope="{ row }">{{
              row.timeOfEntry | formatDate
            }}</template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template slot-scope="{ row }">
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push(`/employees/detail/${row.id}`)"
              >查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="editRole(row.id)">角色</el-button>
              <el-button
                type="text"
                size="small"
                @click="delEmploye(row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
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
      <el-dialog
        title="生成二维码"
        :visible.sync="showCodeDialog"
        width="30%"
      >
        <el-row type="flex" justify="center">
          <canvas ref="myCanvas" />
        </el-row>
      </el-dialog>

    </div>
    <assign-role ref="assignRole" :show-roles-dialog.sync="showRolesDialog" :user-id="userId" />
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import AddEmployee from './components/add-employee'
import { formatDate } from '@/filters'
import QrCode from 'qrcode'
import AssignRole from './assign-role'
export default {
  name: '',
  components: { AddEmployee, AssignRole },
  props: {},

  data() {
    return {
      page: {
        page: 1,
        total: 0,
        size: 10
      },
      employeeList: [],
      showDialog: false,
      showCodeDialog: false,
      showRolesDialog: false,
      userId: null
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
          this.page.page = this.page.page > 1 ? this.page.page - 1 : 1
        }
      } catch (error) {
        console.log(error)
      }
    },
    exportData() {
      const headers = {
        姓名: 'username',
        手机号: 'mobile',
        入职日期: 'timeOfEntry',
        聘用形式: 'formOfEmployment',
        转正日期: 'correctionTime',
        工号: 'workNumber',
        部门: 'departmentName'
      }

      import('@/vendor/Export2Excel').then(async excel => {
        const { rows } = await getEmployeeList({
          page: 1,
          size: this.page.total
        })
        const data = this.formatJson(headers, rows)
        const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
        const merges = ['A1:A2', 'B1:F1', 'G1:G2']
        excel.export_json_to_excel({
          header: Object.keys(headers), // 表头 必填
          data: data, // 具体数据 必填
          filename: '员工工资表', // 非必填
          multiHeader,
          merges
        })
      })
    },
    formatJson(headers, rows) {
      return rows.map(item => {
        return Object.keys(headers).map(key => {
          if (
            headers[key] === 'timeOfEntry' ||
            headers[key] === 'correctionTime'
          ) {
            return formatDate(item[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            var obje = EmployeeEnum.hireType.find(
              obj => obj.id === item[headers[key]]
            )
            return obje ? obje.value : '未知'
          }
          return item[headers[key]]
        })
      })
    },
    showQrCode(url) {
      if (url) {
        this.showCodeDialog = true
        // nexttick可以在上一次数据更新完毕后，并页面渲染完成后执行
        this.$nextTick(() => {
          QrCode.toCanvas(this.$refs.myCanvas, url)
        })
      }
    },
    async editRole(id) {
      this.userId = id
      // 父组件通过$refs调用子组件的getUserDetailByid方法并传入参数userId
      await this.$refs.assignRole.getUserDetailById(id)
      this.showRolesDialog = true
    }

  }
}
</script>
<style scoped lang="scss"></style>
