<template>
  <div
    class="h-12 flex profile-row"
    @mouseenter="hover=true" @mouseleave="hover=false">
    <button
      :class="{'font-semibold bg-zinc-200 hover:bg-zinc-100 text-black' : selected,
      'hover:bg-zinc-900 bg-opacity-50 text-white': !selected,
      'text-ellipsis': !editing}"
      class="flex-1 h-full text-left whitespace-nowrap overflow-hidden"
      @click="!editing && $emit('select') && $refs.profileTitle.scramble()">
      <FileDigit
        :class="{'text-zinc-600': selected,
        'text-muted-foreground': !selected,
        'w-0': hover}"
        class="h-4 ml-10 mb-1 inline-block" />
      <input
        v-if="editing" ref="profileNameInput" v-model="profile.name"
        onfocus="this.select()" :placeholder="$t('profiles.name_placeholder')"
        class="pl-10 w-full h-full bg-transparent focus-visible:ring-0 focus-visible:outline-none"
        style="color: inherit; background: inherit">
      <template v-else>
        <ScrambleText
          ref="profileTitle"
          :class="{'text-black': selected, 'text-zinc-100': !selected}"
          :text="profile.name" />
        <span
          class="text-xs text-zinc-600"
          :class="{'hidden': hover}"> uID:{{ profile.id }}</span>
      </template>
    </button>
    <template v-if="!confirmDelete">
      <button
        :class="{'bg-zinc-200 hover:bg-zinc-100 text-black' : selected,
                'hover:bg-opacity-100 bg-zinc-900 text-zinc-100 bg-opacity-50': !selected,
                'w-12': editing,
                'w-0': !editing}"
        class="flex h-12 justify-center items-center flex-shrink-0"
        @click="editing=false">
        <Check class="h-4 w-4" />
      </button>
      <button
        :class="{'bg-zinc-200 hover:bg-zinc-100 text-black' : selected,
                'hover:bg-opacity-100 bg-zinc-900 text-zinc-100 bg-opacity-50': !selected,
                'w-12' : hover && !editing}"
        class="flex w-0 h-12 justify-center items-center flex-shrink-0"
        @click="editing=true; $nextTick(()=>{$refs.profileNameInput.focus()})">
        <PenLine class="h-4 w-4" />
      </button>
      <button
        :class="{'bg-zinc-200 hover:bg-zinc-100 text-black' : selected,
                'hover:bg-opacity-100 bg-zinc-900 text-zinc-100 bg-opacity-50': !selected,
                'w-12' : hover && !editing}"
        class="flex w-0 h-12 justify-center items-center flex-shrink-0">
        <Copy class="h-4 w-4" />
      </button>
      <button
        :class="{'bg-orange-600 hover:bg-orange-500 text-black' : selected,
                'hover:bg-opacity-100 bg-orange-900 text-zinc-100 bg-opacity-50': !selected,
                'w-12' : hover && !editing}"
        class="flex w-0 h-12 justify-center items-center flex-shrink-0"
        @click="confirmDelete=true">
        <Trash2 class="h-4 w-4" />
      </button>
    </template>
    <template v-else>
      <button
        :class="{'bg-orange-600 hover:bg-orange-500 text-black' : selected,
                'hover:bg-opacity-100 bg-orange-900 text-zinc-100 bg-opacity-50': !selected,
                'w-12' : hover && !editing}"
        class="flex w-0 h-12 justify-center items-center flex-shrink-0"
        @click="$emit('delete', profile.id)">
        <Check class="h-4 w-4" />
      </button>
      <button
        :class="{'bg-zinc-200 hover:bg-zinc-100 text-black' : selected,
                'hover:bg-opacity-100 bg-zinc-900 text-zinc-100 bg-opacity-50': !selected,
                'w-12' : hover && !editing}"
        class="flex w-0 h-12 justify-center items-center flex-shrink-0"
        @click="confirmDelete=false">
        <X class="h-4 w-4" />
      </button>
    </template>
  </div>
</template>
<script setup>
import { Check, Copy, FileDigit, PenLine, Trash2, X } from 'lucide-vue-next'
import ScrambleText from '@/components/effects/ScrambleText.vue'
import { ref } from 'vue'

defineEmits(['select', 'duplicate', 'delete'])

const profile = defineModel({
  type: Object,
  required: true,
  default: () => ({
    id: '1234',
    name: 'Profile Name',
  }),
})

defineProps({
  selected: {
    type: Boolean,
    default: false,
  },
})

const editing = ref(false)

const confirmDelete = ref(false)

const hover = ref(false)

</script>