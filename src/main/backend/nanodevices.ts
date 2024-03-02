import { SerialPort } from 'serialport'
import { EventEmitter } from 'events'

// JTAG interface, TODO: change me!
const NANO_PRODUCT_ID = '1001'
const NANO_VENDOR_ID = '303a'
const NANO_BAUD_RATE = 115200

class NanoDevices extends EventEmitter {
  constructor() {
    super()
    this.all_nano_devices = {}
    this.connected_nano_devices = {}
  }

  _list() {
    const p = new Promise((resolve, reject) => {
      SerialPort.list().then((ports, err) => {
        if (err) {
          reject(err) // TODO format for errors?
        } else {
          const found_nano_devices = []
          for (const port of ports) {
            if (port.productId === NANO_PRODUCT_ID && port.vendorId === NANO_VENDOR_ID) {
              found_nano_devices.push(port.serialNumber)
              if (this.all_nano_devices[port.serialNumber] === undefined) {
                this.all_nano_devices[port.serialNumber] = port
                this.emit('nanodevices:device-attached', port.serialNumber)
                console.log('attached', port.serialNumber)
              }
            }
          }
          resolve(found_nano_devices)
          for (const serialNumber in this.all_nano_devices) {
            if (found_nano_devices.indexOf(serialNumber) === -1) {
              delete this.all_nano_devices[serialNumber]
              this.emit('nanodevices:device-detached', serialNumber)
              console.log('detached', serialNumber)
            }
          }
        }
      })
    })
    return p
  }

  _handle_data(connected_port, data) {
    connected_port.data += data
    const lines = connected_port.data.split('\n')
    if (lines.length > 1) {
      for (let i = 0; i < lines.length - 1; i++) {
        if (lines[i].length > 0) {
          if (lines[i].startsWith('{'))
            // if its a json object
            this.emit('nanodevices:update', connected_port.serialNumber, lines[i])
          else console.log('Device: ' + lines[i]) // otherwise just log it
        }
      }
      connected_port.data = lines[lines.length - 1]
    }
  }

  list_devices() {
    const result = []
    for (const [key, value] of Object.entries(this.all_nano_devices)) {
      if (value.serialNumber) result.push(key)
    }
    console.log('list_devices', result)
    return result
  }

  async send(deviceid, jsonstr) {
    const connected_port = this.connected_nano_devices[deviceid]
    if (connected_port === undefined) {
      return Promise.reject('Device not connected')
    } else {
      connected_port.port.write(jsonstr + '\n')
      return Promise.resolve()
    }
  }

  async connect(deviceid) {
    const nanodevices = this
    const p = new Promise((resolve, reject) => {
      const nano_device = nanodevices.all_nano_devices[deviceid]
      if (nano_device === undefined) {
        reject('Device not attached')
      } else {
        console.log('nano_device', nano_device)
        const port = new SerialPort({
          path: nano_device.path,
          baudRate: NANO_BAUD_RATE,
          autoOpen: false
        })
        port.on('error', (err) => {
          // forward error to FE
          nanodevices.emit('nanodevices:error', nano_device.serialNumber, err)
        })
        port.on('close', (err) => {
          if (err && err.disconnected) {
            // forward close to FE
            nanodevices.emit('nanodevices:disconnected', nano_device.serialNumber)
          }
          delete nanodevices.connected_nano_devices[nano_device.serialNumber]
        })
        port.on('open', () => {
          resolve(nano_device.serialNumber)
          nanodevices.connected_nano_devices[nano_device.serialNumber] = { port: port, data: '' }
          nanodevices.emit('nanodevices:connected', nano_device.serialNumber)
        })
        port.on('data', (data) => {
          const connected_port = nanodevices.connected_nano_devices[nano_device.serialNumber]
          nanodevices._handle_data(connected_port, data)
        })
        port.open((err) => {
          if (err) {
            reject(err)
          }
        })
      }
    })
    return p
  }

  disconnect(deviceid) {
    const nanodevices = this
    const p = new Promise((resolve, reject) => {
      const nano_device = nanodevices.all_nano_devices[deviceid]
      if (nano_device === undefined) {
        reject('Device not attached')
      } else {
        if (nanodevices.connected_nano_devices[nano_device.serialNumber] === undefined) {
          reject('Device not connected')
        } else {
          nano_device.close()
          resolve(nano_device.serialNumber)
        }
      }
    })
    return p
  }
}

const nanodevices = new NanoDevices()

export default nanodevices
