<script setup>
import { ref, computed } from 'vue'
import { Input } from '@/components/ui/input'

const width = ref(160)
const count = ref(40)
const percent = ref(60)
const gap_width = ref(2)

const show_controls = ref(true)

const rect_width = computed(() => {
  return (width.value - ((count.value + 1) * gap_width.value)) / (count.value)
})
const current_pos = computed(() => {
  return Math.round((percent.value / 100) * count.value)
})
</script>

<template>
  <div class="flex-1 flex flex-col justify-center items-center my-2">
    {{ current_pos }}
    <svg xmlns="http://www.w3.org/2000/svg" :width="width+12" height="16">
      <g>
        <rect
          v-for="(_, i) in count"
          :key="`key${i}`"
          :style="`fill:${i < current_pos ? '#fff' : '#4a4a4a'}`"
          :width="rect_width"
          :height="i===0 || i===count-1 ? 8 : 5"
          :x="6+gap_width+i*(rect_width+gap_width)"
          y="0" />
        <g :transform="`translate(${6+(rect_width+gap_width)*current_pos},0)`">
          <rect
            style="fill:#000"
            :width="6"
            height="13"
            x="0"
            y="0"
          />
          <rect
            style="fill:#c66936"
            :width="2"
            height="11"
            :x="2"
            y="0"
          />
          <rect
            style="fill:#c66936"
            :width="2"
            :height="2"
            x="0"
            y="11"
          />
          <rect
            style="fill:#c66936"
            :width="2"
            :height="2"
            :x="4"
            y="11"
          />
        </g>
      </g>
    </svg>
    <div v-if="show_controls  ">
      <Input v-model="percent" type="number" placeholder="Fill" class="m-2" />
      <Input v-model="count" type="number" placeholder="Count" class="m-2" />
      <Input v-model="width" type="number" placeholder="Width" class="m-2" />
    </div>
  </div>
</template>