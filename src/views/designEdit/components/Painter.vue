<script setup>
import { ref, toRef, watchEffect, computed, onMounted, onUnmounted } from 'vue'
import PainterDragNode from './PainterDragNode.vue'

const props = defineProps({
  dashboardData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:dashboardData'])

const dataShadow = ref({})
const propsData = toRef(props, 'dashboardData')
watchEffect(() => {
  dataShadow.value = propsData.value
})
const updateDashboardData = () => {
  emit('update:dashboardData', dataShadow.value)
}

const coefficient = computed(() => (dataShadow.value.scaleRate / 100))

const updateNode = node => {
  dataShadow.value.layout.forEach((e, i) => {
    if (e.i === node.i) {
      dataShadow.value.layout[i] = node
    }
  })
  updateDashboardData()
}

// 画布拖动状态
const dragState = ref({
  isMouseDown: false,
  startX: 0,
  startY: 0,
  offsetX: 0,
  offsetY: 0,
  spaceBarPressed: false
})

// 按键状态
const keyState = ref({
  ctrl: false,
  shift: false,
  space: false
})

// 画布拖动处理
const handleMouseDown = (e) => {
  if (!dragState.value.spaceBarPressed) return
  
  dragState.value.isMouseDown = true
  dragState.value.startX = e.clientX - dragState.value.offsetX
  dragState.value.startY = e.clientY - dragState.value.offsetY
}

const handleMouseMove = (e) => {
  if (!dragState.value.isMouseDown) return
  
  dragState.value.offsetX = e.clientX - dragState.value.startX
  dragState.value.offsetY = e.clientY - dragState.value.startY
}

const handleMouseUp = () => {
  dragState.value.isMouseDown = false
}

// 缩放处理
const handleWheel = (e) => {
  if (!keyState.value.ctrl) return
  
  const delta = e.deltaY < 0 ? 1 : -1
  dataShadow.value.scaleRate = Math.min(
    Math.max(
      dataShadow.value.scaleRate + delta,
      25
    ),
    100
  )
  updateDashboardData()
}

// 键盘事件处理
const handleKeyDown = (e) => {
  switch(e.keyCode) {
    case 16: // Shift
      keyState.value.shift = true
      break
    case 17: // Ctrl
      keyState.value.ctrl = true
      break
    case 32: // Space
      e.preventDefault() // 防止页面滚动
      keyState.value.space = true
      dragState.value.spaceBarPressed = true
      break
  }
}

const handleKeyUp = (e) => {
  switch(e.keyCode) {
    case 16:
      keyState.value.shift = false
      break
    case 17:
      keyState.value.ctrl = false
      break
    case 32:
      keyState.value.space = false
      dragState.value.spaceBarPressed = false
      break
  }
}

// 生命周期钩子
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
})
</script>

<template>
  <div class="con-drag">
    <div
      class="scal-board"
      :style="{
        top: `calc(50% + ${dragState.offsetY}px)`,
        left: `calc(50% + ${dragState.offsetX}px)`,
        transform: `translate(-50%, -50%) scale(${coefficient}, ${coefficient})`,
        cursor: dragState.spaceBarPressed ? (dragState.isMouseDown ? 'grabbing' : 'grab') : 'default'
      }"
      @wheel.prevent="handleWheel"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseUp"
    >
      <div class="center-boar">
        <PainterDragNode
          v-for="(node, index) in dataShadow.layout"
          :key="index"
          :layerIndex="index"
          :scaleRatio="dataShadow.scaleRate"
          v-bind="node"
          @updateNode="updateNode"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.con-drag {
  position: relative;
  overflow: hidden;
}
.scal-board {
  transform-origin: center;
  width: 6000px;
  height: 4000px;
  position: absolute;
  background: url('../../../assets//icons/layoutIcons/bgDot.svg');
  .center-boar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1920px;
    height: 1080px;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
