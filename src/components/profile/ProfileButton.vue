<template>
  <div
    class="h-12 flex overflow-hidden rounded-lg m-2 transition-all"
    :class="{'border border-zinc-100 bg-zinc-300': selected,
    'border border-transparent hover:border-zinc-900': !selected,
    'group': showHoverButtons}">
    <form
      v-if="nameEditable && editing"
      class="flex-1 flex h-full text-left whitespace-nowrap overflow-hidden"
      :class="{'bg-zinc-300' : selected}"
      @submit.prevent="store.renameProfile(profile.id, nameInput); editing=false">
      <input
        ref="profileNameInput" v-model="nameInput"
        onfocus="this.select()" :placeholder="$t('profiles.name_placeholder')"
        class="flex-1 pl-8 h-full rounded-r-lg text-sm bg-transparent focus-visible:ring-0 focus-visible:outline-none min-w-0 transition-all"
        :class="{'font-semibold bg-zinc-300 hover:bg-zinc-200 text-black' : selected,
        'hover:bg-zinc-900 bg-opacity-50 text-muted-foreground': !selected}"
        @blur="onNameInputBlur">
      <button
        ref="nameSubmitButton"
        type="submit"
        :class="{'bg-zinc-300 hover:bg-zinc-200 text-black' : selected,
                'hover:bg-opacity-100 bg-zinc-900 text-zinc-100 bg-opacity-50': !selected}"
        class="flex h-full rounded-l-lg aspect-square justify-center items-center flex-shrink-0 transition-all">
        <Check class="h-4 w-4" />
      </button>
    </form>
    <!-- TODO: Make hover buttons use Transition(Group) and v-if directive -->
    <button
      v-else
      :class="{'font-semibold bg-zinc-300 hover:bg-zinc-200 text-black' : selected,
      'hover:bg-zinc-900 bg-opacity-50 text-muted-foreground': !selected}"
      class="flex-1 h-12 rounded-r-lg text-left text-sm whitespace-nowrap overflow-hidden text-ellipsis pr-4 transition-all"
      @click="!editing && $emit('select') && $refs.profileTitle.scramble()">
      <span class="ml-2 w-4 mr-2 cursor-grab" :class="{'ml-2': !draggable}">
        <GripHorizontal
          v-if="draggable"
          :class="{'text-zinc-600': selected,
          'text-muted-foreground': !selected}"
          class="mb-0.5 h-4 w-4 opacity-0 group-hover:opacity-100 inline-block transition-all" />
      </span>
      <ScrambleText
        ref="profileTitle"
        class="transition-colors"
        :class="{'text-black': selected, 'text-muted-foreground': !selected}"
        :text="profile.name" />
      <span
        v-if="showId"
        class="text-xs text-zinc-600 group-hover:hidden"> UID:{{ profile.id }}</span>
    </button>
    <template v-if="!confirmDelete">
      <button
        v-if="nameEditable"
        :class="{'bg-zinc-300 hover:bg-zinc-200 text-black' : selected,
                'hover:bg-opacity-100 bg-zinc-900 text-zinc-100 bg-opacity-50': !selected,
                'group-hover:w-12' : !editing}"
        class="flex w-0 h-12 rounded-l-lg justify-center items-center flex-shrink-0 transition-all"
        @click="startEditing">
        <PenLine class="h-4 w-4" />
      </button>
      <button
        :class="{'bg-zinc-300 hover:bg-zinc-200 text-black' : selected,
                'hover:bg-opacity-100 bg-zinc-900 text-zinc-100 bg-opacity-50': !selected,
                'group-hover:w-12' : !editing,
                'rounded-l-lg': !nameEditable}"
        class="flex w-0 h-12 justify-center items-center flex-shrink-0 transition-all"
        @click="$emit('duplicate')">
        <Copy class="h-4 w-4" />
      </button>
      <button
        :class="{'bg-orange-700 hover:bg-orange-600 text-black' : selected,
                'hover:bg-opacity-100 bg-orange-900 text-zinc-100 bg-opacity-50': !selected,
                'group-hover:w-12' : !editing}"
        class="flex w-0 h-12 justify-center items-center flex-shrink-0 transition-all"
        @click="confirmDelete=true">
        <Trash2 class="h-4 w-4" />
      </button>
    </template>
    <template v-else>
      <button
        :class="{'bg-orange-600 hover:bg-orange-500 text-black' : selected,
                'hover:bg-opacity-100 bg-orange-900 text-zinc-100 bg-opacity-50': !selected,
                'group-hover:w-12' : !editing}"
        class="flex w-0 h-12 justify-center items-center flex-shrink-0 transition-all"
        @click="$emit('delete', profile.id)">
        <Check class="h-4 w-4" />
      </button>
      <button
        :class="{'bg-zinc-300 hover:bg-zinc-200 text-black' : selected,
                'hover:bg-opacity-100 bg-zinc-900 text-zinc-100 bg-opacity-50': !selected,
                'group-hover:w-12' : !editing}"
        class="flex w-0 h-12 justify-center items-center flex-shrink-0 transition-all"
        @click="confirmDelete=false">
        <X class="h-4 w-4" />
      </button>
    </template>
  </div>
</template>
<script setup>
import { Check, Copy, PenLine, Trash2, X, GripHorizontal } from 'lucide-vue-next'
import ScrambleText from '@/components/common/ScrambleText.vue'
import { nextTick, ref } from 'vue'
import { useStore } from '@/store'

const store = useStore()

defineEmits(['select', 'duplicate', 'delete'])

const nameSubmitButton = ref(null)

const props = defineProps({
  profile: {
    type: Object,
    default: () => ({
      id: '1234',
      name: 'Profile Name',
    }),
    required: true,
  },
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
    default: true,
  },
  showHoverButtons: {
    type: Boolean,
    default: true,
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

const nameInput = ref(props.profile.name)

const editing = ref(props.initEditing)

const confirmDelete = ref(false)

</script>