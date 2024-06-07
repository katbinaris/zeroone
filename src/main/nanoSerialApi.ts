import { SerialPort } from 'serialport'
import { PortInfo } from '@serialport/bindings-interface'
import { EventEmitter } from 'events'

// JTAG interface, TODO: change me!
const NANO_VID_PID_PAIRS = [
  { vid: '239A', pid: '8010' },
  { vid: '303A', pid: '1001' }
]
const NANO_BAUD_RATE = 115200

class NanoSerialApi extends EventEmitter {
  all_nano_devices: { [key: string]: PortInfo } = {}
  connected_nano_devices: { [key: string]: { port: SerialPort } } = {}

  _list() {
    return new Promise((resolve, reject) => {
      SerialPort.list()
        .then((ports: PortInfo[]) => {
          const found_nano_devices: string[] = []
          for (const port of ports) {
            if (
              port.serialNumber &&
              NANO_VID_PID_PAIRS.some(
                (pair) => pair.vid === port.vendorId && pair.pid === port.productId
              )
            ) {
              found_nano_devices.push(port.serialNumber)
              if (this.all_nano_devices[port.serialNumber] === undefined) {
                this.all_nano_devices[port.serialNumber] = port
                this.emit('nanoSerialApi:device-attached', port.serialNumber)
                console.log('attached', port.serialNumber)
              }
            }
          }
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  _handle_data(connected_port, data, serialNumber) {
    connected_port.data += data
    const lines = connected_port.data.split('\n')
    if (lines.length > 1) {
      for (let i = 0; i < lines.length - 1; i++) {
        if (lines[i].length > 0) {
          if (lines[i].startsWith('undefined')) {
            // This is an absolutely horrible hack, but it works for now
            // TODO: Fix the root cause of this issue
            lines[i] = lines[i].substring(9)
          }
          if (lines[i].startsWith('{'))
            // if its a json object
            this.emit('nanoSerialApi:update', serialNumber, lines[i])
          else console.warn('Device: ' + lines[i]) // otherwise just log it
        }
      }
      connected_port.data = lines[lines.length - 1]
    }
  }

  list_devices() {
    const result: string[] = []
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
      console.log('Sending:', jsonstr)
      connected_port.port.write(jsonstr + '\n')
      return Promise.resolve()
    }
  }

  async connect(deviceid) {
    return new Promise((resolve, reject) => {
      const nano_device = this.all_nano_devices[deviceid]
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
          this.emit('nanoSerialApi:error', nano_device.serialNumber, err)
        })
        port.on('close', (err) => {
          if (err && err.disconnected) {
            // forward close to FE
            this.emit('nanoSerialApi:disconnected', nano_device.serialNumber)
          }
          delete this.connected_nano_devices[nano_device.serialNumber!]
        })
        port.on('open', () => {
          this.connected_nano_devices[nano_device.serialNumber!] = { port: port }
          this.emit('nanoSerialApi:connected', nano_device.serialNumber)
          resolve(nano_device.serialNumber)
        })
        port.on('data', (data) => {
          const connected_port = this.connected_nano_devices[nano_device.serialNumber!]
          this._handle_data(connected_port, data, nano_device.serialNumber)
        })
        port.open((err) => {
          if (err) {
            console.log('Error opening port: ', err)
            reject(err)
          }
        })
      }
    })
  }

  disconnect(deviceid) {
    return new Promise((resolve, reject) => {
      const nano_device = this.all_nano_devices[deviceid]
      if (nano_device === undefined) {
        reject('Device not attached')
      } else {
        if (this.connected_nano_devices[nano_device.serialNumber!] === undefined) {
          reject('Device not connected')
        } else {
          nano_device.close()
          resolve(nano_device.serialNumber)
        }
      }
    })
  }
}

const nanoSerialApi = new NanoSerialApi()

export default nanoSerialApi
