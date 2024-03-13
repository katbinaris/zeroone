import { defineStore } from 'pinia'
import { useDebounceFn } from '@vueuse/core'
import { useAppStore } from '@renderer/appStore'

interface Profile {
  version: number
  name: string
  desc: string
  profileTag: string
  profileType: number
  profile_type: number
  position_num: number
  attract_distance: number
  feedback_strength: number
  bounce_strength: number
  haptic_click_strength: number
  output_ramp: number
  ledEnable: boolean
  ledBrightness: number
  ledMode: number
  pointer: number
  primary: number
  secondary: number
  buttonAIdle: number
  buttonBIdle: number
  buttonCIdle: number
  buttonDIdle: number
  buttonAPress: number
  buttonBPress: number
  buttonCPress: number
  buttonDPress: number
  internalMacro: boolean
  knobMap: string
  switchA: string
  switchB: string
  switchC: string
  switchD: string
  guiEnable: boolean
}

interface UpdateData {
  a: number | undefined
  t: number | undefined
  v: number | undefined
  profiles: string[] | undefined
  current: string | undefined
  profile: Profile | undefined
  kd: number | undefined
  ku: number | undefined
}

const { nanoIpc } = window

export const useDeviceStore = defineStore('device', {
  state: () => ({
    attachedDeviceIds: [] as string[], // list of attached device ids
    currentDeviceId: null as string | null, // id of the current device
    profileNames: [] as string[], // list of profile names
    profiles: [] as Profile[], // list of profiles
    currentProfileName: null as string | null, // name of the current profile
    orientation: 0 as number, // orientation of the device
    dirtyState: false as boolean, // whether the device state has changed
    angle: 0 as number, // angle of the knob
    turns: 0 as number, // number of turns of the knob
    velocity: 0 as number, // velocity of the knob
    keyLabels: ['a', 'b', 'c', 'd'] as string[], // labels for the keys
    keyStates: {} as Record<string, boolean> // state of the keys (true if pressed)
  }),
  getters: {
    connected: (state) => state.currentDeviceId !== null,
    currentProfile: (state): Profile | null =>
      state.profiles.find((profile) => profile.name === state.currentProfileName) || null,
    profileTags: (state) => [...new Set(state.profiles.map((profile) => profile.profileTag))],
    profilesByTag: (state) =>
      state.profiles.reduce((acc, profile) => {
        if (!acc[profile.profileTag]) {
          acc[profile.profileTag] = []
        }
        acc[profile.profileTag].push(profile)
        return acc
      }, {}),
    keyColor: (state) => (key: string, pressed: boolean) => {
      const propertyName = `button${key.toUpperCase()}${pressed ? 'Press' : 'Idle'}`
      return state.currentProfile ? state.currentProfile[propertyName] : 0
    }
  },
  actions: {
    setAttachedDeviceIds(deviceIds: string[]) {
      this.attachedDeviceIds = deviceIds
    },
    attachDevice(deviceId: string) {
      if (!this.attachedDeviceIds.includes(deviceId)) {
        this.attachedDeviceIds.push(deviceId)
      }
    },
    selectProfile(profileName: string, updateDevice: boolean = true) {
      this.currentProfileName = profileName
      if (updateDevice) {
        nanoIpc.send(this.currentDeviceId!, JSON.stringify({ current: profileName }))
      }
    },
    addProfile(profile: Profile, updateDevice: boolean = true) {
      if (!this.profileNames.includes(profile.name)) {
        this.profileNames.push(profile.name)
      }
      const existingProfile = this.profiles.find((p) => p.name === profile.name)
      if (existingProfile) {
        Object.assign(existingProfile, profile)
      } else {
        this.profiles.push(profile)
      }
      if (updateDevice) {
        const newProfile = JSON.parse(JSON.stringify(profile))
        delete newProfile.name
        console.log('Sending new profile:', newProfile)
        console.log('with name', profile.name)
        nanoIpc.send(
          this.currentDeviceId!,
          JSON.stringify({ profile: profile.name, updates: newProfile })
        )
      }
    },
    renameProfile(oldName: string, newName: string, updateDevice: boolean = true) {
      if (this.profileNames.includes(newName)) {
        console.error('Profile name already exists:', newName)
      }
      const profile = this.profiles.find((p) => p.name === oldName)
      if (profile) {
        profile.name = newName
        if (updateDevice) {
          nanoIpc.send(
            this.currentDeviceId!,
            JSON.stringify({ profile: oldName, updates: { name: newName } })
          )
        }
      }
    },
    deleteProfile(profileName: string, updateDevice: boolean = true) {
      const index = this.profileNames.indexOf(profileName)
      if (index !== -1) {
        this.profileNames.splice(index, 1)
      }
      const profile = this.profiles.find((p) => p.name === profileName)
      if (profile) {
        const profileIndex = this.profiles.indexOf(profile)
        this.profiles.splice(profileIndex, 1)
      }
      if (this.currentProfileName === profileName && this.profileNames.length > 0) {
        this.selectProfile(this.profileNames[0], updateDevice)
      }
      if (updateDevice) {
        nanoIpc.send(this.currentDeviceId!, JSON.stringify({ profiles: this.profileNames }))
      }
    },
    duplicateProfile(profileName: string, updateDevice: boolean = true) {
      const profile = this.profiles.find((p) => p.name === profileName)
      if (profile) {
        const newProfile = JSON.parse(JSON.stringify(profile))
        newProfile.name = profileName + ' Copy'
        this.addProfile(newProfile, updateDevice)
        if (this.currentProfileName === profileName) {
          this.selectProfile(newProfile.name, updateDevice)
        }
      }
    },
    detachDevice(deviceId: string) {
      const index = this.attachedDeviceIds.indexOf(deviceId)
      if (index !== -1) {
        this.attachedDeviceIds.splice(index, 1)
      }
    },
    connectDevice(deviceId: string | undefined = undefined, updateDevice: boolean = true) {
      if (deviceId) {
        this.currentDeviceId = deviceId
        if (updateDevice) {
          nanoIpc.connect(deviceId)
        }
      } else if (this.attachedDeviceIds.length > 0) {
        this.connectDevice(this.attachedDeviceIds[0])
      }
    },
    disconnectDevice(deviceId: string, updateDevice: boolean = true) {
      this.currentDeviceId = null
      if (updateDevice) {
        nanoIpc.disconnect(deviceId)
      }
    },
    setProfileNames(profileNames: string[], updateDevice: boolean = true) {
      this.profileNames = profileNames
      if (updateDevice) {
        nanoIpc.send(this.currentDeviceId!, JSON.stringify({ profiles: profileNames }))
      }
    },
    setCurrentProfile(profileName: string, updateDevice: boolean = true) {
      this.currentProfileName = profileName
      if (updateDevice) {
        nanoIpc.send(this.currentDeviceId!, JSON.stringify({ current: profileName }))
      }
    },
    setOrientation(orientation: number, updateDevice: boolean = true) {
      this.orientation = orientation
      if (updateDevice) {
        // TODO: send orientation to device
        console.log('No orientation API message yet! Orientation:', orientation)
      }
    },
    cycleOrientation() {
      this.setOrientation((this.orientation + 90) % 360)
    },
    setAngle(angle: number) {
      this.angle = angle
    },
    setKeyColor(key: string, pressed: boolean, color: number, updateDevice: boolean = true) {
      const propertyName = `button${key.toUpperCase()}${pressed ? 'Press' : 'Idle'}`
      this.currentProfile![propertyName] = color
      if (updateDevice) {
        sendDebounced(
          this.currentDeviceId!,
          JSON.stringify({ profile: this.currentProfileName, updates: { [propertyName]: color } })
        )
      }
    },
    setPrimaryColor(color: number, updateDevice: boolean = true) {
      this.currentProfile!.primary = color
      if (updateDevice) {
        sendDebounced(
          this.currentDeviceId!,
          JSON.stringify({ profile: this.currentProfileName, updates: { primary: color } })
        )
      }
    },
    setSecondaryColor(color: number, updateDevice: boolean = true) {
      this.currentProfile!.secondary = color
      if (updateDevice) {
        sendDebounced(
          this.currentDeviceId!,
          JSON.stringify({ profile: this.currentProfileName, updates: { secondary: color } })
        )
      }
    },
    setPointerColor(color: number, updateDevice: boolean = true) {
      this.currentProfile!.pointer = color
      if (updateDevice) {
        sendDebounced(
          this.currentDeviceId!,
          JSON.stringify({ profile: this.currentProfileName, updates: { pointer: color } })
        )
      }
    }
  }
})

