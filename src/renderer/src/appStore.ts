import { defineStore } from 'pinia'
import WIP from '@renderer/components/WIP.vue'
import KnobFeedbackConfig from '@renderer/components/config/knob/KnobFeedbackConfig.vue'
import KnobLightConfig from '@renderer/components/config/knob/KnobLightConfig.vue'
import KeyLightConfig from '@renderer/components/config/keys/KeyLightConfig.vue'
import KnobMappingConfig from '@renderer/components/config/knob/KnobMappingConfig.vue'
import KeyMappingConfig from '@renderer/components/config/keys/KeyMappingConfig.vue'
import { shallowRef } from 'vue'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      selectedFeature: 'knob',
      selectedKey: 'a',
      currentConfigPage: 'mapping',
      configPages: {
        knob: {
          mapping: {
            titleKey: 'config_options.mapping_configuration.title',
            component: shallowRef(KnobMappingConfig)
          },
          feedback: {
            titleKey: 'config_options.feedback_designer.title',
            component: shallowRef(KnobFeedbackConfig)
          },
          lighting: {
            titleKey: 'config_options.light_designer.title',
            component: shallowRef(KnobLightConfig)
          }
        },
        key: {
          mapping: {
            titleKey: 'config_options.mapping_configuration.title',
            component: shallowRef(KeyMappingConfig)
          },
          lighting: {
            titleKey: 'config_options.light_designer.title',
            component: shallowRef(KeyLightConfig)
          }
        }
      },
      previewDeviceModel: localStorage.getItem('previewDeviceModel') || 'nanoOne'
    }
  },
  getters: {
    // profiles: (state) => state.profileCategories.flatMap((c) => c.profiles),
    // profileIds: (state) => state.profiles.map((p) => p.id),
    // selectedProfileCategory: (state) =>
    //   state.profileCategories.find((c) => c.profiles.find((p) => p.id === state.selectedProfileId)),
    // selectedProfile: (state) => state.profiles.find((p) => p.id === state.selectedProfileId),
    currentConfigComponent: (state) =>
      state.configPages[state.selectedFeature][state.currentConfigPage]?.component || WIP,
    currentConfigPages: (state) => state.configPages[state.selectedFeature] || {}
    // multipleDevicesConnected: (state) => state.connectedDevices.length > 1,
    // numAttachedDevices: (state) => Object.keys(state.devices).length
    // connected: (state) => state.connectedId !== null,
  },
  actions: {
    // selectProfile(id) {
    //   if (!this.profileIds.includes(id)) return false
    //   this.selectedProfileId = id
    //   return true
    // },
    // addProfile(profile, categoryIndex, newIndex) {
    //   const category = this.profileCategories[categoryIndex]
    //   category.profiles.splice(newIndex, 0, profile)
    // },
    // removeProfile(profileId) {
    //   const category = this.profileCategories.find((c) =>
    //     c.profiles.find((p) => p.id === profileId)
    //   )
    //   const index = category.profiles.findIndex((p) => p.id === profileId)
    //   category.profiles.splice(index, 1)
    // },
    // duplicateProfile(profileId) {
    //   const profile = this.profiles.find((p) => p.id === profileId)
    //   const newProfile = JSON.parse(JSON.stringify(profile))
    //   newProfile.id = this.newProfileId(profile.id)
    //   newProfile.name = this.newProfileName(profile.name)
    //   const category = this.profileCategories.find((c) =>
    //     c.profiles.find((p) => p.id === profileId)
    //   )
    //   const index = category.profiles.findIndex((p) => p.id === profileId)
    //   category.profiles.splice(index + 1, 0, newProfile)
    //   this.selectProfile(newProfile.id)
    // },
    // moveProfile(profileId, oldIndex, newIndex) {
    //   // Find the profile category, then swap the profiles at the old and new indices
    //   const category = this.profileCategories.find((c) =>
    //     c.profiles.find((p) => p.id === profileId)
    //   )
    //   const tmpProfile = category.profiles[newIndex]
    //   category.profiles[newIndex] = category.profiles[oldIndex]
    //   category.profiles[newIndex] = tmpProfile
    // },
    // moveProfileCategory(categoryName, oldIndex, newIndex) {
    //   const tmpCategory = this.profileCategories[newIndex]
    //   this.profileCategories[newIndex] = this.profileCategories[oldIndex]
    //   this.profileCategories[newIndex] = tmpCategory
    // },
    // changeProfileCategory(profileId, newCategoryIndex, newIndex) {
    //   const profile = this.profiles.find((p) => p.id === profileId)
    //   const oldCategory = this.profileCategories.find((c) =>
    //     c.profiles.find((p) => p.id === profileId)
    //   )
    //   const newCategory = this.profileCategories[newCategoryIndex]
    //   oldCategory.profiles = oldCategory.profiles.filter((p) => p.id !== profileId)
    //   newCategory.profiles.splice(newIndex, 0, profile)
    // },
    // renameProfile(profileId, newName) {
    //   const profile = this.profiles.find((p) => p.id === profileId)
    //   profile.name = newName
    // },
    // fetchProfiles() {
    //   const categories = mockData.categories
    //   console.log(categories)
    //   const ids = new Set()
    //   // const validate = ajv.compile(schema) // see below
    //   this.$patch({
    //     profileCategories: categories.map((category) => ({
    //       name: category.name,
    //       profiles: category.profiles.filter((profile) => {
    //         // Ajv validation requires unsafe-eval CSP, let's not do that
    //         // TODO: Remove ajv validation completely or compile schema at build time
    //         // if (!validate(profile)) {
    //         //   console.error('Failed to validate profile: ' + profile.name, validate.errors)
    //         //   return false
    //         // }
    //         if (ids.has(profile.id)) {
    //           console.error('Duplicate profile id: ' + profile.id + ' for profile: ' + profile.name)
    //           return false
    //         }
    //         ids.add(profile.id)
    //         return true
    //       })
    //     })),
    //     selectedProfileId: categories[0]?.profiles[0]?.id || null
    //   })
    // },
    // newProfileName(originalName = '') {
    //   let name = originalName
    //   let i = 1
    //   while (this.profiles.find((p) => p.name === name)) {
    //     name = `${originalName} (${i++})`
    //   }
    //   return name
    // },
    // newProfileId(originalId = '') {
    //   let id = originalId
    //   if (originalId) {
    //     do {
    //       id = Math.floor((parseInt(id) + 1) % 9999)
    //         .toString()
    //         .padStart(4, '0')
    //     } while (this.profileIds.includes(id))
    //   } else {
    //     do {
    //       id = Math.floor(Math.random() * 9999)
    //         .toString()
    //         .padStart(4, '0')
    //     } while (this.profileIds.includes(id))
    //   }
    //   return id
    // },
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
    // setConnected(connected) {
    //   this.connected = connected
    // },
    switchPreviewDeviceModel() {
      this.previewDeviceModel = this.previewDeviceModel === 'nanoOne' ? 'nanoZero' : 'nanoOne'
      localStorage.setItem('previewDeviceModel', this.previewDeviceModel)
    }
    // cycleScreenOrientation() {
    //   this.screenOrientation = (this.screenOrientation + 90) % 360
    // },
    // setKeyDefaultColor(color) {
    //   // this.selectedProfile.keys[this.selectedKey].default = color
    //   const props = {}
    //   props[`button${this.selectedKey.toUpperCase()}Idle`] = color.rgbNumber()
    //   nanoIpc.send(this.connectedId, { p: { name: 'Default Profile', ...props } })
    // },
    // setKeyPressedColor(color) {
    //   // this.selectedProfile.keys[this.selectedKey].pressed = color
    //   const props = {}
    //   props[`button${this.selectedKey.toUpperCase()}Press`] = color.rgbNumber()
    //   nanoIpc.send(this.connectedId, { p: { name: 'Default Profile', ...props } })
    // },

    // // devices, device attachment, connection, and disconnection
    // init_devices(ids) {
    //   console.log('Initializing devices: ', ids)
    //   for (const id of ids) this.update_devices(id, true)
    //   if (Object.keys(this.devices).length == 1) {
    //     // TODO auto-connect to the device
    //     const deviceid = Object.keys(this.devices)[0]
    //     console.log('Auto-connecting to device ', deviceid)
    //     window.nanoIpc.connect(deviceid)
    //   }
    // },
    // update_devices(deviceid, attached) {
    //   if (attached) {
    //     if (!this.devices.hasOwnProperty(deviceid))
    //       this.devices[deviceid] = { serialNumber: deviceid, connected: false }
    //   } else {
    //     if (this.devices.hasOwnProperty(deviceid)) delete this.devices[deviceid] // TODO maybe mark as detached instead of deleting? then we can remember its name, etc...
    //   }
    // },
    // device_attached(deviceid) {
    //   this.update_devices(deviceid, true)
    //   if (Object.keys(this.devices).length == 1) {
    //     // TODO auto-connect to the device
    //     console.log('Auto-connecting to device ', deviceid)
    //     window.nanoIpc.connect(deviceid)
    //   }
    // },
    // device_detached(deviceid) {
    //   if (this.devices[deviceid].connected) {
    //     // detached event arrived before disconnected event?
    //     this.devices[deviceid].connected = false
    //     this.connected = false
    //   }
    //   this.update_devices(deviceid, false)
    // },
    // device_connected(deviceid) {
    //   this.devices[deviceid].connected = true
    //   this.connected = true
    //   this.connectedId = deviceid
    //   // TODO load profiles from device
    //   // nanoIpc.send(deviceid, { profiles: "#all" }) // request profiles
    //   // "Default Profile", for now, is the only profile after the device
    //   // starts up, so it is also the current (eg. 'selected') profile
    //   // nanoIpc.send(deviceid, { p: "Default Profile" }) // request Default Profile

    //   // TODO maybe you want to request all the profiles right now?
    //   // or only on demand?
    // },
    // device_disconnected(deviceid) {
    //   this.devices[deviceid].connected = false
    //   this.connected = false
    //   this.connectedId = null
    //   // TODO switch UI to disconnected state
    // },

    // // device events
    // update_knob_position(turns, angle, velocity) {
    //   this.turns = turns
    //   this.angle = angle
    //   this.velocity = velocity
    //   this.last_event = Date.now()
    // },
    // update_keystate(keystate) {
    //   this.keyState = keystate
    //   this.last_event = Date.now()
    // },

    // // settings changes
    // update_device_name(name) {
    //   this.devices[this.connectedId].name = name
    // }
  }
})
