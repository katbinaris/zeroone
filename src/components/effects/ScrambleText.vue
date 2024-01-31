<script setup>
import { onMounted, ref, watch } from 'vue'
import click from '@/assets/sounds/click.mp3'

function playClick() {
  const audio = new Audio(click)
  audio.volume = 0.01 * (1 + Math.random() * 0.75 - 0.375)
  audio.play()
}

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  characterSet: {
    type: String,
    default: 'x01_-/',
  },
  scrambleOnHover: {
    type: Boolean,
    default: false,
  },
  fillInterval: {
    type: Number,
    default: 0,
  },
  scrambleAmount: {
    type: Number,
    default: 1,
  },
  replaceInterval: {
    type: Number,
    default: 15,
  },
  scrambleOnMount: {
    type: Boolean,
    default: false,
  },
  resize: {
    type: Boolean,
    default: true,
  },
  delay: {
    type: Number,
    default: 0,
  },
})

const content = ref('')

function randomCharacter(characterSet = props.characterSet) {
  return props.characterSet.charAt(Math.floor(Math.random() * characterSet.length))
}

function replaceContent(text = props.text, replaceInterval = props.replaceInterval, steps = 0) {
  if (steps > text.length + 16) {
    content.value = text
  }
  if (content.value !== text) {
    // get all the indices of characters that don't match text
    const indices = []
    for (let i = 0; i < text.length; i++) {
      if (content.value.charAt(i) !== text.charAt(i)) {
        indices.push(i)
      }
    }
    if (indices.length > 0) {
      const index = indices[Math.floor(Math.random() * indices.length)]
      content.value = content.value.substring(0, index) + text.charAt(index) + content.value.substring(index + 1)
    } else if (content.value.length < text.length) {
      content.value += text.charAt(content.value.length)
    } else {
      content.value = content.value.substring(0, content.value.length - 1)
    }
    //playClick()
    setTimeout(() => {
      replaceContent(text, replaceInterval, steps + 1)
    }, replaceInterval * (1 + Math.random()))
  }
}

function scramble(scrambleAmount = props.scrambleAmount, replaceInterval = props.replaceInterval, fillInterval = props.fillInterval, characterSet = props.characterSet, text = props.text, fillText = props.text) {
  content.value = ''
  const spec = props.resize && (Math.random() > 0.99)
  let i = 0
  const specChars = atob('S09TUk8tRUFTVEVSRUdH')
  const fillContent = function() {
    if (content.value.length < Math.max(text.length, specChars.length * spec)) {
      const char = fillText.charAt(content.value.length) || ''
      if (spec) {
        content.value += specChars[i]
        i = (i + 1) % specChars.length
      } else {
        if (char === ' ' || Math.random() > scrambleAmount) {
          content.value += char
        } else {
          content.value += randomCharacter(characterSet)
        }
      }
      if (fillInterval > 0) {
        //playClick()
        setTimeout(fillContent, fillInterval)
      } else fillContent()
    } else {
      setTimeout(() => {
        replaceContent(text, replaceInterval, 0)
      }, spec * 500)
    }
  }
  fillContent()
}

defineExpose({ scramble })

onMounted(() => {
  if (props.scrambleOnMount) {
    setTimeout(() => {
      scramble()
    }, props.delay)
  } else {
    content.value = props.text
  }
})

watch(() => props.text, () => {
  replaceContent()
})
</script>

<template>
  <span @mouseenter="scrambleOnHover && scramble">{{ content }}</span>

</template>