<template>
  <div
    class="m-2 flex h-12 overflow-hidden rounded-lg transition-all"
    :class="{
      'border border-zinc-100 bg-zinc-300': selected,
      'border border-zinc-800/50 bg-zinc-900/30': !selected,
      group: showHoverButtons
    }"
  >
    <form
      v-if="nameEditable && editing"
      class="flex h-full flex-1 overflow-hidden whitespace-nowrap text-left"
      :class="{ 'bg-zinc-300': selected }"
      @submit.prevent="
        () => {
          $emit('rename', profile.name, nameInput)
          editing = false
        }
      "
    >
      <input
        ref="profileNameInput"
        v-model="nameInput"
        onfocus="this.select()"
        :placeholder="$t('profiles.name_placeholder')"
        class="h-full min-w-0 flex-1 rounded-lg bg-transparent pl-8 text-sm transition-all focus-visible:outline-none focus-visible:ring-0"
        :class="{
          'bg-zinc-300 font-semibold text-black hover:bg-zinc-200': selected,
          'text-muted-foreground hover:bg-zinc-800': !selected
        }"
        @blur="onNameInputBlur"
      />
      <button
        ref="nameSubmitButton"
        type="submit"
        :class="{
          'bg-zinc-300 text-black hover:bg-zinc-200': selected,
          'text-zinc-100 hover:bg-zinc-800': !selected
        }"
        class="flex aspect-square h-full shrink-0 items-center justify-center rounded-lg transition-all"
      >
        <Check class="size-4" />
      </button>
    </form>
    <!-- TODO: Make hover buttons use Transition(Group) and v-if directive -->
    <button
      v-else
      :class="{
        'bg-zinc-300 font-semibold text-black hover:bg-zinc-200': selected,
        'text-muted-foreground hover:bg-zinc-800': !selected
      }"
      class="flex-1 truncate rounded-lg pr-4 text-left text-sm transition-all"
      @click="!editing && $emit('select') && $refs.profileTitle.scramble()"
    >
      <span class="mx-2 w-4 cursor-grab" :class="{ 'ml-2': !draggable }">
        <GripHorizontal
          v-if="draggable"
          :class="{ 'text-zinc-600': selected, 'text-muted-foreground opacity-0': !selected }"
          class="profile-handle mb-0.5 inline-block size-4 transition-all group-hover:opacity-100"
        />
      </span>
      <ScrambleText
        ref="profileTitle"
        class="transition-colors"
        :class="{ 'text-black': selected, 'text-muted-foreground': !selected }"
        :text="profile.name"
      />
      <span v-if="showId" class="text-xs text-zinc-600 group-hover:hidden">
        UID:{{ profile.id }}</span
      >
    </button>
    <template v-if="!confirmDelete">
      <button
        v-if="nameEditable"
        :class="{
          'bg-zinc-300 text-black hover:bg-zinc-200': selected,
          'text-zinc-100 hover:bg-zinc-800': !selected,
          'group-focus-within:w-12 group-hover:w-12': !editing
        }"
        class="flex w-0 shrink-0 items-center justify-center rounded-lg transition-all"
        @click="startEditing"
      >
        <PenLine class="size-4" />
      </button>
      <button
        :class="{
          'bg-zinc-300 text-black hover:bg-zinc-200': selected,
          'text-zinc-100 hover:bg-zinc-800': !selected,
          'group-focus-within:w-12 group-hover:w-12': !editing,
          'rounded-l-lg': !nameEditable
        }"
        class="flex w-0 shrink-0 items-center justify-center rounded-lg transition-all"
        @click="$emit('duplicate', profile.name, profile)"
      >
        <Copy class="size-4" />
      </button>
      <button
        :class="{
          'bg-orange-700 text-black hover:bg-orange-600': selected,
          'bg-orange-900/50 text-zinc-100 hover:bg-orange-900': !selected,
          'group-focus-within:w-12 group-hover:w-12': !editing
        }"
        class="flex w-0 shrink-0 items-center justify-center rounded-lg transition-all"
        @click="confirmDelete = true"
      >
        <Trash2 class="size-4" />
      </button>
    </template>
    <template v-else>
      <button
        :class="{
          'bg-orange-600 text-black hover:bg-orange-500': selected,
          'bg-orange-900/50 text-zinc-100 hover:bg-orange-900': !selected,
          'group-focus-within:w-12 group-hover:w-12': !editing
        }"
        class="flex w-0 shrink-0 items-center justify-center rounded-lg transition-all"
        @click="$emit('delete', profile.name)"
      >
        <Check class="size-4" />
      </button>
      <button
        :class="{
          'bg-zinc-300 text-black hover:bg-zinc-200': selected,
          'text-zinc-100 hover:bg-zinc-800': !selected,
          'group-focus-within:w-12 group-hover:w-12': !editing
        }"
        class="flex w-0 shrink-0 items-center justify-center rounded-lg transition-all"
        @click="confirmDelete = false"
      >
        <X class="size-4" />
      </button>
    </template>
  </div>
</template>
<script setup>
import { Check, Copy, PenLine, Trash2, X, GripHorizontal } from 'lucide-vue-next'
import ScrambleText from '@renderer/components/common/ScrambleText.vue'
import { nextTick, ref } from 'vue'

defineEmits(['select', 'rename', 'duplicate', 'delete'])

const nameSubmitButton = ref(null)

const props = defineProps({
  profile: {
    type: Object,
    default: () => ({
      id: '1234',
      name: 'Profile Name'
    }),
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  },
  showId: {
    type: Boolean,
    default: false
  },
  nameEditable: {
    type: Boolean,
    default: true
  },
  initEditing: {
    type: Boolean,
    default: false
  },
  draggable: {
    // Not implemented yet
    type: Boolean,
    default: true
  },
  showHoverButtons: {
    type: Boolean,
    default: true
  }
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
