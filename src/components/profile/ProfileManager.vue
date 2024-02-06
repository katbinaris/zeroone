<template>
  <div>
    <div>
      <div
        class="w-full h-12 px-4 flex items-center justify-between flex-nowrap text-nowrap bg-zinc-900">
        <button class="flex items-center" @click="showProfileConfig=false">
          <component :is="showProfileConfig ? ArrowLeft : List" class="w-5 h-full mr-1 shrink-0" />
          <span class="font-heading mr-2">
            <ScrambleText :text="showProfileConfig ? store.selectedProfile?.name : $t('profiles.title')" />
            <ScrambleText
              v-if="!showProfileConfig" class="text-sm text-zinc-600"
              scramble-on-mount
              :fill-interval="20"
              :delay="500"
              :text="`(${store.profiles.length}/${ maxProfiles})`" />
          </span>
        </button>
        <button
          v-if="!showProfileConfig"
          class="bg-zinc-200 text-black hover:bg-zinc-100 rounded-full aspect-square h-7 flex justify-center items-center"
          @click="store.addProfile">
          <Plus class="h-4" />
        </button>
      </div>
      <Separator />
    </div>
    <div v-if="showFilter">
      <div class="flex w-full h-12 items-center">
        <label for="filter" class="flex h-full items-center cursor-text">
          <Search class="ml-4 mr-2 mb-0.5 h-4 w-4 shrink-0 opacity-50 float-left" />
        </label>
        <input
          id="filter"
          v-model="filter"
          :placeholder="$t('profiles.filter_placeholder')"
          class="grow h-full bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0">
        <button
          class="h-full flex text-zinc-200 bg-zinc-900 justify-center items-center aspect-square border-solid border-0 border-l hover:bg-zinc-800">
          <Plus />
        </button>
      </div>
      <Separator />
    </div>
    <div class="grow overflow-y-auto relative">
      <div
        v-if="renderProfileList"
        class="absolute w-full">
        <div v-if="filteredProfiles.length === 0">
          <div class="flex flex-col items-center justify-center h-32">
            <ScrambleText
              scramble-on-mount :fill-interval="5" class="text-sm text-muted-foreground"
              :text="$t('profiles.not_found')" />
          </div>
        </div>
        <div v-else>
          <Collapsible
            v-for="(category, categoryIndex) in store.profileCategories" :key="categoryIndex"
            v-model:open="collapse[categoryIndex]"
            :default-open="true">
            <!-- TODO: Make profile groups computed instead defining them of using v-for -->
            <CollapsibleTrigger
              class="w-full h-12 py-2 text-left text-muted-foreground text-sm bg-zinc-900 border-0 border-b">
              <ChevronRight class="chevrot h-4 w-4 mb-0.5 ml-4 inline-block transition-transform" />
              {{ category.name }}<span class="font-heading text-sm text-zinc-600"> ({{ category.profiles?.length || 0
              }})</span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <draggable
                :list="category.profiles"
                group="profiles"
                item-key="name"
                v-bind="dragOptions"
                @change="(event)=>onProfileDrop(event, categoryIndex)"
              >
                <template #item="{ element }">
                  <ProfileButton
                    :key="element.id"
                    :profile="element"
                    :selected="store.selectedProfile?.id === element.id"
                    @select="store.selectProfile(element.id); showProfileConfig=true"
                    @duplicate="store.duplicateProfile(element.id)"
                    @delete="store.removeProfile(element.id)" />
                </template>
              </draggable>
              <!-- TODO: Insert draggable component here -->
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
      <Transition name="slide">
        <div v-if="showProfileConfig" class="absolute bg-[#101013] h-full">
          <ProfileConfig />
        </div>
      </Transition>
    </div>
  </div>
</template>
<script setup>
import { Separator } from '@/components/ui/separator'
import { ChevronRight, Plus, Search, ArrowLeft, List } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import ScrambleText from '@/components/common/ScrambleText.vue'
import { useStore } from '@/store.js'
import ProfileButton from '@/components/profile/ProfileButton.vue'
import ProfileConfig from '@/components/profile/ProfileConfig.vue'
import draggable from 'vuedraggable'

defineProps({
  showFilter: {
    type: Boolean,
    default: false,
  },
})

const maxProfiles = 32

const store = useStore()
const filter = ref('')
const collapse = ref({})

const showProfileConfig = ref(false)
const renderProfileConfig = ref(showProfileConfig.value)
const renderProfileList = ref(!showProfileConfig.value)

watch(showProfileConfig, value => {
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

const filteredProfiles = computed(() => {
  if (!filter.value) {
    return store.profiles
  }
  const filterLower = filter.value.toLowerCase()
  return store.profiles.filter(profile => {
    const nameLower = profile.name.toLowerCase()
    const idLower = profile.id.toLowerCase()
    const tagLower = profile.profileTag.toLowerCase()
    return nameLower.includes(filterLower) || idLower.includes(filterLower) || tagLower.includes(filterLower)
  })
})

const filteredProfilesByTag = computed(() => {
  const map = new Map()
  filteredProfiles.value.forEach(profile => {
    const tag = profile.profileTag || 'Uncategorized'
    if (!map.has(tag)) {
      map.set(tag, [])
    }
    map.get(tag).push(profile)
  })
  return map
})

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

const dragOptions = {
  group: 'profiles',
  animation: 150,
}

</script>
<style scoped>
[data-state=open] > .chevrot {
  transform: rotate(90deg);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 150ms ease;
}

.slide-enter-active {
  transition-delay: 150ms;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>