const sendDebounced = useDebounceFn((deviceid, jsonstr) => nanoIpc.send(deviceid, jsonstr), 5, {
  maxWait: 10
})

export const initializeDevices = () => {
  const deviceStore = useDeviceStore()
  const appStore = useAppStore()

  // register event handlers
  nanoIpc.on((eventid, deviceid, dataString) => {
    console.log('Received event', eventid, deviceid, dataString)
    if (eventid === 'device-attached') {
      deviceStore.attachDevice(deviceid)
      if (deviceStore.attachedDeviceIds.length === 1) {
        deviceStore.connectDevice(deviceid)
      }
    }
    if (eventid === 'device-detached') {
      deviceStore.detachDevice(deviceid)
    }
    if (eventid === 'connected') {
      deviceStore.connectDevice(deviceid, false)
      nanoIpc.send(deviceid, JSON.stringify({ profiles: '#all' }))
    }
    if (eventid === 'disconnected') {
      deviceStore.disconnectDevice(deviceid, false)
    }
    if (eventid === 'update') {
      let update: UpdateData = {} as UpdateData
      if (dataString) {
        try {
          update = JSON.parse(dataString) as UpdateData
        } catch (e) {
          console.error('Failed to parse update data:', e, dataString)
        }
      }
      if (update.a !== undefined) {
        deviceStore.setAngle(update.a)
        appStore.selectConfigFeature('knob')
      }
      if (update.kd !== undefined) {
        const keyLabel = deviceStore.keyLabels[update.kd]
        deviceStore.keyStates[keyLabel] = true
        appStore.selectKey(keyLabel)
      }
      if (update.ku !== undefined) {
        deviceStore.keyStates[deviceStore.keyLabels[update.ku]] = false
      }
      if (update.profiles !== undefined) {
        deviceStore.setProfileNames(update.profiles, false)
        for (const profileName of update.profiles) {
          console.log('Requesting profile', profileName)
          nanoIpc.send(deviceid, JSON.stringify({ profile: profileName }))
        }
      }
      if (update.current !== undefined) {
        deviceStore.setCurrentProfile(update.current, false)
      }
      if (update.profile !== undefined) {
        deviceStore.addProfile(update.profile, false)
      }
    }
  })

  // get initial device list
  nanoIpc.listAttachedDevices().then((deviceIds) => {
    deviceStore.setAttachedDeviceIds(deviceIds)
    if (!deviceStore.connected && deviceIds.length > 0) {
      nanoIpc.connect(deviceIds[0]).catch((e) => {
        console.error(e)
        console.log('Serial port might still be open, requesting profiles...')
        deviceStore.connectDevice(deviceIds[0], false)
        nanoIpc.send(deviceIds[0], JSON.stringify({ profiles: '#all' }))
      })
    }
  })
}

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
