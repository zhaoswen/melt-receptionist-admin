<template>
  <div class="home">
    <el-table show-overflow-tooltip :data="tableData" stripe style="width: 100%">
      <el-table-column label="名称" prop="name"/>
      <el-table-column label="处理器描述" prop="desc"/>
      <el-table-column label="处理器标识" prop="handler"/>
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
    <!--  创建处理器对话框  -->
    <el-dialog label-width="auto" v-model="showHandlerDialog" title="插件信息" width="800px">
      <!--   创建表单对话框   -->
      <HandlerForm :form="form"/>
      <ExtensionParams :handler-id="currentHandlerId"/>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showHandlerDialog = false">取消</el-button>
          <el-button type="primary" @click="handleFormSubmit">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue'
import type {SimxPlugin, SimxPluginHandler} from "@/entity/extension.ts";
import {Add, RefreshOne} from "@icon-park/vue-next";
import {ElMessageBox} from "element-plus";
import {error, success} from "@/tools/message.ts";
import {addHandler, deleteHandler, getHandler, getHandlerPage, updateHandler} from "@/api/era/handler.ts";
import ExtensionParams from "@/components/ExtensionParams.vue";
import HandlerForm from "@/form/HandlerForm.vue";
import {generateNumId} from "@/tools/IdTools.ts";


const tableData = ref([] as SimxPluginHandler[])
const showHandlerDialog = ref(false);
const currentHandlerId = ref(-1)

const form = reactive<SimxPluginHandler>({
  id: generateNumId(),
  groupId: "",
  handler: "",
  name: "",
  description: "",
  params: [],
})

// 是否为编辑模式
const isEdit = ref(false)

onMounted(async () => {
  // 刷新一下数据源
  await refresh()

})

// 刷新表单数据源
const refresh = async () => {
  tableData.value = await getHandlerPage()
}

// 添加一个新处理器
const handleAdd = () => {
  isEdit.value = false
  cleanForm()
  currentHandlerId.value = form.id
  // 打开添加处理器
  showHandlerDialog.value = !showHandlerDialog.value
}

const handleEdit = async (index: number, row: SimxPlugin) => {
  isEdit.value = true
  cleanForm()
  // 请求数据并填充到表单
  let data = await getHandler(row.id)
  if (data.success) {
    form.id = data.data.id
    form.groupId = data.data.groupId
    form.handler = data.data.handler
    form.name = data.data.name
    form.description = data.data.description
    form.params = []
    // 设置当前处理器id，便于编辑
    currentHandlerId.value = data.data.id
  }
  showHandlerDialog.value = true
}
const handleDelete = (index: number, row: SimxPlugin) => {
  console.log(index, row)
  ElMessageBox.confirm(
      '即将删除当前处理器信息，此操作不可逆',
      'Warning',
      {
        confirmButtonText: '了解并确认',
        cancelButtonText: '取消操作',
        type: 'warning',
      }
  )
      .then(async () => {
        deleteHandler(row.id).then(data => {
          console.log(data)
          if (data.code !== 200) {
            error("处理器删除失败")
          } else {
            success('处理器删除成功')
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

const handleFormSubmit = async () => {
  let res;
  if (isEdit.value) {
    res = await updateHandler(form)
    isEdit.value = false
    success('插件信息更新成功')
    form.handler = ""
    form.name = ""
    form.description = ""
    form.params = []
  } else {
    res = await addHandler(form)
    success('插件信息创建成功')
  }
  if (res.code === 200) {
    // 刷新一下数据源
    await refresh()
    // 关闭对话框
    showHandlerDialog.value = false
  }
  cleanForm()
}

const cleanForm = () => {
  form.groupId = ""
  form.id = generateNumId()
  form.handler = ""
  form.name = ""
  form.description = ""
  form.params = []
}


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

</style>