import { defineStore } from 'pinia'

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
    keyStates: {} as Record<string, boolean> // state of the keys (true if pressed)
  }),
  getters: {
    connected: (state) => state.currentDeviceId !== null,
    currentProfile: (state) =>
      state.currentProfileName
        ? state.profiles.find((profile) => profile.name === state.currentProfileName)
        : null,
    profileTags: (state) => state.profiles.map((profile) => profile.profileTag),
    profilesByTag: (state) =>
      state.profiles.reduce((acc, profile) => {
        acc[profile.profileTag] = profile
        return acc
      }, {})
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
    detachDevice(deviceId: string) {
      const index = this.attachedDeviceIds.indexOf(deviceId)
      if (index !== -1) {
        this.attachedDeviceIds.splice(index, 1)
      }
    },
    connectDevice(deviceId: string, updateDevice: boolean = true) {
      this.currentDeviceId = deviceId
      if (updateDevice) {
        nanoIpc.connect(deviceId)
      }
    },
    disconnectDevice(deviceId: string, updateDevice: boolean = true) {
      this.currentDeviceId = null
      if (updateDevice) {
        nanoIpc.disconnect(deviceId)
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
    }
  }
})

export const initializeDevices = () => {
  const deviceStore = useDeviceStore()

  // register event handlers
  nanoIpc.on((eventid, deviceid, dataString) => {
    console.log('Received event', eventid, deviceid, dataString)
    let update: UpdateData = {} as UpdateData
    try {
      update = JSON.parse(dataString) as UpdateData
    } catch (e) {
      console.error(e)
    }
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
    }
    if (eventid === 'disconnected') {
      deviceStore.disconnectDevice(deviceid, false)
    }
    if (eventid === 'update') {
      if (update.a) {
        deviceStore.setAngle(update.a)
      }
    }
  })

  // get initial device list
  nanoIpc.listAttachedDevices().then((deviceIds) => {
    deviceStore.setAttachedDeviceIds(deviceIds)
    if (deviceIds.length > 0) {
      nanoIpc.connect(deviceIds[0])
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
