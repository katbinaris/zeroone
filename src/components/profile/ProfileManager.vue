<template>
  <div>
    <div>
      <div
        class="w-full h-12 px-4 flex items-center justify-between flex-nowrap text-nowrap bg-zinc-900">
        <button class="flex items-center" @click="showProfileList=true">
          <component :is="showProfileList ? List : ArrowLeft" class="w-5 h-full mr-1" />
          <span class="font-heading mr-2">
            <ScrambleText :text="showProfileList ? $t('profiles.title') : store.selectedProfile?.name" />
            <ScrambleText
              v-if="showProfileList" class="text-sm text-zinc-600"
              scramble-on-mount
              :fill-interval="20"
              :delay="500"
              :text="`(${store.profiles.length}/${ maxProfiles})`" />
          </span>
        </button>
        <button
          v-if="showProfileList"
          class="bg-zinc-200 text-black hover:bg-zinc-100 rounded-full aspect-square h-7 flex justify-center items-center"
          @click="store.addProfile">
          <Plus class="h-4" />
        </button>
      </div>
      <Separator />
    </div>
    <template v-if="showProfileList">
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
      <div class="grow overflow-y-auto">
        <div v-if="filteredProfiles.length === 0">
          <div class="flex flex-col items-center justify-center h-32">
            <ScrambleText
              scramble-on-mount :fill-interval="5" class="text-sm text-muted-foreground"
              :text="$t('profiles.not_found')" />
          </div>
        </div>
        <div v-else>
          <Collapsible
            v-for="[profileTag, tagProfiles] in filteredProfilesByTag" :key="profileTag"
            v-model:open="collapse[profileTag]"
            :default-open="true">
            <!-- TODO: Make profile groups computed instead defining them of using v-for -->
            <CollapsibleTrigger
              class="w-full h-12 py-2 text-left text-muted-foreground text-sm bg-zinc-900 border-0 border-b">
              <ChevronRight class="chevrot h-4 w-4 mb-0.5 ml-4 inline-block transition-transform" />
              {{ profileTag }}<span class="font-heading text-sm text-zinc-600"> ({{ tagProfiles.length }})</span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <!-- TODO: Insert draggable component here -->
              <ProfileButton
                v-for="(profile, index) in tagProfiles" :key="profile.id" v-model="tagProfiles[index]"
                :selected="store.selectedProfile?.id === profile.id"
                @select="store.selectProfile(profile.id); showProfileList=false"
                @duplicate="store.duplicateProfile(profile.id)"
                @delete="store.deleteProfile(profile.id)" />
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </template>
    <div v-else class="grow overflow-y-auto">
      <ProfileConfig />
    </div>
  </div>
</template>
<script setup>
import { Separator } from '@/components/ui/separator'
import { ChevronRight, Plus, Search, ArrowLeft, List } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import ScrambleText from '@/components/common/ScrambleText.vue'
import { useStore } from '@/store.js'
import ProfileButton from '@/components/profile/ProfileButton.vue'
import ProfileConfig from '@/components/profile/ProfileConfig.vue'

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

const showProfileList = ref(true)

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

</script>
<style scoped>
[data-state=open] > .chevrot {
  transform: rotate(90deg);
}
</style>