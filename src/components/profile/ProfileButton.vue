<template>
  <div
    class="h-12 flex"
    @mouseenter="hover=true" @mouseleave="hover=false">
    <form
      v-if="nameEditable && editing"
      class="flex-1 flex h-full text-left whitespace-nowrap overflow-hidden"
      :class="{'bg-zinc-200' : selected}"
      @submit.prevent="profile.name = nameInput; editing=false">
      <input
        ref="profileNameInput" v-model="nameInput"
        onfocus="this.select()" :placeholder="$t('profiles.name_placeholder')"
        class="flex-1 pl-6 h-full text-sm bg-transparent focus-visible:ring-0 focus-visible:outline-none min-w-0 transition-colors"
        :class="{'font-semibold bg-zinc-300 hover:bg-zinc-200 text-black' : selected,
        'hover:bg-zinc-900 bg-opacity-50 text-muted-foreground': !selected}"
        @blur="onNameInputBlur">
      <button
        ref="nameSubmitButton"
        type="submit"
        :class="{'bg-zinc-200 hover:bg-zinc-100 text-black' : selected,
                'hover:bg-opacity-100 bg-zinc-900 text-zinc-100 bg-opacity-50': !selected}"
        class="flex h-full aspect-square justify-center items-center flex-shrink-0 transition-colors  ">
        <Check class="h-4 w-4" />
      </button>
    </form>
    <button
      v-else
      :class="{'font-semibold bg-zinc-200 hover:bg-zinc-100 text-black' : selected,
      'hover:bg-zinc-900 bg-opacity-50 text-muted-foreground': !selected}"
      class="flex-1 h-12 text-left text-sm whitespace-nowrap overflow-hidden text-ellipsis pr-4 transition-colors"
      @click="!editing && $emit('select') && $refs.profileTitle.scramble()">
      <span class="ml-4 w-4 mr-2" :class="{'ml-4': !draggable}">
        <GripHorizontal
          v-if="draggable"
          :class="{'text-zinc-600': selected,
        'text-muted-foreground': !selected}"
          class="mb-0.5 h-4 w-4 inline-block" />
      </span>
      <ScrambleText
        ref="profileTitle"
        class="transition-colors"
        :class="{'text-black': selected, 'text-muted-foreground': !selected}"
        :text="profile.name" />
      <span
        v-if="showId"
        class="text-xs text-zinc-600"
        :class="{'hidden': hover}"> UID:{{ profile.id }}</span>
    </button>
    <template v-if="!confirmDelete">
      <button
        v-if="nameEditable"
        :class="{'bg-zinc-200 hover:bg-zinc-100 text-black' : selected,
                'hover:bg-opacity-100 bg-zinc-900 text-zinc-100 bg-opacity-50': !selected,
                'w-12' : hover && !editing}"
        class="flex w-0 h-12 justify-center items-center flex-shrink-0 transition-colors"
        @click="startEditing">
        <PenLine class="h-4 w-4" />
      </button>
      <button
        :class="{'bg-zinc-200 hover:bg-zinc-100 text-black' : selected,
                'hover:bg-opacity-100 bg-zinc-900 text-zinc-100 bg-opacity-50': !selected,
                'w-12' : hover && !editing}"
        class="flex w-0 h-12 justify-center items-center flex-shrink-0 transition-colors"
        @click="$emit('duplicate')">
        <Copy class="h-4 w-4" />
      </button>
      <button
        :class="{'bg-orange-600 hover:bg-orange-500 text-black' : selected,
                'hover:bg-opacity-100 bg-orange-900 text-zinc-100 bg-opacity-50': !selected,
                'w-12' : hover && !editing}"
        class="flex w-0 h-12 justify-center items-center flex-shrink-0 transition-colors"
        @click="confirmDelete=true">
        <Trash2 class="h-4 w-4" />
      </button>
    </template>
    <template v-else>
      <button
        :class="{'bg-orange-600 hover:bg-orange-500 text-black' : selected,
                'hover:bg-opacity-100 bg-orange-900 text-zinc-100 bg-opacity-50': !selected,
                'w-12' : hover && !editing}"
        class="flex w-0 h-12 justify-center items-center flex-shrink-0 transition-colors"
        @click="$emit('delete', profile.id)">
        <Check class="h-4 w-4" />
      </button>
      <button
        :class="{'bg-zinc-200 hover:bg-zinc-100 text-black' : selected,
                'hover:bg-opacity-100 bg-zinc-900 text-zinc-100 bg-opacity-50': !selected,
                'w-12' : hover && !editing}"
        class="flex w-0 h-12 justify-center items-center flex-shrink-0 transition-colors"
        @click="confirmDelete=false">
        <X class="h-4 w-4" />
      </button>
    </template>
  </div>
</template>
<script setup>
import { Check, Copy, PenLine, Trash2, X, GripHorizontal } from 'lucide-vue-next'
import ScrambleText from '@/components/effects/ScrambleText.vue'
import { nextTick, ref } from 'vue'

defineEmits(['select', 'duplicate', 'delete'])

const nameSubmitButton = ref(null)

const profile = defineModel({
  type: Object,
  required: true,
  default: () => ({
    id: '1234',
    name: 'Profile Name',
  }),
})

const props = defineProps({
  selected: {
    type: Boolean,
    default: false,
  },
  showId: {
    type: Boolean,
    default: false,
  },
  nameEditable: {
    type: Boolean,
    default: true,
  },
  initEditing: {
    type: Boolean,
    default: false,
  },
  draggable: {
    // Not implemented yet
    type: Boolean,
    default: false,
  },
})

async function startEditing() {
  editing.value = true
  await nextTick()
  profileNameInput.value.focus()
}

function onNameInputBlur(e) {
  if (e.relatedTarget === nameSubmitButton.value) return
  editing.value = false
}

const profileNameInput = ref(null)

const nameInput = ref(profile.value.name)

const editing = ref(props.initEditing)

const confirmDelete = ref(false)

const hover = ref(false)

</script>