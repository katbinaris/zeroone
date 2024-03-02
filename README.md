# ZERO/ONE

Haptic configuration tool

## Running the code

- use VSCode (or WebStorm) with the appropriate Vue plugins (Vetur, i18n Ally, ESLint, Prettier, etc.)
- run `pnpm i` to install dependencies
- run `pnpm dev` to start the json-server and electron app

## Connecting your Nano

Plug the nano to the USB port. :-)

ZERO/ONE will automatically detect the Nano_D++ device.

### Device connection states

The connection between the device and the haptic controller software can be in the following states. Entering each state is associated with equivalent events emitted in the ZERO/ONE software:

**Attached**

The device is attached when it is connected to USB.

**Detached**

The device is detached when disconnected from USB.

**Connected**

The device is in connected state when the USB serial port is successfully opened.

**Disconnected**

The device enters disconnected state when the USB serial port is closed. 

Note that a **connected** device is also always **attached**, and if the USB plug is pulled on a **connected** device, it becomes both **disconnected** and **detached** simultaneously. If the connection is closed without disconnecting USB, the device becomes **disconnected** but remains **attached**.




