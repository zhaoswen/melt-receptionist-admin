<script setup lang="ts">

import {watch} from "vue";
import type {SimxPluginParam} from "@/entity/extension.ts";

const props = defineProps({
  currentParam: {
    type: Object as () => SimxPluginParam,
    default: null
  }
})

watch(() => props.currentParam, () => {
}, {deep: true});

// 可触发的事件
const emit = defineEmits(['submit'])

const typeOptions = [
  {
    label: '文本',
    value: 'String',
    disabled: false
  },
  {
    label: '数字',
    value: 'Number',
    disabled: false
  },
  {
    label: '选择',
    value: 'Select',
    disabled: false
  },
  {
    label: '多选',
    value: 'Checkbox',
    disabled: true
  },
  {
    label: '布尔',
    value: 'Boolean',
    disabled: false
  }
  ,
  {
    label: '日期',
    value: 'Date',
    disabled: false
  }
  ,
  {
    label: '时间',
    value: 'Time',
    disabled: false
  }
  ,
  {
    label: '日期时间',
    value: 'Datetime',
    disabled: false
  }
  ,
  {
    label: '对象',
    value: 'Object',
    disabled: true
  },
  {
    label: '数组',
    value: 'Array',
    disabled: true
  }
]

</script>

<template>
  <el-form class="demo-form-inline" :model="props.currentParam">
    <el-form-item label="标识">
      <el-input v-model="props.currentParam.key" placeholder="参数唯一标识，不可重复"/>
    </el-form-item>
    <el-form-item label="名称">
      <el-input v-model="props.currentParam.name" placeholder="参数显示名，不建议重复"/>
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="props.currentParam.desc" placeholder="参数描述信息"/>
    </el-form-item>
    <el-form-item label="类型">
      <el-select v-model="props.currentParam.type" default-first-option placeholder="参数类型">
        <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="默认">
      <el-input v-model="props.currentParam.default_value" placeholder="参数默认值"/>
    </el-form-item>
    <el-form-item label="必填">
      <el-switch
          v-model="props.currentParam.require"
          class="ml-2"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
      />
    </el-form-item>
    <el-form-item label="选项" v-show="props.currentParam.type === 'Select'">
      <el-input v-model="props.currentParam.options" placeholder="参数可选列表"/>
    </el-form-item>
    <el-button type="primary" @click="emit('submit')">确定</el-button>
    <el-button>取消</el-button>
  </el-form>
</template>

<style scoped>

</style>