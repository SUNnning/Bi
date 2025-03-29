<script setup>
const list = [
  { name: '标题1', value: 0 },
  { name: '标题1', value: 1 },
  { name: '标题1', value: 2 },
  { name: '标题1', value: 3 },
  { name: '标题1', value: 4 },
  { name: '标题1', value: 5 },
  { name: '标题1', value: 6 },
]
</script>

<template>
  <div class="wrapper">
    <ul>
      <li v-for="l in list" :key="l.value">
        {{ l.name }}
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.wrapper {
  height: 100%;
  width: 200px;
  background: #9599a3;
}
</style>
