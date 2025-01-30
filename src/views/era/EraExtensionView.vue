<template>
  <div class="home">
    <el-table show-overflow-tooltip :data="tableData" stripe style="width: 100%">
      <el-table-column label="标识符" prop="id"/>
      <el-table-column label="名称" prop="name"/>
      <el-table-column label="插件版本" prop="version"/>
      <el-table-column label="更新日期" prop="updateDate"/>
      <el-table-column label="插件作者" prop="author"/>
      <el-table-column label="作者邮箱" prop="email"/>
      <el-table-column label="插件主页" prop="homepage"/>
      <el-table-column label="开源协议" prop="license"/>
      <el-table-column align="right">
        <template #header>
          <el-button @click="handleAdd" type="primary" link :icon="Add"/>
          <el-button @click="refresh" type="primary" link :icon="RefreshOne"/>
        </template>
        <template #default="scope">
          <el-button link type="primary" @click="handleEdit(scope.$index, scope.row)">
            修改
          </el-button>
          <el-button
              type="danger" link
              @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
          :page-size="20"
          :pager-count="11"
          background
          layout="prev, pager, next"
          :total="1000"
      />
    </div>
    <el-dialog label-width="auto" v-model="showExtensionDialog" title="插件信息" width="1000px">
      <el-form inline ref="ruleFormRef" fit-input-width :rules="rules" style="max-width: 1000px"
               class="demo-form-inline" abel-position="top" :model="form">
        <el-form-item label="插件标识">
          <el-input v-model="form.id" :disabled="isEdit" placeholder="插件唯一标识，不可重复"/>
        </el-form-item>
        <el-form-item label="插件名称">
          <el-input v-model="form.name" placeholder="插件显示名，不建议重复"/>
        </el-form-item>
        <el-form-item label="插件描述">
          <el-input v-model="form.description" placeholder="插件功能描述"/>
        </el-form-item>
        <el-form-item label="插件版本">
          <el-input v-model="form.version" placeholder="插件发行版本"/>
        </el-form-item>
        <el-form-item label="插件作者">
          <el-input v-model="form.author" placeholder="个人或组织名称"/>
        </el-form-item>
        <el-form-item label="作者邮箱">
          <el-input v-model="form.email" placeholder="关联邮箱"/>
        </el-form-item>
        <el-form-item label="插件主页">
          <el-input v-model="form.homepage" placeholder="关联插件文档地址"/>
        </el-form-item>
        <el-form-item label="插件许可">
          <el-select allow-create v-model="form.license" placeholder="使用许可">
            <el-option label="商业许可" value="none"/>
            <el-option label="测试许可" value="test"/>
            <el-option label="非商用许可" value="non-commercial"/>
            <el-option label="MIT" value="mit"/>
            <el-option label="GPL V3" value="gplv3"/>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showExtensionDialog = false">取消</el-button>
          <el-button type="primary" @click="handleFormSubmit(ruleFormRef)">
            创建
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue'
import type {SimxPlugin} from "@/entity/extension.ts";
import {addExtension, deleteExtension, getExtension, getExtensionInfo, updateExtension} from "@/api/era/extensionInfo.ts";
import {Add, RefreshOne} from "@icon-park/vue-next";
import {ElMessageBox, type FormInstance, type FormRules} from "element-plus";
import {error, success} from "@/tools/message.ts";

const showExtensionDialog = ref(false);
// 表单实例
const ruleFormRef = ref<FormInstance>()

// 是否为编辑模式
const isEdit = ref(false)

onMounted(async () => {
  // 刷新一下数据源
  await refresh()
})

const form = reactive<SimxPlugin>({
  id: '',
  name: '',
  description: '',
  version: '',
  update_date: Date.now().toString(),
  author: '',
  email: '',
  homepage: '',
  license: 'test'
})

const rules = reactive<FormRules<SimxPlugin>>({
  name: [
    {required: true, message: '此字段为必填', trigger: 'blur'},
  ],
})

// 刷新表单数据源
const refresh = async () => {
  tableData.value = await getExtensionInfo()
}

// 添加一个新插件
const handleAdd = () => {
  // 打开添加插件对话框
  showExtensionDialog.value = !showExtensionDialog.value
}

const handleEdit = async (index: number, row: SimxPlugin) => {
  isEdit.value = true
  // 请求数据并填充到表单
  let data = await getExtension(row.id)
  if (data.success) {
    form.id = data.data.id
    form.name = data.data.name
    form.description = data.data.description
    form.version = data.data.version
    form.update_date = data.data.update_date
    form.author = data.data.author
    form.email = data.data.email
    form.homepage = data.data.homepage
    form.license = data.data.license
  }
  console.log("data", data)
  showExtensionDialog.value = true
}
const handleDelete = (index: number, row: SimxPlugin) => {
  console.log(index, row)
  ElMessageBox.confirm(
      '即将删除当前插件信息，此操作不可逆',
      'Warning',
      {
        confirmButtonText: '了解并确认',
        cancelButtonText: '取消操作',
        type: 'warning',
      }
  )
      .then(async () => {
        deleteExtension(row.id).then(data => {
          console.log(data)
          if (data.code !== 200) {
            error("插件删除失败")
          } else {
            success('插件删除成功')
            // 刷新一下数据源
            refresh()
          }
        }).catch((e: any) => {
          console.log(e)
        })
      })
      .catch(() => {
      })
}

const handleFormSubmit = async (formEl: FormInstance | undefined) => {
  // 校验表单
  if (!formEl) {
    return;
  }
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
  console.log(form)
  let res;
  if (isEdit.value) {
    res = await updateExtension(form)
    isEdit.value = false
    success('插件信息更新成功')
    form.id = ""
    form.name = ""
    form.description = ""
    form.version = ""
    form.update_date = ""
    form.author = ""
    form.email = ""
    form.homepage = ""
    form.license = "test"
  } else {
    res = await addExtension(form)
    success('插件信息创建成功')
  }
  if (res.code === 200) {
    // 刷新一下数据源
    await refresh()
    // 关闭对话框
    showExtensionDialog.value = false
  }
}

const tableData = ref([] as SimxPlugin[])
</script>

<style scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-between;
}

.pagination {
  display: flex;
  justify-content: end;
  padding-right: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
  text-align: center;
}

.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>