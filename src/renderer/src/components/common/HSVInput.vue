<template>
  <div
    class="font-heading mx-2 flex rounded-b-lg border-x border-b border-zinc-800 p-4 transition-colors"
    :class="{ 'rounded-t-lg': roundedTop }"
    :style="{ backgroundColor: color.hex() }"
  >
    <div
      ref="colorFieldText"
      class="flex w-full opacity-70"
      :class="
        !isDark(color)
          ? 'text-black selection:bg-black selection:text-white'
          : 'selection:bg-white selection:text-black'
      "
      style="transition: color 0.2s ease-in-out"
    >
      <div>
        <form @submit.prevent="onSubmitHueInput">
          <label for="hueInput">H: </label
          ><input
            id="hueInput"
            v-model="hueInput"
            onfocus="this.select()"
            type="number"
            maxlength="3"
            class="w-8 bg-transparent focus-visible:outline-none focus-visible:ring-0"
            @blur="updateInputs"
          />
        </form>
        <form @submit.prevent="onSubmitSaturationInput">
          <label for="saturationInput">S: </label
          ><input
            id="saturationInput"
            v-model="saturationInput"
            onfocus="this.select()"
            type="number"
            maxlength="3"
            class="w-8 bg-transparent focus-visible:outline-none focus-visible:ring-0"
            @blur="updateInputs"
          />
        </form>
        <form @submit.prevent="onSubmitValueInput">
          <label for="valueInput">V: </label
          ><input
            id="valueInput"
            v-model="valueInput"
            onfocus="this.select()"
            type="number"
            maxlength="3"
            class="w-8 bg-transparent focus-visible:outline-none focus-visible:ring-0"
            @blur="updateInputs"
          />
        </form>
      </div>
      <div class="mx-auto">
        <form @submit.prevent="onSubmitHexInput">
          <label for="hexInput">#</label
          ><input
            id="hexInput"
            v-model="hexInput"
            maxlength="6"
            onfocus="this.select()"
            class="w-16 bg-transparent focus-visible:outline-none focus-visible:ring-0"
            @blur="updateInputs"
          />
        </form>
      </div>
      <div>
        <form @submit.prevent="onSubmitRGBInput">
          <label for="rInput">R: </label
          ><input
            id="rInput"
            v-model="rInput"
            onfocus="this.select()"
            type="number"
            maxlength="3"
            class="w-8 bg-transparent focus-visible:outline-none focus-visible:ring-0"
            @blur="updateInputs"
          />
        </form>
        <form @submit.prevent="onSubmitRGBInput">
          <label for="gInput">G: </label
          ><input
            id="gInput"
            v-model="gInput"
            onfocus="this.select()"
            type="number"
            maxlength="3"
            class="w-8 bg-transparent focus-visible:outline-none focus-visible:ring-0"
            @blur="updateInputs"
          />
        </form>
        <form @submit.prevent="onSubmitRGBInput">
          <label for="bInput">B: </label
          ><input
            id="bInput"
            v-model="bInput"
            onfocus="this.select()"
            type="number"
            maxlength="3"
            class="w-8 bg-transparent focus-visible:outline-none focus-visible:ring-0"
            @blur="updateInputs"
          />
        </form>
      </div>
    </div>
  </div>
  <div class="flex px-8 py-4">
    <SliderRoot
      v-model="hueSliderModel"
      :max="359"
      class="relative flex h-10 w-full touch-none select-none items-center"
    >
      <SliderTrack
        class="relative h-2.5 w-full grow overflow-hidden rounded-full border-2 border-zinc-900"
        style="
          background: linear-gradient(
            90deg,
            rgba(255, 0, 0, 1) 0%,
            rgba(255, 154, 0, 1) 10%,
            rgba(208, 222, 33, 1) 20%,
            rgba(79, 220, 74, 1) 30%,
            rgba(63, 218, 216, 1) 40%,
            rgba(47, 201, 226, 1) 50%,
            rgba(28, 127, 238, 1) 60%,
            rgba(95, 21, 242, 1) 70%,
            rgba(186, 12, 248, 1) 80%,
            rgba(251, 7, 217, 1) 90%,
            rgba(255, 0, 0, 1) 100%
          );
        "
      />
      <SliderThumb
        :class="{ 'transition-all': animateSliders }"
        class="flex h-6 w-8 cursor-pointer items-center justify-center rounded-[8px] border border-zinc-100 bg-zinc-300 text-zinc-600 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        style="box-shadow: -3px 0 15px 0 rgba(0, 0, 0, 0.6)"
      >
        <MoreHorizontal class="h-full" />
      </SliderThumb>
    </SliderRoot>
  </div>
  <Separator />
  <div class="flex px-8 py-4">
    <SliderRoot
      v-model="saturationSliderModel"
      :max="100"
      class="relative flex h-10 w-full touch-none select-none items-center"
    >
      <SliderTrack
        class="relative h-2.5 w-full grow overflow-hidden rounded-full border-2 border-zinc-900"
        :style="{
          background: `linear-gradient(90deg, hsl(0, 0%, ${saturationSliderColor.lightness()}%) 0%, hsl(${saturationSliderColor.hue()}, 100%, ${saturationSliderColor.lightness()}%) 100%)`
        }"
      />
      <SliderThumb
        :class="{ 'transition-all': animateSliders }"
        class="flex h-6 w-8 cursor-pointer items-center justify-center rounded-[8px] border border-zinc-100 bg-zinc-300 text-zinc-600 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        style="box-shadow: -3px 0 15px 0 rgba(0, 0, 0, 0.6)"
      >
        <MoreHorizontal class="h-full" />
      </SliderThumb>
    </SliderRoot>
  </div>
  <Separator />
  <div class="flex px-8 py-4">
    <SliderRoot
      v-model="valueSliderModel"
      :max="100"
      class="relative flex h-10 w-full touch-none select-none items-center"
    >
      <SliderTrack
        class="relative h-2.5 w-full grow overflow-hidden rounded-full border-2 border-zinc-900"
        :style="{ background: `linear-gradient(90deg, black, ${valueSliderColor.hex()} 100%` }"
      />
      <SliderThumb
        :class="{ 'transition-all': animateSliders }"
        class="flex h-6 w-8 cursor-pointer items-center justify-center rounded-[8px] border border-zinc-100 bg-zinc-300 text-zinc-600 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        style="box-shadow: -3px 0 15px 0 rgba(0, 0, 0, 0.6)"
      >
        <MoreHorizontal class="h-full" />
      </SliderThumb>
    </SliderRoot>
  </div>
  <Separator />
