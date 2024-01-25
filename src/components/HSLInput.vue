<script setup>
import { computed, ref, watch } from 'vue'
import { SliderRoot, SliderThumb, SliderTrack } from 'radix-vue'

const hueSliderModel = computed({
  get() {
    return [hue.value]
  },
  set(value) {
    hue.value = value[0]
  },
})

const saturationSliderModel = computed({
  get() {
    return [saturation.value]
  },
  set(value) {
    saturation.value = value[0]
  },
})

const lightnessSliderModel = computed({
  get() {
    return [lightness.value]
  },
  set(value) {
    lightness.value = value[0]
  },
})

const hue = ref(0)
const saturation = ref(100)
const lightness = ref(50)

const hexInput = ref('FF0000')
const hueInput = ref('000')
const saturationInput = ref('100')
const lightnessInput = ref('050')
const rInput = ref('255')
const gInput = ref('000')
const bInput = ref('000')

function hueToRGB(p, q, t) {
  if (t < 0) t += 1
  if (t > 1) t -= 1
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
  return p
}

function RGBtoHSL(r, g, b) {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return [h * 360, s * 100, l * 100]
}

function HSLtoRGB(h, s, l) {
  h /= 360
  s /= 100
  l /= 100

  let r, g, b

  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hueToRGB(p, q, h + 1 / 3)
    g = hueToRGB(p, q, h)
    b = hueToRGB(p, q, h - 1 / 3)
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

function hexToRGB(hex) {
  const r = parseInt(hex.substring(1, 3), 16)
  const g = parseInt(hex.substring(3, 5), 16)
  const b = parseInt(hex.substring(5, 7), 16)

  return [r, g, b]
}

function rgbToHex(r, g, b) {
  const componentToHex = (c) => {
    const hex = c.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

const rgb = computed({
  get() {
    return HSLtoRGB(hue.value, saturation.value, lightness.value)
  },
  set([r, g, b]) {
    const [h, s, l] = RGBtoHSL(r, g, b)
    hue.value = h
    saturation.value = s
    lightness.value = l
  },
})

const hexCode = computed({
  get() {
    return rgbToHex(rgb.value[0], rgb.value[1], rgb.value[2])
  },
  set(hex) {
    const [r, g, b] = hexToRGB(hex)
    rgb.value = [r, g, b]
  },
})

function onSubmitHexInput() {
  let input = hexInput.value
  if (input[0] !== '#') {
    input = '#' + input
  }
  if (input.match(/^#[0-9A-F]{6}$/i)) {
    hexCode.value = input
  } else
    shake()
}

function onSubmitHueInput() {
  const input = parseInt(hueInput.value)
  if (isNaN(input)) {
    shake()
    return
  }
  hue.value = Math.max(0, Math.min(input, 360))
}

function onSubmitSaturationInput() {
  const input = parseInt(saturationInput.value)
  if (isNaN(input)) {
    shake()
    return
  }
  saturation.value = Math.max(0, Math.min(input, 100))
}

function onSubmitLightnessInput() {
  const input = parseInt(lightnessInput.value)
  if (isNaN(input)) {
    shake()
    return
  }
  lightness.value = Math.max(0, Math.min(input, 100))
}

function onSubmitRGBInput() {
  const r = parseInt(rInput.value)
  const g = parseInt(gInput.value)
  const b = parseInt(bInput.value)
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    shake()
    return
  }
  rgb.value = [
    Math.max(0, Math.min(r, 255)),
    Math.max(0, Math.min(g, 255)),
    Math.max(0, Math.min(b, 255)),
  ]
}

function foregroundBlack(r, g, b) {
  const bgColor = [r / 255, g / 255, b / 255]
  const c = bgColor.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92
    }
    return Math.pow((col + 0.055) / 1.055, 2.4)
  })
  const l = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2])
  return l > 0.179
}

function updateHexInput(hex) {
  hexInput.value = hex.substring(1, 7)
}

function updateHueInput(hue) {
  hueInput.value = String(parseInt(hue)).padStart(3, '0')
}

function updateSaturationInput(saturation) {
  saturationInput.value = String(parseInt(saturation)).padStart(3, '0')
}

function updateLightnessInput(lightness) {
  lightnessInput.value = String(parseInt(lightness)).padStart(3, '0')
}

function updateRInput(r) {
  rInput.value = String(parseInt(r)).padStart(3, '0')
}

function updateGInput(g) {
  gInput.value = String(parseInt(g)).padStart(3, '0')
}

function updateBInput(b) {
  bInput.value = String(parseInt(b)).padStart(3, '0')
}

watch(hexCode, updateHexInput)
watch(hue, updateHueInput)
watch(saturation, updateSaturationInput)
watch(lightness, updateLightnessInput)
watch(rgb, ([r, g, b]) => {
  updateRInput(r)
  updateGInput(g)
  updateBInput(b)
}, { deep: true })

const colorFieldText = ref(null)

function shake() {
  colorFieldText.value.classList.remove('shake')
  setTimeout(() => {
    colorFieldText.value.classList.add('shake')
  }, 5)
}

