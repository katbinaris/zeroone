<template>
  <Collapsible v-model:open="expanded" :default-open="true">
    <!-- TODO: Make profile groups computed instead defining them of using v-for -->
    <div
      class="group flex h-12 w-full items-center justify-between border-0 border-b bg-zinc-900 py-2 text-left text-sm text-muted-foreground"
    >
      <CollapsibleTrigger class="flex flex-1 items-center">
        <ChevronRight class="chevrot mb-0.5 ml-4 inline-block size-4 transition-transform" />
        {{ categoryName
        }}<span class="font-heading text-sm text-zinc-600">
          ({{ deviceStore.profilesByTag[categoryName].length || 0 }})</span
        >
      </CollapsibleTrigger>
      <div
        class="float-right flex items-center gap-1 opacity-0 transition-all group-hover:opacity-100"
      >
        <template v-if="!confirmDelete">
          <Button
            class="aspect-square border border-zinc-800 bg-transparent p-1 text-muted-foreground hover:bg-orange-900 hover:text-zinc-100"
            ><PenLine class="size-4"
          /></Button>
          <Button
            class="aspect-square border border-zinc-800 bg-transparent p-1 text-muted-foreground hover:bg-orange-900 hover:text-zinc-100"
            @click="confirmDelete = true"
            ><Trash2 class="size-4"
          /></Button>
        </template>
        <template v-else>
          <Button
            class="aspect-square bg-orange-950 p-1 text-zinc-200 hover:bg-orange-900 hover:text-zinc-100"
            ><Check class="size-4"
          /></Button>
          <Button
            class="aspect-square border border-zinc-800 bg-transparent p-1 text-zinc-200 hover:bg-zinc-800 hover:text-zinc-100"
            @click="confirmDelete = false"
            ><X class="size-4"
          /></Button>
        </template>
        <span class="mx-4 w-4 cursor-grab text-zinc-600">
          <GripHorizontal class="category-handle mb-0.5 inline-block size-4" />
        </span>
      </div>
    </div>
    <CollapsibleContent>
      <draggable
        key="profilesDraggable"
        group="profiles"
        item-key="id"
        :list="deviceStore.profilesByTag[categoryName]"
        v-bind="dragOptions"
        handle=".profile-handle"
        @start="appStore.setProfileManagerDragging(true)"
        @end="appStore.setProfileManagerDragging(false)"
        @change="(event) => onProfileDrop(event, categoryIndex)"
      >
        <template #header>
          <div class="hideable-header m-2 flex h-12 items-center justify-center">
            <MoreHorizontal class="w-4 text-zinc-600" />
          </div>
        </template>
        <template #item="dragProfile">
          <div :key="dragProfile.element.name">
            <ProfileButton
              :profile="dragProfile.element"
              :show-hover-buttons="!appStore.profileManagerDragging"
              :selected="deviceStore.currentProfileName === dragProfile.element.name"
              @select="
                () => {
                  deviceStore.selectProfile(dragProfile.element.name)
                  appStore.setShowProfileConfig(true)
                }
              "
              @rename="
                (oldName, newName) => {
                  deviceStore.renameProfile(oldName, newName)
                  if (deviceStore.currentProfileName === oldName) {
                    deviceStore.selectProfile(newName)
                  }
                }
              "
              @duplicate="
                (originalName, profile) => {
                  deviceStore.duplicateProfile(originalName, profile)
                }
              "
              @delete="(profileName) => deviceStore.deleteProfile(profileName)"
            />
          </div>
        </template>
      </draggable>
    </CollapsibleContent>
  </Collapsible>
</template>

<script setup lang="ts">
import { useAppStore } from '@renderer/appStore'
import ProfileButton from '@renderer/components/profile/ProfileButton.vue'
import { Button } from '@renderer/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@renderer/components/ui/collapsible'
import { useDeviceStore } from '@renderer/deviceStore'
import {
  Check,
  ChevronRight,
  GripHorizontal,
  MoreHorizontal,
  PenLine,
  Trash2,
  X
} from 'lucide-vue-next'
import { ref } from 'vue'
import draggable from 'vuedraggable'

const deviceStore = useDeviceStore()
const appStore = useAppStore()

const dragOptions = ref({
  ghostClass: 'ghost',
  animation: 150,
  direction: 'vertical'
})

defineProps({
  categoryName: {
    type: String,
    required: true
  },
  categoryIndex: {
    type: Number,
    required: true
  }
})

const expanded = ref(true)
const confirmDelete = ref(false)

const onProfileDrop = (event, categoryIndex) => {
  if (event.moved) {
    const profile = event.moved.element
    const oldIndex = event.moved.oldIndex
    const newIndex = event.moved.newIndex
    // store.moveProfile(profile.id, oldIndex, newIndex)
    console.log('Move profile not implemented!')
  }
  if (event.added) {
    const profile = event.added.element
    const newIndex = event.added.newIndex
    // store.changeProfileCategory(profile.id, categoryIndex, newIndex)
    console.log('Change profile category not implemented!')
  }
}
</script>

<style scoped>
[data-state='open'] > .chevrot {
  transform: rotate(90deg);
}

.hideable-header:not(:only-child) {
  display: none;
}

.hideable-header:only-child {
  display: flex;
}
</style>
