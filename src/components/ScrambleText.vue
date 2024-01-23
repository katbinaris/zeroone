<script setup>
import { onMounted, ref, watch } from 'vue'

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
})

const content = ref('')

function randomCharacter(characterSet = props.characterSet) {
  return props.characterSet.charAt(Math.floor(Math.random() * characterSet.length))
}

function scramble(scrambleAmount = props.scrambleAmount, replaceInterval = props.replaceInterval, fillInterval = props.fillInterval, characterSet = props.characterSet, text = props.text) {
  content.value = ''
  const fillContent = function() {
    if (content.value.length < text.length) {
      if (Math.random() > scrambleAmount) {
        content.value += text.charAt(content.value.length)
      } else {
        content.value += randomCharacter(characterSet)
      }
      if (fillInterval > 0)
        setTimeout(fillContent, fillInterval)
      else fillContent()
    } else {
      const replaceContent = function() {
        if (content.value !== text) {
          // get all the indices of characters that don't match text
          const indices = []
          for (let i = 0; i < content.value.length; i++) {
            if (content.value.charAt(i) !== text.charAt(i)) {
              indices.push(i)
            }
          }
          const index = indices[Math.floor(Math.random() * indices.length)]
          content.value = content.value.substring(0, index) + text.charAt(index) + content.value.substring(index + 1)
          setTimeout(replaceContent, replaceInterval * (1 + Math.random()))
        }
      }
      replaceContent()
    }
  }
  fillContent()
}

defineExpose({ scramble })

onMounted(() => {
  scramble()
})

watch(() => props.text, () => {
  scramble()
})
</script>

<template>
  <span @mouseenter="scrambleOnHover && scramble">{{ content }}</span>

</template>