</script>
<template>
  <div>
    <div
      class="w-full flex p-4 font-heading"
      :style="{backgroundColor: `hsl(${hue},${saturation}%,${lightness}%)`}"
      style="transition: color 0.2s ease-in-out"
      :class="{'text-black': foregroundBlack(...rgb)}">
      <div ref="colorFieldText" class="w-full flex opacity-50">
        <div>
          <form @submit.prevent="onSubmitHueInput">
            <label for="hueInput">H: </label><input
            id="hueInput"
            v-model="hueInput"
            onfocus="this.select()"
            type="number" maxlength="3"
            class="w-8 bg-transparent focus-visible:ring-0 focus-visible:outline-none"
            @blur="updateHueInput(hue)">
          </form>
          <form @submit.prevent="onSubmitSaturationInput">
            <label for="saturationInput">S: </label><input
            id="saturationInput"
            v-model="saturationInput"
            onfocus="this.select()"
            type="number" maxlength="3"
            class="w-8 bg-transparent focus-visible:ring-0 focus-visible:outline-none"
            @blur="updateSaturationInput(saturation)">
          </form>
          <form @submit.prevent="onSubmitLightnessInput">
            <label for="lightnessInput">L: </label><input
            id="lightnessInput"
            v-model="lightnessInput"
            onfocus="this.select()"
            type="number" maxlength="3"
            class="w-8 bg-transparent focus-visible:ring-0 focus-visible:outline-none"
            @blur="updateLightnessInput(lightness)">
          </form>
        </div>
        <div class="mx-auto">
          <form @submit.prevent="onSubmitHexInput">
            <label for="hexInput">#</label><input
            id="hexInput"
            v-model="hexInput" maxlength="6"
            onfocus="this.select()"
            class="w-16 bg-transparent focus-visible:ring-0 focus-visible:outline-none"
            @blur="updateHexInput(hexCode)">
          </form>
        </div>
        <div>
          <form @submit.prevent="onSubmitRGBInput">
            <label for="rInput">R: </label><input
            id="rInput"
            v-model="rInput"
            onfocus="this.select()"
            type="number" maxlength="3"
            class="w-8 bg-transparent focus-visible:ring-0 focus-visible:outline-none"
            @blur="updateRInput(rgb[0])">
          </form>
          <form @submit.prevent="onSubmitRGBInput">
            <label for="gInput">G: </label><input
            id="gInput"
            v-model="gInput"
            onfocus="this.select()"
            type="number" maxlength="3"
            class="w-8 bg-transparent focus-visible:ring-0 focus-visible:outline-none"
            @blur="updateGInput(rgb[1])">
          </form>
          <form @submit.prevent="onSubmitRGBInput">
            <label for="bInput">B: </label><input
            id="bInput"
            v-model="bInput"
            onfocus="this.select()"
            type="number" maxlength="3"
            class="w-8 bg-transparent focus-visible:ring-0 focus-visible:outline-none"
            @blur="updateBInput(rgb[2])">
          </form>
        </div>
      </div>
    </div>
    <div
      :style="{background: `linear-gradient(180deg, hsla(${hue}, ${saturation}%, ${lightness}%, 30%) 0%, transparent 30%`}">
      <div class="px-6 py-4 flex">
        <p class="font-heading text-muted-foreground w-24">HUE</p>
        <SliderRoot
          v-model="hueSliderModel" :max="360"
          class="relative flex w-full touch-none select-none items-center">
          <SliderTrack
            class="relative h-2.5 w-full grow overflow-hidden rounded-full border-2 border-zinc-900"
            style="background: linear-gradient(90deg, rgba(255, 0, 0, 1) 0%, rgba(255, 154, 0, 1) 10%, rgba(208, 222, 33, 1) 20%, rgba(79, 220, 74, 1) 30%, rgba(63, 218, 216, 1) 40%, rgba(47, 201, 226, 1) 50%, rgba(28, 127, 238, 1) 60%, rgba(95, 21, 242, 1) 70%, rgba(186, 12, 248, 1) 80%, rgba(251, 7, 217, 1) 90%, rgba(255, 0, 0, 1) 100%)" />
          <SliderThumb
            class="block h-5 w-5 rounded-full border hover:bg-zinc-900 border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 cursor-pointer focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
        </SliderRoot>
      </div>
      <div class="px-6 py-4 flex">
        <p class="font-heading text-muted-foreground w-24">SAT</p>
        <SliderRoot
          v-model="saturationSliderModel" :max="100"
          class="relative flex w-full touch-none select-none items-center">
          <SliderTrack
            class="relative h-2.5 w-full grow overflow-hidden rounded-full border-2 border-zinc-900"
            :style="{background: `linear-gradient(90deg, hsl(${hue}, 0%, ${lightness}%) 0%, hsl(${hue}, 100%, ${lightness}%) 100%)`}" />
          <SliderThumb
            class="block h-5 w-5 rounded-full border hover:bg-zinc-900 border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 cursor-pointer focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
        </SliderRoot>
      </div>
      <div class="px-6 py-4 flex">
        <p class="font-heading text-muted-foreground w-24">LIT</p>
        <SliderRoot
          v-model="lightnessSliderModel" :max="100"
          class="relative flex w-full touch-none select-none items-center">
          <SliderTrack
            class="relative h-2.5 w-full grow overflow-hidden rounded-full border-2 border-zinc-900"
            :style="{background: `linear-gradient(90deg, hsl(${hue}, ${saturation}%, 0%) 0%, hsl(${hue}, ${saturation}%, 50%) 50%, hsl(${hue}, ${saturation}%, 100%) 100%)`}" />
          <SliderThumb
            class="block h-5 w-5 rounded-full border hover:bg-zinc-900 border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 cursor-pointer focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
        </SliderRoot>
      </div>
    </div>
  </div>
</template>
<style scoped>
.shake {
  animation-name: shake;
  animation-fill-mode: forwards;
  animation-duration: 250ms;
  animation-timing-function: ease-in-out;
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  15% {
    transform: translateX(0.1rem);
  }
  30% {
    transform: translateX(-0.1rem);
  }
  45% {
    transform: translateX(0.1rem);
  }
  60% {
    transform: translateX(-0.1rem);
  }
  75% {
    transform: translateX(0.1rem);
  }
  90% {
    transform: translateX(-0.1rem);
  }
  100% {
    transform: translateX(0);
  }
}
</style>