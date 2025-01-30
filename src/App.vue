<template>
  <div class="app">
    <div class="title_bar">
      <!--   主标题   -->
      <div class="title">Receptionist Admin</div>
      <!--   用户头像   -->
      <div class="avatar">
        <el-avatar shape="square" :src="user"/>
      </div>
    </div>
    <el-row class="row">
      <el-col :span="4" class="menu-col">
        <el-menu
            default-active="/era/extension"
            router
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            style="height: 100%;"
        >
          <el-menu-item index="1">
            <el-icon>
              <icon-menu/>
            </el-icon>
            <span>仪表盘</span>
          </el-menu-item>
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <setting/>
              </el-icon>
              <span>配置管理</span>
            </template>
            <el-menu-item-group title="Era 设计器">
              <el-menu-item index="/era/extension">插件管理</el-menu-item>
              <el-menu-item index="/era/handler">Era 处理器</el-menu-item>
              <el-menu-item index="1-3">Era 服务</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Simx 引擎">
              <el-menu-item index="1-4">引擎配置</el-menu-item>
              <el-menu-item index="1-5">扩展配置</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="3">
            <el-icon>
              <setting/>
            </el-icon>
            <span>模板管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <setting/>
            </el-icon>
            <span>应用管理</span>
          </el-menu-item>
          <el-menu-item index="5">
            <el-icon>
              <setting/>
            </el-icon>
            <span>版本管理</span>
          </el-menu-item>
          <el-menu-item index="6">
            <el-icon>
              <setting/>
            </el-icon>
            <span>安全管理</span>
          </el-menu-item>
          <el-menu-item index="7">
            <el-icon>
              <setting/>
            </el-icon>
            <span>数据管理</span>
          </el-menu-item>
          <el-menu-item index="8">
            <el-icon>
              <setting/>
            </el-icon>
            <span>授权管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <router-view/>
        <el-backtop :right="100" :bottom="100"/>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import {Menu as IconMenu, Setting,} from '@element-plus/icons-vue'
import user from "@/assets/default_user.jpg"

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100%;
}

.title_bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-items: stretch;
  border-bottom: rgba(225, 225, 225, 0.92) 1px solid;
}

.title {
  display: flex;
  text-align: left;
  justify-content: stretch;
  align-items: stretch;
  padding: 20px 20px;
  font-size: 25px;
  font-weight: bold;
  font-family: 'dingtalk', serif;
}

.avatar {
  margin-right: 15px;
}

.row {
  height: 100%;
}

.menu-col {
  height: 100%;
}
</style>
