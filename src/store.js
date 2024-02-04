// import { computed, reactive } from 'vue'
//
// export const store = reactive({
//   device: {
//     profiles: [],
//     activeProfileId: null,
//     activeProfile: computed(() => {
//       return store.device.profiles.find(p => p.id === store.device.activeProfileId)
//     }),
//   },
//   currentProfileId: null,
//   currentProfile: computed(() => {
//     return store.device.profiles.find(p => p.id === store.currentProfileId)
//   }),
//   profileIds: computed(() => store.device.profiles.map(p => p.id)),
// })

import { createPinia, defineStore } from 'pinia'
import Axios from 'axios'
import schema from '@/data/profileSchema.json'
import Ajv from 'ajv'
import WIP from '@/components/WIP.vue'
import MappingConfig from '@/components/old/MappingConfig.vue'
import KnobFeedbackConfig from '@/components/config/knob/KnobFeedbackConfig.vue'
import KnobLightConfig from '@/components/config/knob/KnobLightConfig.vue'
import KeyLightConfig from '@/components/config/keys/KeyLightConfig.vue'

const ajv = new Ajv()

export const useStore = defineStore('main', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      profiles: [],
      selectedProfileId: null,
      connected: false,
      selectedFeature: 'knob',
      selectedKey: 'a',
      currentConfigPage: 'mapping',
      configPages: {
        knob: {
          mapping: {
            titleKey: 'config_options.mapping_configuration.title',
            component: MappingConfig,
          },
          feedback: {
            titleKey: 'config_options.feedback_designer.title',
            component: KnobFeedbackConfig,
          },
          lighting: {
            titleKey: 'config_options.light_designer.title',
            component: KnobLightConfig,
          },
        },
        key: {
          mapping: {
            titleKey: 'config_options.mapping_configuration.title',
            component: MappingConfig,
          },
          lighting: {
            titleKey: 'config_options.light_designer.title',
            component: KeyLightConfig,
          },
        },
      },
    }
  },
  getters:
    {
      profileIds: (state) => state.profiles.map(p => p.id),
      selectedProfile: (state) => state.profiles.find(p => p.id === state.selectedProfileId),
      currentConfigComponent: (state) => state.configPages[state.selectedFeature][state.currentConfigPage]?.component || WIP,
      currentConfigPages: (state) => state.configPages[state.selectedFeature] || {},
    }
  ,
  actions: {
    selectProfile(id) {
      if (!this.profileIds.includes(id)) return false
      this.selectedProfileId = id
      return true
    }
    ,
    addProfile() {
      console.log('addProfile is not implemented')
    }
    ,
    duplicateProfile(id) {
      const originalProfile = this.profiles.find(p => p.id === id)
      const newProfile = JSON.parse(JSON.stringify(originalProfile))
      newProfile.id = this.newProfileId(originalProfile.id)
      newProfile.name = this.newProfileName(originalProfile.name)
      this.profiles.push(newProfile)
      this.selectedProfileId = newProfile.id
      return newProfile.id
    }
    ,
    deleteProfile(id) {
      const index = this.profiles.findIndex(p => p.id === id)
      if (index >= 0) {
        this.profiles.splice(index, 1)
        if (this.selectedProfileId === id) {
          this.selectedProfileId = this.profiles[0]?.id || null
        }
        return true
      }
      return false
    }
    ,
    fetchProfiles() {
      Axios.get('http://localhost:3001/profiles').then((res) => {
        const profiles = res.data
        console.log(profiles)
        const ids = new Set()
        const validate = ajv.compile(schema)
        this.$patch({
          profiles: profiles.filter((profile) => {
            if (!validate(profile)) {
              console.error('Failed to validate profile: ' + profile.name, validate.errors)
              return false
            }
            if (ids.has(profile.id)) {
              console.error('Duplicate profile id: ' + profile.id + ' for profile: ' + profile.name)
              return false
            }
            ids.add(profile.id)
            return true
          }),
          selectedProfileId: profiles[0]?.id || null,
        })
      }).catch((err) => {
        console.error(err)
      })
    }
    ,
    newProfileName(originalName = '') {
      let name = originalName
      let i = 1
      while (this.profiles.find(p => p.name === name)) {
        name = `${originalName} (${i++})`
      }
      return name
    }
    ,
    newProfileId(originalId = '') {
      let id = originalId
      if (originalId) {
        do {
          id = Math.floor((parseInt(id) + 1) % 9999).toString().padStart(4, '0')
        } while (this.profileIds.includes(id))
      } else {
        do {
          id = Math.floor(Math.random() * 9999).toString().padStart(4, '0')
        } while (this.profileIds.includes(id))
      }
      return id
    }
    ,
    selectConfigFeature(feature) {
      this.selectedFeature = feature
      if (!this.currentConfigPages[this.currentConfigPage])
        this.setCurrentConfigPage('mapping')
    },
    selectKey(key) {
      this.selectedKey = key
      this.selectConfigFeature('key')
    },
    setCurrentConfigPage(page) {
      this.currentConfigPage = page
    },
  },
})

export const pinia = createPinia()