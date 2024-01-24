<script setup>
import { FileDigit } from 'lucide-vue-next'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import PixelBarTest from '@/components/device-gui/DeviceBar.vue'
import SchemaTest from '@/components/SchemaTest.vue'
</script>

<template>
  <div class="h-60">
    <input
      v-model="defaultName"
      type="text"
      aria-label="Add Profile"
      placeholder="add Profile"
      @keyup.enter="addNewProfile"
    >
    <Command>

      <CommandList>

        <CommandInput placeholder="Search Profile..." />
        <CommandEmpty>No profile found</CommandEmpty>
        <CommandGroup v-for="(profileTag, index) in tags" :key="index" :heading="profileTag">
          <CommandItem
            v-for="(name, id, innerIndex) in names(profileTag)" :key="innerIndex" class="cursor-pointer"
            :value="name.id">
            <FileDigit color="grey" class="w-4 h-4 mr-2" />
            {{ name.name }} <span class="text-xs pl-2 text-muted-foreground text-right">uID: {{ name.id }} </span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
      <CommandSeparator />

    </Command>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'NanoConfig',
  data() {
    return {
      profiles: [],
    }
  },
  computed: {
    tags() {
      const tags = new Set()
      this.profiles.forEach(tag => tags.add(tag.profileTag))
      return Array.from(tags)
    },
  },
  async created() {
    try {
      const res = await axios.get('http://localhost:3001/profiles')
      this.profiles = res.data
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    names(profileTag) {
      return this.profiles
        .filter(tag => tag.profileTag === profileTag)
        .map(tag => ({ name: tag.name, id: tag.id }))
    },
    async addNewProfile() {
      try {
        const res = await axios.post('http://localhost:3001/profiles',
          {

            name: this.defaultName,
            profileTag: 'Uncategorized',
            profileConfig: {
              profileDesc: '',
              profileType: 1,
              showDesc: true,
            },
            feedbackConfig: {
              feedbackEn: true,
              feedbackType: 'fd',
              multiRev: false,
              feedbackStrength: 1,
              endstopStrength: 1,
              outputRamp: 10000,
              minMaxPos: [0, 156],
              secondaryHaptic: true,
              secondaryVol: 5,
            },
            mappingConfig: {
              internalMacro: false,
              knobMap: 'arrL',
              switchA: 'shift',
              switchB: 'ctrl',
              switchC: 'alt',
              switchD: 'esc',
            },
            ledConfig: {
              ledEnable: true,
              ledMode: 1,
              primary: {
                h: 100,
                s: 100,
                l: 100,
              },
              secondary: {
                h: 120,
                s: 120,
                l: 120,
              },
              pointer: {
                h: 255,
                s: 255,
                l: 255,
              },
            },
            guiConfig: {
              guiEnable: true,
            },
          })

        this.profiles = [...this.profiles, res.data]

        this.defaultName = ''
      } catch (e) {
        console.error(e)
      }

    },
  },
}
</script>