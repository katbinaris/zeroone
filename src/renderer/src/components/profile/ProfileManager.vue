<template>
  <div>
    <div>
      <div
        class="flex h-12 w-full flex-nowrap items-center justify-between text-nowrap bg-zinc-900 px-4"
      >
        <button
          class="font-heading flex h-full min-w-0 flex-1 items-center"
          @click="
            appStore.setShowProfileConfig(
              deviceStore.currentProfileName && !appStore.showProfileConfig
            )
          "
        >
          <component
            :is="appStore.showProfileConfig ? Settings : List"
            class="mr-1 h-full w-5 shrink-0"
          />
          <ScrambleText
            :text="
              appStore.showProfileConfig ? deviceStore.currentProfileName : $t('profiles.title')
            "
            class="min-w-0 overflow-hidden text-ellipsis"
          />
          <ScrambleText
            v-if="!appStore.showProfileConfig"
            class="min-w-0 overflow-hidden text-ellipsis text-sm text-zinc-600"
            scramble-on-mount
            :fill-interval="20"
            :delay="500"
            :text="`(${deviceStore.profiles.length}/${maxProfiles})`"
          />
        </button>
        <div class="relative size-8">
          <Transition name="fade" class="absolute size-full">
            <button
              v-if="appStore.showProfileConfig"
              class="flex items-center justify-center text-muted-foreground hover:text-zinc-200"
              @click="appStore.setShowProfileConfig(false)"
            >
              <X class="h-5" />
            </button>
          </Transition>
          <Transition name="fade">
            <button
              v-if="!appStore.showProfileConfig"
              class="flex aspect-square h-8 items-center justify-center rounded-lg border border-zinc-100 bg-zinc-300 text-black hover:bg-zinc-200"
              @click="deviceStore.createProfile"
            >
              <Plus class="h-4" />
            </button>
          </Transition>
          <DropdownMenu v-if="false">
            <DropdownMenuTrigger>
              <Transition name="fade">
                <button
                  v-if="!appStore.showProfileConfig"
                  class="flex aspect-square h-8 items-center justify-center rounded-lg border border-zinc-100 bg-zinc-300 text-black hover:bg-zinc-200"
                >
                  <Plus class="h-4" />
                </button>
              </Transition>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem @click="deviceStore.createProfile"> Profile </DropdownMenuItem>
              <DropdownMenuItem v-if="false"> Category </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator />
    </div>
    <div class="relative grow overflow-y-auto">
      <div v-if="renderProfileList" class="absolute w-full">
        <div v-if="deviceStore.profiles.length === 0">
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
            :list="deviceStore.profileTags"
            v-bind="dragOptions"
            handle=".category-handle"
            @start="appStore.setProfileManagerDragging(true)"
            @end="appStore.setProfileManagerDragging(false)"
            @change="onCategoryDrop"
          >
            <template #item="dragCategory">
              <ProfileCategory
                :category-name="dragCategory.element"
                :category-index="dragCategory.index"
              />
            </template>
          </draggable>
        </div>
      </div>
      <Transition name="slide">
        <div v-if="appStore.showProfileConfig" class="absolute h-full bg-[#101013]">
          <ProfileConfig />
        </div>
      </Transition>
    </div>
  </div>
</template>
<script setup>
import { useAppStore } from '@renderer/appStore'
import ScrambleText from '@renderer/components/common/ScrambleText.vue'
import ProfileCategory from '@renderer/components/profile/ProfileCategory.vue'
import ProfileConfig from '@renderer/components/profile/ProfileConfig.vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@renderer/components/ui/dropdown-menu'
import { Separator } from '@renderer/components/ui/separator'
import { useDeviceStore } from '@renderer/deviceStore'
import { Settings, List, Plus, X } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'

defineProps({
  showFilter: {
    type: Boolean,
    default: false
  }
})

const deviceStore = useDeviceStore()
const appStore = useAppStore()

const dragOptions = ref({
  ghostClass: 'ghost',
  animation: 150,
  direction: 'vertical'
})

const maxProfiles = 10

const renderProfileConfig = ref(appStore.showProfileConfig)
const renderProfileList = ref(!appStore.showProfileConfig)

watch(appStore.showProfileConfig, (value) => {
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
    // store.moveProfileCategory(category.name, oldIndex, newIndex)
    console.log('Move category not implemented!')
  }
}
</script>
<style scoped>
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
</style>
