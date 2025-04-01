<script setup>
import { ref, toRefs } from 'vue';
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
</script>

<template>
  <vue-draggable-resizable
    :id="id" 
    :x="canvas.x" 
    :y="canvas.y" 
    :w="canvas.w"
    :h="canvas.h"
    :z="1000 - layerIndex"
    :scaleRatio="scalRatio"
    :parent="true"
    :preventActiveBehavior="true"
    :resizable="true"
    :disableUserSelect="true"
    :draggable="!spaceBarFlag"
    @activated="() => clickedEv(index, item)"
    @resizing="resizing"
    @resizestop="(x, y, width, height) => onRresizeStop(x, y, width, height, item)" 
    @dragging="(x, y) => dragging(x, y, item)"
    @dragstop="(x, y) => dragstop(x, y, item)"
  >
    <div
      @click="gridItemClick(item)"
      @dblclick="dblclickEv(index, item)"
      @contextmenu.prevent="showContextMenu($event, item)"
      style="height: 100%"
      :class="item.active && !uniqueGroup ? 'checked' : (item.layer !== currentSelectLayer ? 'inner-item' : '')"
    >
      test
    </div>
  </vue-draggable-resizable>
</template>

<style lang="less" scoped>
</style>
