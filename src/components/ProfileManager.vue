<template>
  <div>
    <div
      class="px-4 h-20 flex items-center">
      <div>
        <h1 class="text-lg">
          {{ $t(`profiles.title`) }}<span class="text-sm text-zinc-600"> ({{ profiles.length }}/{{ maxProfiles
          }})</span>
        </h1>
        <p class="text-xs text-muted-foreground">
          {{ $t(`profiles.subtitle`) }}
        </p>
      </div>
    </div>
    <Separator />
    <div>
      <div class="flex w-full h-12 items-center">
        <label for="filter" class="flex h-full items-center cursor-text">
          <Search class="ml-4 mr-2 mb-0.5 h-4 w-4 shrink-0 opacity-50 float-left" />
        </label>
        <input
          id="filter"
          v-model="filter"
          :placeholder="$t('profiles.filter_placeholder')"
          class="grow h-full bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50">
      </div>
      <Separator />
      <div v-if="filteredProfiles.length === 0">
        <div class="flex flex-col items-center justify-center h-32">
          <ScrambleText scramble-on-mount fill-interval="5" class="text-sm text-muted-foreground" :text="$t('profiles.not_found')" />
        </div>
      </div>
      <div>
        <Collapsible
          v-for="[profileTag, tagProfiles] in filteredProfilesByTag" :key="profileTag" :default-open="true"
          :open="collapse[profileTag]">
          <CollapsibleTrigger
            v-model="collapse[profileTag]"
            class="w-full h-12 py-2 text-left text-muted-foreground text-sm hover:bg-zinc-900">
            <ChevronRight class="chevrot h-4 w-4 mb-0.5 ml-4 inline-block transition-transform" />
            {{ profileTag }}<span class="font-heading text-sm text-zinc-600"> ({{ tagProfiles.length }})</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div
              v-for="profile in tagProfiles" :key="profile.id"
              class="h-12 flex profile-row">
              <button
                :data-selected="currentProfile===profile.id"
                class="flex-1 h-full text-left data-[selected=true]:font-semibold hover:bg-zinc-900 data-[selected=true]:bg-zinc-200 hover:data-[selected=true]:bg-zinc-100 data-[selected=true]:text-black flex-nowrap text-ellipsis overflow-hidden whitespace-nowrap"
                @click="currentProfile=profile.id; profileTitles[profile.id].scramble()">
                <FileDigit
                  :data-selected="currentProfile===profile.id"
                  class="h-4 w-4 mb-1 ml-10 mr-2 inline-block text-muted-foreground data-[selected=true]:text-zinc-600" />
                <ScrambleText :ref="el => { profileTitles[profile.id] = el }" :text="profile.name" />
                <span class="text-xs text-zinc-600"> uID:{{ profile.id }}</span>
              </button>
              <button
                :data-selected="currentProfile===profile.id"
                class="h-full bg-orange-950 hover:bg-orange-700 aspect-square text-black hidden justify-center items-center delete-button data-[selected=true]:bg-orange-600 hover:data-[selected=true]:bg-orange-500">
                <Trash2 class="h-4 w-4" />
              </button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
    <SchemaTest />
  </div>
</template>
<script setup>
import SchemaTest from '@/components/SchemaTest.vue'
import { Separator } from '@/components/ui/separator/index.js'
import { FileDigit, ChevronRight, Search, Trash2 } from 'lucide-vue-next'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import ScrambleText from '@/components/effects/ScrambleText.vue'

const maxProfiles = 32

const profiles = ref([])
const filter = ref('')
const collapse = ref({})

const currentProfile = ref(null)
const profileTitles = ref({})

const filteredProfiles = computed(() => {
  if (!filter.value) {
    return profiles.value
  }
  const filterLower = filter.value.toLowerCase()
  return profiles.value.filter(profile => {
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

function fetchProfiles() {
  axios.get('http://localhost:3001/profiles').then(res => {
    profiles.value = res.data
  }).catch(err => {
    console.error(err)
  })
}

onMounted(() => {
  fetchProfiles()
})
</script>
<style>
[data-state=open] > .chevrot {
  transform: rotate(90deg);
}

.profile-row:hover .delete-button {
  display: flex;
}
</style>