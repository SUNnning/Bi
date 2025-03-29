<script setup>
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons-vue';
import { ref, toRef, watchEffect } from 'vue'
import shapeDrawer from './component/shaperDrawer.vue'

const props = defineProps({
  dashboardData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:dashboardData', 'showAddModal', 'generate', 'generateImg', 'shapeGenerate'])

const dataShadow = ref({})

// 将 props.dashboardData 转换为响应式引用
const propsData = toRef(props, 'dashboardData')
// 监听props变化，更新本地数据
watchEffect(() => {
  dataShadow.value = propsData.value
})
const showShapeDrawer = ref(false)

const showAddModal = () => {
  emit('showAddModal')
}

const generate = (params) => {
  if (params === 302) {
    emit('generateImg')
  } else {
    emit('generate', params)
  }
}

const shapeGenerate = (shapeType) => {
  showShapeDrawer.value = false
  emit('shapeGenerate', shapeType)
}

const updateDashboardData = () => {
  console.log('updateDashboardData', dataShadow.value)
  emit('update:dashboardData', dataShadow.value)
}

const scaleRateAdd = (type) => {
  if (type === 'min') {
    dataShadow.value.scaleRate = Math.max(dataShadow.value.scaleRate - 1, 25)
  }
  if (type === 'add') {
    dataShadow.value.scaleRate = Math.min(dataShadow.value.scaleRate + 1, 100)
  }
  emit('update:scaleRate', dataShadow.value.scaleRate)
}
</script>

<template>
  <div class="con-eles">
    <div class="dis-flex">
      <div class="ele-item" @click="showAddModal">
        <img class="pos-item" src="@/assets/icons/operateIcons/组件.svg"/>组件
      </div>
      <div class="ele-item" @click="generate(301)">
        <img class="pos-item" src="@/assets/icons/operateIcons/文本.svg"/>文本
      </div>
      <div class="ele-item" @click="generate(302)">
        <img class="pos-item" src="@/assets/icons/operateIcons/图片.svg"/>图片
      </div>
      <div class="ele-item" @click="generate(303)">
        <img class="pos-item" src="@/assets/icons/operateIcons/视频.svg"/>视频
      </div>
      <div class="ele-item" @click="generate(304)">
        <img class="pos-item" src="@/assets/icons/operateIcons/时钟.svg"/>时钟
      </div>
      <div class="ele-item" @click="generate(306)">
        <img class="pos-item" src="@/assets/icons/operateIcons/内嵌.svg"/>内嵌
      </div>
      <a-popover v-model="showShapeDrawer" trigger="click" overlayClassName="drawer-con">
        <div class="ele-item">
          <img class="pos-item" src="@/assets/icons/operateIcons/形状.svg"/>形状
        </div>
        <template #content>
          <div style="width: 162px;height: 470px;overflow: auto;background-color: rgba(9,9,11,1);">
            <shapeDrawer @shapeGenerate="shapeGenerate"/>
          </div>
        </template>
      </a-popover>
    </div>
    <div style="width:147px; height: 42px;" class="dis-flex">
      <div style="font-size: 12px;color: rgba(255, 255, 255, 0.75);">{{ dataShadow.scaleRate }}%</div>
      <MinusCircleTwoTone @click="scaleRateAdd('min')"/>
      <a-slider v-model:value="dataShadow.scaleRate" @change="updateDashboardData" :min="25" :max="100" style="width: 72px;"/>
      <PlusCircleTwoTone @click="scaleRateAdd('add')"/>
    </div>
  </div>
</template>

<style lang="less" scoped>
.dis-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.con-eles {
  height: 42px;
  padding: 11px 32px;
  color: #fff;
  background: rgba(29, 31, 38, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .ele-item {
    display: flex;
    align-items: center;
    width: 88px;
    height: 22px;
    border-radius: 4px;
    line-height: 22px;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.75);
    cursor: pointer;
    .pos-item {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }
  }
  .active {
    opacity: 0.2;
  }
  .ele-drop {
    z-index: 99999;
    width: 300px;
    height: 600px;
    position: absolute;
    overflow: auto;
    top: 40px;
    left: 40px;
    background-color: coral;
  }
  .slide-icon {
    cursor: pointer;
    width: 16px;
    height: 16px;
  }
}
.drawer-con {
  .ant-popover-inner-content {
    padding: 0 !important;
    background-color: transparent !important;
  }
  .ant-popover-arrow {
    border-top-color: rgba(9, 9, 11, 1) !important;
    border-left-color: rgba(9, 9, 11, 1) !important;
  }
}
.con-eles :deep(.ant-slider) {
  margin: 0;
}
.con-eles :deep(.ant-slider-rail) {
  background-color: rgb(199, 203, 208);
}
.con-eles :deep(.ant-slider-track) {
  background-color:  rgba(0, 111, 255, 1);
}
.con-eles :deep(.ant-slider-handle) {
  border-color: rgba(0, 111, 255, 1);
}
</style>
