<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- 角色管理 -->
          <el-tab-pane label="角色管理" name="first">
            <el-row style="height:60px">
              <el-button
                type="primary"
                size="small"
                icon="el-icon-plus"
                @click="dialogFormVisible=true"
              >新增用户</el-button>
            </el-row>
            <el-table :data="roleList" border style="width: 100%">
              <el-table-column align="center" type="index" label="序号" width="120" />
              <el-table-column align="center" prop="name" label="角色名" width="240" />
              <el-table-column align="center" prop="description" label="描述" />
              <el-table-column align="center" label="操作">
                <template slot-scope="{ row }">
                  <el-button
                    type="success"
                    size="small"
                  >分配权限</el-button>
                  <el-button
                    type="primary"
                    size="small"
                    @click="editRole(row.id)"
                  >编辑</el-button>
                  <el-button
                    type="danger"
                    size="small"
                    @click="delRole(row.id)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="end" align="middle" style="height: 60px">
              <!-- 分页 -->
              <el-pagination
                layout="prev, pager, next"
                :total="page.total"
                :page-size="page.pagesize"
                :current-page="page.page"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="用户信息" name="second">
            <el-form label-position="right" label-width="80px">
              <el-form-item label="企业名称">
                <el-input v-model="formData.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input v-model="formData.companyPhone" disabled style="width:400px" />
              </el-form-item>
              <el-form-item v-model="formData.mailbox" label="邮箱">
                <el-input disabled style="width:400px" />
              </el-form-item>
              <el-form-item v-model="formData.remarks" label="备注">
                <el-input type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!-- 弹窗 -->
      <el-dialog :title="showTitle" :visible="dialogFormVisible" @close="btnCancel">
        <el-form ref="roleForm" :model="roleForm" :rules="rules">
          <el-form-item label="角色名称" label-width="180px" prop="name">
            <el-input v-model="roleForm.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="角色描述" label-width="180px" prop="description">
            <el-input v-model="roleForm.description" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="btnCancel">取 消</el-button>
          <el-button type="primary" @click="changeRole">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, deleteRole, getRoleDetail, addRole, updateRole } from '@/api/setting'
import { mapGetters } from 'vuex'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      activeName: 'first',
      roleList: [],
      page: {
        // 放置页码及相关数据
        page: 1,
        pagesize: 10,
        total: 0 // 记录总数
      },
      formData: {},
      dialogFormVisible: false,
      roleForm: {},
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      },
      showTitle: '新增角色'
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  watch: {},
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page)
      // console.log(total, rows)
      this.page.total = total
      this.roleList = rows
    },
    changePage(newpage) {
      this.page.page = newpage
      this.getRoleList()
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    },
    async delRole(id) {
      try {
        await this.$confirm('请确认是否删除该角色')
        await deleteRole(id)
        this.getRoleList() // 重新加载数据
        this.$message.success('删除角色成功')
      } catch (error) {
        // this.$message.fail('删除失败')
        console.log(error)
      }
      if (document.querySelectorAll('.el-card tbody tr').length === 1) {
        this.page.page = (this.page.page > 1 ? this.page.page - 1 : 1)
      }
    },
    async editRole(id) {
      this.roleForm = await getRoleDetail(id)
      // console.log(a)
      this.dialogFormVisible = true
      this.showTitle = '编辑角色信息'
    },
    async changeRole() {
      try {
        await this.$refs.roleForm.validate()
        // 只有校验通过的情况下 才会执行await的下方内容
        // roleForm这个对象有id就是编辑 没有id就是新增
        if (this.roleForm.id) {
          await updateRole(this.roleForm)
        } else {
          await addRole(this.roleForm)
        }
        // 重新拉取数据
        this.getRoleList()
        this.$message.success('操作成功')
        this.dialogFormVisible = false // 关闭弹层  =>  触发el-dialog的
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      this.roleForm = {
        name: '',
        description: ''
      }
      this.showTitle = '新增角色'
      // 移除校验
      this.$refs.roleForm.resetFields()
      this.dialogFormVisible = false
    }
  }
}
</script>
<style scoped lang="less"></style>
