<script setup>
import { ref } from 'vue'
import TreeLayer from './components/TreeLayer.vue'
import WorkPlace from './components/WorkPlace.vue'
import Tool from './components/Tool.vue'

import { fetchEditData } from '@/utils/apiService.js'

const dashboardData = ref({})
fetchEditData().then(res => {
  console.log('init success', res)
  dashboardData.value = res.data
}).catch((err) => {
  console.error('init error', err)
})
</script>

<template>
  <!-- <div class="design-header">header</div> -->
  <div class="design-wrapper">
    <TreeLayer v-model:dashboardData="dashboardData"/>
    <WorkPlace v-model:dashboardData="dashboardData"/>
    <Tool v-model:dashboardData="dashboardData"/>
  </div>
</template>

<style lang="less" scoped>
.design-header {
  height: 50px;
}
.design-wrapper {
  height: calc(100vh - 50px);
  display: flex;
}
</style>