</template>
<script setup>
import { computed, onBeforeMount, ref, watch } from 'vue'
import Color from 'color'
import { SliderRoot, SliderThumb, SliderTrack } from 'radix-vue'
import { MoreHorizontal } from 'lucide-vue-next'
import { Separator } from '@renderer/components/ui/separator'
import { useDebounceFn } from '@vueuse/core'

const props = defineProps({
  colorNumber: {
    type: Number,
    default: () => Color('#ff0000').rgbNumber()
  },
  roundedTop: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['input'])

const previousColor = ref(Color(props.colorNumber))

const updateColor = useDebounceFn(
  (newColor) => {
    previousColor.value = newColor
    emit('input', newColor.rgbNumber())
  },
  20,
  { maxWait: 30 }
)

const color = computed({
  get() {
    if (previousColor.value.rgbNumber() === props.colorNumber) {
      return previousColor.value
    }
    return Color(props.colorNumber)
  },
  set(newColor) {
    updateColor(newColor)
  }
})

const hueSliderValue = ref(0)
const saturationSliderValue = ref(100)
const valueSliderValue = ref(50)

const hueSliderModel = computed({
  get() {
    return [hueSliderValue.value]
  },
  set(hue) {
    hueSliderValue.value = hue[0]
    color.value = color.value.hue(hue[0])
  }
})

const saturationSliderModel = computed({
  get() {
    return [saturationSliderValue.value]
  },
  set(saturation) {
    saturationSliderValue.value = saturation[0]
    color.value = color.value.saturationv(saturation[0])
  }
})

const valueSliderModel = computed({
  get() {
    return [valueSliderValue.value]
  },
  set(value) {
    valueSliderValue.value = value[0]
    color.value = color.value.value(value[0])
  }
})

const saturationSliderColor = computed(() => {
  return Color.hsv(hueSliderModel.value[0], 100, valueSliderModel.value[0])
})

const valueSliderColor = computed(() => {
  return Color.hsv(hueSliderModel.value[0], saturationSliderModel.value[0], 100)
})

const animateSliders = ref(false)
const disableAnimateSliders = useDebounceFn(() => {
  animateSliders.value = false
}, 150)
const enableAnimateSliders = () => {
  console.log('ANIMATE!!!')
  animateSliders.value = true
  disableAnimateSliders()
}
defineExpose({ enableAnimateSliders })

const hexInput = ref('FF0000')
const hueInput = ref('000')
const saturationInput = ref('100')
const valueInput = ref('050')
const rInput = ref('255')
const gInput = ref('000')
const bInput = ref('000')

function onSubmitHexInput() {
  let input = hexInput.value
  if (input[0] !== '#') {
    input = '#' + input
  }
  if (input.match(/^#[0-9A-F]{6}$/i)) {
    enableAnimateSliders()
    color.value = Color(input)
  } else shake()
}

function onSubmitHueInput() {
  const input = parseInt(hueInput.value)
  if (isNaN(input)) {
    shake()
    return
  }
  enableAnimateSliders()
  const newHue = Math.max(0, Math.min(input, 360))
  if (newHue === color.value.hue()) {
    updateInputs()
  }
  color.value = color.value.hue(newHue)
}

function onSubmitSaturationInput() {
  const input = parseInt(saturationInput.value)
  if (isNaN(input)) {
    shake()
    return
  }
  enableAnimateSliders()
  const newSaturation = Math.max(0, Math.min(input, 100))
  if (newSaturation === color.value.saturationv()) {
    updateInputs()
  }
  color.value = color.value.saturationv(newSaturation)
}

function onSubmitValueInput() {
  const input = parseInt(valueInput.value)
  if (isNaN(input)) {
    shake()
    return
  }
  enableAnimateSliders()
  const newValue = Math.max(0, Math.min(input, 100))
  if (newValue === color.value.value()) {
    updateInputs()
  }
  color.value = color.value.value(newValue)
}

function onSubmitRGBInput() {
  const r = parseInt(rInput.value)
  const g = parseInt(gInput.value)
  const b = parseInt(bInput.value)
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    shake()
    return
  }
  enableAnimateSliders()
  const newColor = Color.rgb(r, g, b)
  if (newColor.hex() === color.value.hex()) {
    updateInputs()
  }
  color.value = newColor
}

function updateInputs() {
  hexInput.value = color.value.hex().substring(1, 7)
  hueInput.value = String(parseInt(color.value.hue())).padStart(3, '0')
  saturationInput.value = String(parseInt(color.value.saturationv())).padStart(3, '0')
  valueInput.value = String(parseInt(color.value.value())).padStart(3, '0')
  rInput.value = String(parseInt(color.value.red())).padStart(3, '0')
  gInput.value = String(parseInt(color.value.green())).padStart(3, '0')
  bInput.value = String(parseInt(color.value.blue())).padStart(3, '0')
  hueSliderValue.value = color.value.hue()
  saturationSliderValue.value = color.value.saturationv()
  valueSliderValue.value = color.value.value()
}

watch(() => props.colorNumber, updateInputs)
onBeforeMount(updateInputs)

const colorFieldText = ref(null)

function shake() {
  colorFieldText.value.classList.remove('shake')
  setTimeout(() => {
    colorFieldText.value.classList.add('shake')
  }, 5)
}

function isDark(color) {
  // YIQ equation from http://24ways.org/2010/calculating-color-contrast
  const rgb = color.rgb().color
  const yiq = (rgb[0] * 6126 + rgb[1] * 7152 + rgb[2] * 722) / 10000 // Changed r factor from 2126
  return yiq < 128
}
</script>
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
