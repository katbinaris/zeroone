<script setup lang="ts">
import draggable from 'vuedraggable'
import { ref } from 'vue'

const message = [
  'vue.draggable',
  'draggable',
  'component',
  'for',
  'vue.js 2.0',
  'based',
  'on',
  'Sortablejs',
]

const list = ref(
  message.map((name, index) => {
    return { name, order: index + 1 }
  }),
)

const dragOptions = ref({
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
})

const drag = ref(false)

const sort = () => {
  console.log('here')
  list.value = list.value.sort((a, b) => a.order - b.order)
}
</script>

<template>
  <div class="row">
    <div class="col-2 flex">
      <button class="btn btn-secondary button" @click="sort">
        To original order
      </button>
    </div>

    <div class="col-6 flex-col">
      <h3>Transition</h3>
      <transition-group>
        <draggable
          key="dragggable"
          item-key="name"
          :list="list"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
        >
          <template #item="{ element }">
            <li :key="element.name">
              {{ element.name }}
            </li>
          </template>
        </draggable>
      </transition-group>
    </div>
  </div>
</template>

<style scoped>
.button {
  margin-top: 35px;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
