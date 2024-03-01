<script setup>
import { ref, computed } from 'vue'

const model = defineModel({ type: Number, default: 60 })

const bar = ref(null)

const props = defineProps({
  width: { type: Number, default: 160 },
  count: { type: Number, default: 40 },
  gapWidth: { type: Number, default: 2 }
})

const rectWidth = computed(() => {
  return (props.width - (props.count + 1) * props.gapWidth) / props.count
})
const currentPosition = computed(() => {
  return Math.round((model.value / 100) * (props.count - 1))
})

function onMouseDown() {
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

function onMouseMove(e) {
  const rect = bar.value.getBoundingClientRect()
  model.value = Math.max(
    0,
    Math.min(Math.round(((e.clientX - rect.left - 9) / (props.width - 6)) * 100), 100)
  )
}

function onMouseUp() {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
}
</script>

<template>
  <span @mousedown="onMouseDown">
    <svg ref="bar" :width="width + 12" height="32">
      <g>
        <rect
          v-for="(_, i) in count"
          :key="`key${i}`"
          :style="`fill:${i < currentPosition ? '#fff' : '#4a4a4a'}`"
          :width="rectWidth"
          :height="i === 0 || i === count - 1 ? 8 : 5"
          :x="6 + gapWidth + i * (rectWidth + gapWidth)"
          y="10"
        />
        <g :transform="`translate(${6 + (rectWidth + gapWidth) * currentPosition},0)`">
          <rect style="fill: #000" :width="6" height="13" x="0" y="10" />
          <rect style="fill: #c66936" :width="2" height="11" :x="2" y="10" />
          <rect style="fill: #c66936" :width="2" :height="2" x="0" y="21" />
          <rect style="fill: #c66936" :width="2" :height="2" :x="4" y="21" />
        </g>
      </g>
    </svg>
  </span>
</template>
