<script setup lang="ts">

import {onMounted, ref} from "vue";
import type {SimxPluginHandler, SimxPluginHandlers} from "@/entity/extension.ts";
import {addGroup, getGroups} from "@/api/era/handler.ts";
import HandlerGroupForm from "@/form/HandlerGroupForm.vue";

const showGroupDialog = ref(false);

const props = defineProps({
  form: {
    type: Object as () => SimxPluginHandler,
    default: null
  }
})

// 当前所有的组
const groupList = ref([] as SimxPluginHandlers[])

const refreshGroupList = async () => {
  // 获取所有分组
  let data = await getGroups();
  groupList.value = data.data.records as SimxPluginHandlers[]
}
// 当用户点击创建新组按钮时（要展示创建组的表单）
const handlerCreateNewGroup = () => {
  showGroupDialog.value = true
}


// 确定创建一个新的组
const AddCustomGroup = async (group: SimxPluginHandlers) => {
  // 写到列表
  groupList.value.push({
    id: group.id,
    extensionId: group.extensionId,
    name: group.name,
    func: []
  })
  // 写到数据库
  await addGroup(group)
  props.form.groupId = group.id
  // 清空表单
  CleanCustomGroup()
}

const CleanCustomGroup = () => {
  showGroupDialog.value = false
}


onMounted(async () => {
  await refreshGroupList()
});

</script>

<template>
  <!--  创建组对话框  -->
  <el-dialog append-to-body label-width="auto" v-model="showGroupDialog" title="处理器组" width="800px">
    <HandlerGroupForm @AddCustomGroup="AddCustomGroup" @CleanCustomGroup="CleanCustomGroup"/>
  </el-dialog>
  <el-form ref="ruleFormRef"
           class="demo-form-inline" :model="form">
    <el-form-item label="处理器组别">
      <el-select v-model="form.groupId" placeholder="选择或创建一个处理器组">
        <el-option
            v-for="item in groupList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
        />
        <template #footer>
          <el-button type="success" @click="handlerCreateNewGroup">创建处理器组</el-button>
          <el-button type="primary" @click="refreshGroupList">刷新处理器组</el-button>
        </template>
      </el-select>
    </el-form-item>
    <el-form-item label="处理器标识">
      <el-input v-model="form.handler" placeholder="插件唯一标识，不可重复"/>
    </el-form-item>
    <el-form-item label="处理器名称">
      <el-input v-model="form.name" placeholder="插件显示名，不建议重复"/>
    </el-form-item>
    <el-form-item label="处理器描述">
      <el-input v-model="form.description" placeholder="插件显示名，不建议重复"/>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>