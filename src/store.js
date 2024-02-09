import { createPinia, defineStore } from 'pinia'
import Axios from 'axios'
import schema from '@/data/profileSchema.json'
import Ajv from 'ajv'
import WIP from '@/components/WIP.vue'
import KnobFeedbackConfig from '@/components/config/knob/KnobFeedbackConfig.vue'
import KnobLightConfig from '@/components/config/knob/KnobLightConfig.vue'
import KeyLightConfig from '@/components/config/keys/KeyLightConfig.vue'
import KnobMappingConfig from '@/components/config/knob/KnobMappingConfig.vue'
import KeyMappingConfig from '@/components/config/keys/KeyMappingConfig.vue'
import { shallowRef } from 'vue'

const ajv = new Ajv()

export const useStore = defineStore('main', {
  state: () => {
    return {
      profileCategories: [],
      selectedProfileId: null,
      connected: false,
      connectedDevices: ['test1', 'test2'],
      selectedFeature: 'knob',
      selectedKey: 'a',
      currentConfigPage: 'mapping',
      configPages: {
        knob: {
          mapping: {
            titleKey: 'config_options.mapping_configuration.title', component: shallowRef(KnobMappingConfig),
          }, feedback: {
            titleKey: 'config_options.feedback_designer.title', component: shallowRef(KnobFeedbackConfig),
          }, lighting: {
            titleKey: 'config_options.light_designer.title', component: shallowRef(KnobLightConfig),
          },
        }, key: {
          mapping: {
            titleKey: 'config_options.mapping_configuration.title', component: shallowRef(KeyMappingConfig),
          }, lighting: {
            titleKey: 'config_options.light_designer.title', component: shallowRef(KeyLightConfig),
          },
        },
      },
      previewDeviceModel: 'nanoOne',
      screenOrientation: 90,
    }
  }, getters: {
    profiles: (state) => state.profileCategories.flatMap(c => c.profiles),
    profileIds: (state) => state.profiles.map(p => p.id),
    selectedProfileCategory: (state) => state.profileCategories.find(c => c.profiles.find(p => p.id === state.selectedProfileId)),
    selectedProfile: (state) => state.profiles.find(p => p.id === state.selectedProfileId),
    currentConfigComponent: (state) => state.configPages[state.selectedFeature][state.currentConfigPage]?.component || WIP,
    currentConfigPages: (state) => state.configPages[state.selectedFeature] || {},
    multipleDevicesConnected: (state) => state.connectedDevices.length > 1,
  }, actions: {
    selectProfile(id) {
      if (!this.profileIds.includes(id)) return false
      this.selectedProfileId = id
      return true
    },
    addProfile(profile, categoryIndex, newIndex) {
      const category = this.profileCategories[categoryIndex]
      category.profiles.splice(newIndex, 0, profile)
    },
    removeProfile(profileId) {
      const category = this.profileCategories.find(c => c.profiles.find(p => p.id === profileId))
      const index = category.profiles.findIndex(p => p.id === profileId)
      category.profiles.splice(index, 1)
    },
    duplicateProfile(profileId) {
      const profile = this.profiles.find(p => p.id === profileId)
      const newProfile = JSON.parse(JSON.stringify(profile))
      newProfile.id = this.newProfileId(profile.id)
      newProfile.name = this.newProfileName(profile.name)
      const category = this.profileCategories.find(c => c.profiles.find(p => p.id === profileId))
      const index = category.profiles.findIndex(p => p.id === profileId)
      category.profiles.splice(index + 1, 0, newProfile)
      this.selectProfile(newProfile.id)
    },
    moveProfile(profileId, oldIndex, newIndex) {
      // Find the profile category, then swap the profiles at the old and new indices
      const category = this.profileCategories.find(c => c.profiles.find(p => p.id === profileId))
      const tmpProfile = category.profiles[newIndex]
      category.profiles[newIndex] = category.profiles[oldIndex]
      category.profiles[newIndex] = tmpProfile
    },
    changeProfileCategory(profileId, newCategoryIndex, newIndex) {
      const profile = this.profiles.find(p => p.id === profileId)
      const oldCategory = this.profileCategories.find(c => c.profiles.find(p => p.id === profileId))
      const newCategory = this.profileCategories[newCategoryIndex]
      oldCategory.profiles = oldCategory.profiles.filter(p => p.id !== profileId)
      newCategory.profiles.splice(newIndex, 0, profile)
    },
    renameProfile(profileId, newName) {
      const profile = this.profiles.find(p => p.id === profileId)
      profile.name = newName
    },
    fetchProfiles() {
      Axios.get('http://localhost:3001/categories').then((res) => {
        const categories = res.data
        console.log(categories)
        const ids = new Set()
        const validate = ajv.compile(schema)
        this.$patch({
          profileCategories: categories.map((category) => ({
            name: category.name, profiles: category.profiles.filter((profile) => {
              // TODO: Validation seems to be broken right now
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
          })), selectedProfileId: categories[0]?.profiles[0]?.id || null,
        })
      }).catch((err) => {
        console.error(err)
      })
    },
    newProfileName(originalName = '') {
      let name = originalName
      let i = 1
      while (this.profiles.find(p => p.name === name)) {
        name = `${originalName} (${i++})`
      }
      return name
    },
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
    },
    selectConfigFeature(feature) {
      this.selectedFeature = feature
      if (!this.currentConfigPages[this.currentConfigPage]) this.setCurrentConfigPage('mapping')
    },
    selectKey(key) {
      this.selectedKey = key
      this.selectConfigFeature('key')
    },
    setCurrentConfigPage(page) {
      this.currentConfigPage = page
    },
    setConnected(connected) {
      this.connected = connected
    },
    switchPreviewDeviceModel() {
      this.previewDeviceModel = this.previewDeviceModel === 'nanoOne' ? 'nanoZero' : 'nanoOne'
    },
    cycleScreenOrientation() {
      this.screenOrientation = (this.screenOrientation + 90) % 360
    },
  },
})

export const pinia = createPinia()