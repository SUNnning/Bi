<script setup>
import { ref, toRef, watchEffect, computed, onMounted, onUnmounted } from 'vue'
import PainterDragNode from './PainterDragNode.vue'

const props = defineProps({
  dashboardData: {
    type: Object,
    required: true
  },
  scaleRate: { type: Number, default: 50 }
})

const emit = defineEmits(['update:dashboardData'])

const dataShadow = ref({})
const propsData = toRef(props, 'dashboardData')
watchEffect(() => {
  dataShadow.value = propsData.value
})
const updateDashboardData = () => {
  console.log('updateDashboardData', dataShadow.value)
  emit('update:dashboardData', dataShadow.value)
}

const cloneLayoutAllShadow = ref([])
const coefficient = computed(() => {
  return (dataShadow.value.scaleRate / 100)
})

const updateNode = node => {
  dataShadow.value.layout.forEach((e, i) => {
    if (e.i === node.i) {
      dataShadow.value.layout[i] = node
    }
  })
  updateDashboardData()
}

// 监听鼠标拖动
const lastMouseX =ref(0)
const lastMouseY =ref(0)
const mouseX = ref(0)
const mouseY = ref(0)
const isMouseDown = ref(false)
const boardOffsetX = ref(0)
const boardOffsetY = ref(0)
const spaceBarFlag = ref(false)
const dragBoardMouseDown = e => {
  if (spaceBarFlag.value) {
    // 记录鼠标按下时的坐标
    lastMouseX.value = e.clientX
    lastMouseY.value = e.clientY
    isMouseDown.value = true
  }
}
const dragBoardMouseMove = e => {
  // 只有在鼠标按下时才计算位移
  if (isMouseDown.value) {
    // 获取当前鼠标坐标
    mouseX.value = e.clientX
    mouseY.value = e.clientY
    // 计算鼠标位移
    const deltaX = mouseX.value - lastMouseX.value
    const deltaY = mouseY.value - lastMouseY.value
    boardOffsetX.value += deltaX
    boardOffsetY.value += deltaY
    lastMouseX.value = e.clientX
    lastMouseY.value = e.clientY
  }
}
const dragBoardMouseUp  = () => {
  // 鼠标松开时重置标志位
  isMouseDown.value = false
}
const handleWheel = e => {
  if (keydownList.value.includes('ctrlDown')) {
    if (e.deltaY < 0) dataShadow.value.scaleRate = Math.min(dataShadow.value.scaleRate + 1, 100)
    if (e.deltaY > 0) dataShadow.value.scaleRate = Math.max(dataShadow.value.scaleRate - 1, 25)
    updateDashboardData()
  }
}
const keydownList = ref([])
const keydownFoo = ev => {
  if (ev.keyCode === 16) keydownList.value.push('shiftDown') // shift
  if (ev.keyCode === 17) keydownList.value.push('ctrlDown') // ctrl
  if (ev.keyCode === 32) spaceBarFlag.value = true // spacebar
}
const keyupFoo = ev => {
  console.log(ev, 'key')
  if (ev.keyCode === 16) keydownList.value = keydownList.value.filter(item => item !== 'shiftDown')
  if (ev.keyCode === 17) keydownList.value = keydownList.value.filter(item => item !== 'ctrlDown')
  if (ev.keyCode === 32) spaceBarFlag.value = false
}

onMounted(() => {
  window.addEventListener('keydown', keydownFoo)
  window.addEventListener('keyup', keyupFoo)
})

onUnmounted(() => {
  window.removeEventListener('keydown', keydownFoo)
  window.removeEventListener('keyup', keyupFoo)
})
</script>

<template>
  <div class="con-drag">
    <div
      class="scal-board"
      :style="{ top: `calc(50% + ${boardOffsetY}px)`, left: `calc(50% + ${boardOffsetX}px)`, transform: `translate(-50%, -50%) scale(${coefficient}, ${coefficient})` }"
      @wheel.prevent="handleWheel"
    >
      <div
        class="scal-board-container"
        :style="{ 'cursor': spaceBarFlag ? (isMouseDown ? 'grabbing' : 'grab') : '', 'cursor': spaceBarFlag ? (isMouseDown ? '-webkit-grabbing' : '-webkit-grab') : '' }"
        @mousedown="dragBoardMouseDown"
        @mousemove="dragBoardMouseMove"
        @mouseup="dragBoardMouseUp"
        @click.self="paintAreaClick"
      >
        <div class="center-boar" @click="paintAreaClick"></div>
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
  .scal-board-container {
    width: 6000px;
    height: 4000px;
    position: relative;
    .inner-item:hover {
      // border: 2px solid #006fff !important;
      box-shadow: 0 0 10px #006fff !important;
    }
    .checked {
      // border: 1px solid rgba(0, 111, 255, 1) !important;
      box-shadow: 0 0 5px #006fff !important;
    }
    .reset-item-none {
      pointer-events: none;
      box-shadow: 0 0 5px #006fff !important;
    }
    .reset-item-class {
      border: 1px solid transparent;
      position: absolute;
    }
    .reset-item-class-text {
      border: 0px solid transparent;
      position: absolute;
    }
  }
}
.center-boar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1920px;
  height: 1080px;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
