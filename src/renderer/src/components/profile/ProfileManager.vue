<template>
  <div>
    <div>
      <div
        class="flex h-12 w-full flex-nowrap items-center justify-between text-nowrap bg-zinc-900 px-4"
      >
        <button
          class="font-heading flex h-full min-w-0 flex-1 items-center"
          @click="showProfileConfig = store.selectedProfile && !showProfileConfig"
        >
          <component :is="showProfileConfig ? ArrowLeft : List" class="mr-1 h-full w-5 shrink-0" />
          <ScrambleText
            :text="showProfileConfig ? store.selectedProfile?.name : $t('profiles.title')"
            class="min-w-0 overflow-hidden text-ellipsis"
          />
          <ScrambleText
            v-if="!showProfileConfig"
            class="min-w-0 overflow-hidden text-ellipsis text-sm text-zinc-600"
            scramble-on-mount
            :fill-interval="20"
            :delay="500"
            :text="`(${store.profiles.length}/${maxProfiles})`"
          />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Transition name="fade">
              <button
                v-if="!showProfileConfig"
                class="flex aspect-square h-8 items-center justify-center rounded-lg border border-zinc-100 bg-zinc-300 text-black hover:bg-zinc-200"
                @click="store.addProfile"
              >
                <Plus class="h-4" />
              </button>
            </Transition>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem> Profile </DropdownMenuItem>
            <DropdownMenuItem> Category </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />
    </div>
    <div class="relative grow overflow-y-auto">
      <div v-if="renderProfileList" class="absolute w-full">
        <div v-if="store.profiles.length === 0">
          <div class="flex h-32 flex-col items-center justify-center">
            <ScrambleText
              scramble-on-mount
              :fill-interval="5"
              class="text-sm text-muted-foreground"
              :text="$t('profiles.not_found')"
            />
          </div>
        </div>
        <div v-else>
          <draggable
            key="categoriesDraggable"
            group="profileCategories"
            item-key="name"
            :list="store.profileCategories"
            v-bind="dragOptions"
            @start="drag = true"
            @end="drag = false"
            @change="onCategoryDrop"
          >
            <template #item="dragCategory">
              <Collapsible v-model:open="collapse[dragCategory.element.name]" :default-open="true">
                <!-- TODO: Make profile groups computed instead defining them of using v-for -->
                <CollapsibleTrigger
                  class="h-12 w-full border-0 border-b bg-zinc-900 py-2 text-left text-sm text-muted-foreground"
                >
                  <ChevronRight
                    class="chevrot mb-0.5 ml-4 inline-block size-4 transition-transform"
                  />
                  {{ dragCategory.element.name
                  }}<span class="font-heading text-sm text-zinc-600">
                    ({{ dragCategory.element.profiles?.length || 0 }})</span
                  >
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <TransitionGroup>
                    <draggable
                      key="profilesDraggable"
                      group="profiles"
                      item-key="id"
                      :list="dragCategory.element.profiles"
                      v-bind="dragOptions"
                      @start="drag = true"
                      @end="drag = false"
                      @change="(event) => onProfileDrop(event, dragCategory.index)"
                    >
                      <template v-if="dragCategory.element.profiles.length === 0" #header>
                        <div class="hideable-header flex h-12 items-center justify-center">
                          <MoreHorizontal class="w-4 text-zinc-600" />
                        </div>
                      </template>
                      <template #item="dragProfile">
                        <div :key="dragProfile.element.name">
                          <ProfileButton
                            :profile="dragProfile.element"
                            :show-hover-buttons="!drag"
                            :selected="store.selectedProfile?.id === dragProfile.element.id"
                            @select="
                              () => {
                                store.selectProfile(dragProfile.element.id)
                                showProfileConfig = true
                              }
                            "
                            @duplicate="store.duplicateProfile(dragProfile.element.id)"
                            @delete="store.removeProfile(dragProfile.element.id)"
                          />
                        </div>
                      </template>
                    </draggable>
                  </TransitionGroup>
                </CollapsibleContent>
              </Collapsible>
            </template>
          </draggable>
        </div>
      </div>
      <Transition name="slide">
        <div v-if="showProfileConfig" class="absolute h-full bg-[#101013]">
          <ProfileConfig />
        </div>
      </Transition>
    </div>
  </div>
</template>
<script setup>
import { Separator } from '@renderer/components/ui/separator'
import { ChevronRight, Plus, ArrowLeft, List, MoreHorizontal } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@renderer/components/ui/collapsible'
import ScrambleText from '@renderer/components/common/ScrambleText.vue'
import { useStore } from '@renderer/store'
import ProfileButton from '@renderer/components/profile/ProfileButton.vue'
import ProfileConfig from '@renderer/components/profile/ProfileConfig.vue'
import draggable from 'vuedraggable'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@renderer/components/ui/dropdown-menu'

defineProps({
  showFilter: {
    type: Boolean,
    default: false
  }
})

const dragOptions = ref({
  ghostClass: 'ghost',
  animation: 150,
  direction: 'vertical'
})

const maxProfiles = 32

const store = useStore()
const collapse = ref({})

const showProfileConfig = ref(false)
const renderProfileConfig = ref(showProfileConfig.value)
const renderProfileList = ref(!showProfileConfig.value)

const drag = ref(false)

watch(showProfileConfig, (value) => {
  if (value) {
    renderProfileConfig.value = true
    setTimeout(() => {
      renderProfileList.value = false
    }, 300)
  } else {
    renderProfileList.value = true
    setTimeout(() => {
      renderProfileConfig.value = false
    }, 300)
  }
})

// const filteredProfiles = computed(() => {
//   if (!filter.value) {
//     return store.profiles
//   }
//   const filterLower = filter.value.toLowerCase()
//   return store.profiles.filter(profile => {
//     const nameLower = profile.name.toLowerCase()
//     const idLower = profile.id.toLowerCase()
//     const tagLower = profile.profileTag.toLowerCase()
//     return nameLower.includes(filterLower) || idLower.includes(filterLower) || tagLower.includes(filterLower)
//   })
// })
//
// const filteredProfilesByTag = computed(() => {
//   const map = new Map()
//   filteredProfiles.value.forEach(profile => {
//     const tag = profile.profileTag || 'Uncategorized'
//     if (!map.has(tag)) {
//       map.set(tag, [])
//     }
//     map.get(tag).push(profile)
//   })
//   return map
// })

const onCategoryDrop = (event) => {
  if (event.moved) {
    const category = event.moved.element
    const oldIndex = event.moved.oldIndex
    const newIndex = event.moved.newIndex
    store.moveProfileCategory(category.name, oldIndex, newIndex)
  }
}

const onProfileDrop = (event, categoryIndex) => {
  if (event.moved) {
    const profile = event.moved.element
    const oldIndex = event.moved.oldIndex
    const newIndex = event.moved.newIndex
    store.moveProfile(profile.id, oldIndex, newIndex)
  }
  if (event.added) {
    const profile = event.added.element
    const newIndex = event.added.newIndex
    store.changeProfileCategory(profile.id, categoryIndex, newIndex)
  }
}
</script>
<style scoped>
[data-state='open'] > .chevrot {
  transform: rotate(90deg);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 300ms ease;
}

.slide-enter-active {
  transition-delay: 150ms;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.sortable-drag {
  opacity: 0;
}

.hideable-header:not(:only-child) {
  display: none;
}

.hideable-header:only-child {
  display: flex;
}
</style>
