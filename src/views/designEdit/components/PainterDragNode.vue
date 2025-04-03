<script setup>
import { ref, toRefs, computed } from 'vue';
const props = defineProps({
  layerIndex: {
    type: Number,
    default: 0
  },
  scaleRatio: {
    type: Number,
    default: 1
  },
  title: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: ''
  },
  canvas: {
    type: Object,
    default: {
      w: 400,
      h: 200,
      x: 0,
      y: 0
    }
  }
})
const { layerIndex, scaleRatio, title, id, canvas } = toRefs(props)
const scale = computed(() => scaleRatio.value / 100)
const resizing = () => {}
const dragging = () => {}
const dragstop = () => {}
</script>

<template>
  <vue-draggable-resizable
    :id="id" 
    :x="canvas.x" 
    :y="canvas.y" 
    :w="canvas.w"
    :h="canvas.h"
    :z="1000 - layerIndex"
    :scale="scale"
    :parent="false"
    :preventActiveBehavior="true"
    :resizable="true"
    :disableUserSelect="true"
    :draggable="true"
    @activated="() => clickedEv(id)"
    @resizing="resizing"
    @resizestop="(x, y, width, height) => onRresizeStop(x, y, width, height, id)" 
    @dragging="(x, y) => dragging(x, y, id)"
    @dragstop="(x, y) => dragstop(x, y, id)"
  >
    <div>
      test
    </div>
  </vue-draggable-resizable>
</template>

<style lang="less" scoped>
</style>
