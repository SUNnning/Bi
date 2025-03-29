<script setup>
import Header from './components/Header.vue'
import TreeLayer from './components/TreeLayer.vue'
import Tool from './components/Tool.vue'
</script>

<template>
  <div class="design-wrapper">
    <Header />
    <div class="operate-wrapper">
      <TreeLayer />
      <Tool />
    </div>
  </div>
</template>

<style lang="less" scoped>
.design-wrapper {
  height: calc(100vh - 50px);
  background: gold;
  .operate-wrapper {
    height: calc(100% - 42px);
    display: flex;
    justify-content: space-between;
  }
}
</style>
