<script setup>
import { reactive } from 'vue'

const shapesList = reactive([
  { name: '矩形', shapeType: 'rect', url: require('@/assets/icons/layerIcons/rect.svg') },
  { name: '圆形', shapeType: 'ellipse', url: require('@/assets/icons/layerIcons/circle.svg') },
  { name: '三角形', shapeType: 'polygon', url: require('@/assets/icons/layerIcons/trans.svg') },
  { name: '箭头', shapeType: 'arrow', url: require('@/assets/icons/layerIcons/arrow.svg') }
])

const emit = defineEmits(['shapeGenerate'])

const shapeGenerate = (shapeType) => {
  console.log('act', shapeType)
  emit('shapeGenerate', shapeType)
}
</script>

<template>
  <div class="wrapper">
    <div v-for="e in shapesList" :key="e.name" class="shapeItem" @click="shapeGenerate(e.shapeType)">
      <div class="item-img">
        <img :src="e.url"/>
      </div>
      <div class="item-text">{{ e.name }}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wrapper {
  padding: 10px 16px 0;
  background-color: rgba(9,9,11,1);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
.shapeItem {
  .item-img {
    width: 128px;
    height: 72px;
    background-color: rgba(255, 255, 255, .05);
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 64px;
      height: 64px;
    }
  }
  .item-text {
    width: 120px;
    text-align: center;
    height: 42px;
    line-height: 42px;
    font-size: 12px;
    color: rgba(255, 255, 255, .75);
  }
}
</style>
