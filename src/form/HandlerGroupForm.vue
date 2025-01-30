<script setup lang="ts">

import {onMounted, ref} from "vue";
import type {SimxPlugin, SimxPluginHandlers} from "@/entity/extension.ts";
import {getExtensionInfo} from "@/api/era/extensionInfo.ts";

// 新添加的组内容
const newGroupVal = ref({
  name: "",
  extensionId: "",
  id: "",
  func: []
} as SimxPluginHandlers);


const CleanCustomGroup = () => {
  emit("CleanCustomGroup");
  newGroupVal.value = {
    name: "",
    extensionId: "",
    id: "",
    func: []
  }
}

// 触发事件
const emit = defineEmits(["AddCustomGroup", "CleanCustomGroup"]);

onMounted(() => {
  // 获取所有插件
  getSimxPluginList();
});

// 所有插件
const simxPluginList = ref([] as SimxPlugin[]);

// 获取所有插件
const getSimxPluginList = () => {
  getExtensionInfo().then((res) => {
    simxPluginList.value = res;
  })
}

</script>

<template>
  <el-form label-position="top">
    <el-form-item label="归属插件">
      <el-select v-model="newGroupVal.extensionId" placeholder="请选择归属插件">
        <el-option
            v-for="item in simxPluginList"
            :key="item.id"
            :label="item.name + '(' + item.id + ')'"
            :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="组别标识">
      <el-input
          v-model="newGroupVal.id"
          class="option-input"
          placeholder="组标识，不可重复"
      />
    </el-form-item>
    <el-form-item label="组别名称">
      <el-input
          v-model="newGroupVal.name"
          class="option-input"
          placeholder="处理器组名称"
      />
    </el-form-item>
    <el-popconfirm
        confirm-button-text="确定"
        cancel-button-text="取消"
        title="确定继续创建?"
        @confirm="emit('AddCustomGroup', newGroupVal)"
    >
      <template #reference>
        <el-button type="primary">
          确定
        </el-button>
      </template>
    </el-popconfirm>
    <el-button @click="CleanCustomGroup">取消</el-button>
  </el-form>
</template>

<style scoped>

</style>