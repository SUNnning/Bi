<script setup>
import { ref, computed } from 'vue'
import shapeDrawer from './component/shaperDrawer.vue'

const props = defineProps({
  isPreview: {
    type: Boolean,
    default: false
  },
  scaleRate: { type: Number, default: 50 }
})

const emit = defineEmits(['showAddModal', 'generate', 'generateImg', 'shapeGenerate', 'changeRito', 'scaleRateAdd', 'update:scaleRate'])

const showShapeDrawer = ref(false)

const scaleRateC = computed({
  get: () => props.scaleRate,
  set: (newV) => {
    console.log(newV, '{}')
    emit('update:scaleRate', newV)
  }
})

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

const changeRito = () => {
  emit('changeRito')
}

const scaleRateAdd = (params) => {
  emit('scaleRateAdd', params)
}
</script>

<template>
  <!-- 使用如下
  <ToolHeader
    :isPreview="isPreview"
    :scaleRate.sync="scaleRate"
    @showAddModal="showAddModal"
    @generate="generate"
    @generateImg="generateImg"
    @shapeGenerate="shapeGenerate"
    @changeRito="changeRito"
    @scaleRateAdd="scaleRateAdd"
    /> -->
  <div>
    <div v-if="!isPreview" class="con-eles">
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
        <div style="font-size: 12px;color: rgba(255, 255, 255, 0.75);">{{ scaleRateC }}%</div>
        <img class="slide-icon" src="@/assets/icons/layoutIcons/减少.svg" @click="scaleRateAdd('min')"/>
        <a-slider
          id="test"
          v-model="scaleRateC"
          @change="changeRito"
          :min="10"
          :max="100"
          style="width: 72px;margin-top: 2px;"
        />
        <img class="slide-icon" src="@/assets/icons/layoutIcons/增加.svg" @click="scaleRateAdd('add')"/>
      </div>
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
</style>

<style lang="less" scoped>
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
.con-eles :deep(.ant-slider-track) {
  background-color:  rgba(0, 111, 255, 1);
}
.con-eles :deep(.ant-slider-handle) {
  border: solid 2px rgba(0, 111, 255, 1);
}
</style>
