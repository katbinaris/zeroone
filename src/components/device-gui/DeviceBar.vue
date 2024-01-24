<script setup>
import { ref, computed } from 'vue'

const model = defineModel({ type: Number, default: 60 })

const bar = ref(null)

const width = ref(160)
const count = ref(40)
const percent = ref(60)
const gap_width = ref(2)

const rect_width = computed(() => {
  return (width.value - ((count.value + 1) * gap_width.value)) / (count.value)
})
const current_pos = computed(() => {
  return Math.round((percent.value / 100) * (count.value - 1))
})

function onMouseDown() {
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

function onMouseMove(e) {
  const rect = bar.value.getBoundingClientRect()
  percent.value = Math.max(0, Math.min(Math.round((e.clientX - rect.left - 9) / (width.value - 6) * 100), 100))
  model.value = percent.value
}

function onMouseUp() {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
}
</script>

<template>
    <span @mousedown="onMouseDown">
      <svg ref="bar" xmlns="http://www.w3.org/2000/svg" :width="width+12" height="32">
        <g>
          <rect
            v-for="(_, i) in count"
            :key="`key${i}`"
            :style="`fill:${i < current_pos ? '#fff' : '#4a4a4a'}`"
            :width="rect_width"
            :height="i===0 || i===count-1 ? 8 : 5"
            :x="6+gap_width+i*(rect_width+gap_width)"
            y="10" />
          <g :transform="`translate(${6+(rect_width+gap_width)*current_pos},0)`">
            <rect
              style="fill:#000"
              :width="6"
              height="13"
              x="0"
              y="10"
            />
            <rect
              style="fill:#c66936"
              :width="2"
              height="11"
              :x="2"
              y="10"
            />
            <rect
              style="fill:#c66936"
              :width="2"
              :height="2"
              x="0"
              y="21"
            />
            <rect
              style="fill:#c66936"
              :width="2"
              :height="2"
              :x="4"
              y="21"
            />
          </g>
        </g>
      </svg>
    </span>
</template>