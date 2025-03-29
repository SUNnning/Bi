<script setup>
import { ref, watch, watchEffect, toRef } from 'vue'
import AddChart from './AddChart.vue'
const props = defineProps({
  dashboardData: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['update:dashboardData'])

const dataShadow = ref({})

// 将 props.dashboardData 转换为响应式引用
const propsData = toRef(props, 'dashboardData')
// 监听props变化，更新本地数据
watchEffect(() => {
  dataShadow.value = propsData.value
})
// 监听本地数据变化，触发父组件更新
watch(dataShadow, (newVal) => {
  emit('update:dashboardData', newVal)
}, { deep: true })

</script>

<template>
  <div class="header-wrapper">
    <AddChart v-model:dashboardData="dataShadow"/>
  </div>
</template>

<style lang="less" scoped>
.header-wrapper {
  flex: 1;
  height: calc(100vh - 50px);
  background: #f79503;
}
</style>
