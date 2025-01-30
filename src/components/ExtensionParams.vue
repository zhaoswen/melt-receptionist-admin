<script lang="ts" setup>

import type {SimxPluginParam} from "@/entity/extension.ts";
import {onMounted, ref, watch} from "vue";
import {addParam, deleteParam, getParamById, getParamsByHandlerId, updateParam} from "@/api/era/params.ts";
import HandlerParamsForm from "@/form/HandlerParamsForm.vue";
import {error, success} from "@/tools/message.ts";
import {ElMessageBox} from "element-plus";
import {generateNumId} from "@/tools/IdTools.ts";

const tableData = ref([] as SimxPluginParam[])

// 是否为编辑模式
const isEdit = ref(false)


const showParamsDialog = ref(false)

// 当前操作的参数
const currentParam = ref({} as SimxPluginParam)

const props = defineProps({
  handlerId: {
    type: String,
    default: null
  }
})

const refresh = async () => {
  tableData.value.length = 0
  // 尝试加载参数列表
  getParamsByHandlerId(props.handlerId).then(res => {
    if (res.code !== 200) {
      return
    }
    res.data.map((item: any) => {
      tableData.value.push({
        id: item.id,
        key: item.paramKey,
        name: item.paramName,
        desc: item.paramDescription,
        type: item.paramType,
        default_value: item.paramDefaultValue,
        require: item.paramRequire,
        options: item.paramOptions
      })
    })
  })
}

watch(props, async () => {
  // 如果有传入插件id
  if (props.handlerId != null) {
    await refresh()
  } else {
    tableData.value.length = 0
  }
}, {deep: true})

onMounted(async () => {
  // 如果有传入插件id
  if (props.handlerId != null) {
    await refresh()
  } else {
    tableData.value.length = 0
  }
});

// 新增参数
const handleAdd = () => {
  isEdit.value = false
  cleanForm();
  showParamsDialog.value = true
}

// 触发方法
const handleEdit = (row: any) => {
  cleanForm();
  isEdit.value = true
  // 尝试请求当前参数信息
  const id = row.id
  getParamById(id).then(res => {
    if (res.code !== 200) {
      error("获取参数信息失败：" + res.msg)
      return
    }
    currentParam.value = {
      id: res.data.id,
      key: res.data.paramKey,
      name: res.data.paramName,
      desc: res.data.paramDescription,
      type: res.data.paramType,
      default_value: res.data.paramDefaultValue,
      require: res.data.paramRequire,
      options: res.data.paramOptions
    }
  })
  // 打开表单对话框
  showParamsDialog.value = true
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm(
      '即将删除当前处理器参数信息，此操作不可逆',
      'Warning',
      {
        confirmButtonText: '了解并确认',
        cancelButtonText: '取消操作',
        type: 'warning',
      }
  )
      .then(async () => {
        // 调用删除接口
        deleteParam(row.id).then(res => {
          if (res.code !== 200) {
            error("删除参数失败：" + res.msg)
            return
          }
          success('参数删除成功')
          refresh()
        })
      })
      .catch(() => {
      })

}

const onSubmit = () => {
  if (currentParam.value.options) {
    try {
      currentParam.value.options = JSON.stringify(JSON.parse(currentParam.value.options))
    } catch (e: any) {
      error("参数选项格式错误：" + e)
      return
    }
  } else {
    // 给一个默认值
    currentParam.value.options = "[]"
  }
  if (isEdit.value) {
    // 调用更新接口
    updateParam(currentParam.value, props.handlerId).then(res => {
      if (res.code !== 200) {
        error("更新参数失败：" + res.msg)
        return
      }
      showParamsDialog.value = false
      refresh()
      success('参数更新成功')
      cleanForm();
    })
  } else {
    addParam(currentParam.value, props.handlerId).then(res => {
      if (res.code !== 200) {
        error("创建参数失败：" + res.msg)
        return
      }
      showParamsDialog.value = false
      refresh()
      success('参数创建成功')
      cleanForm();
    })
  }
}

const cleanForm = () => {
  currentParam.value = {
    id: generateNumId(),
    key: "",
    name: "",
    desc: "",
    type: "",
    default_value: "",
    require: false,
    options: ""
  }
}


</script>

<template>
  <el-dialog append-to-body label-width="auto" v-model="showParamsDialog" title="参数配置" width="800px">
    <HandlerParamsForm :currentParam="currentParam" @submit="onSubmit"/>
  </el-dialog>
  <div>
    <div>
      <el-button type="success" @click="handleAdd">新增参数</el-button>
      <el-button type="primary" @click="refresh">刷新列表</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" show-overflow-tooltip>
      <el-table-column prop="key" label="键名"></el-table-column>
      <el-table-column prop="name" label="显示名"></el-table-column>
      <el-table-column prop="desc" label="描述"></el-table-column>
      <el-table-column prop="require" label="必填">
        <template #default="scope">
          <el-tag v-if="scope.row.require" type="success">是</el-tag>
          <el-tag v-else type="warning">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="default_value" label="默认值"></el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" width="130px">
        <template #default="scope">
          <el-button link type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button link type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<style scoped>

</style>