<script setup>
import schema from '@/data/profileSchema.json'
import axios from 'axios'
import { inject, ref } from 'vue'

const ajv = inject('ajv')

const message = ref('Waiting...')

try {
  const res = await axios.get('http://localhost:3001/profiles/5867')
  const profiles = res.data
  console.log(profiles)
  const validate = ajv.compile(schema)
  const valid = validate(profiles)
  if (!valid) {
    message.value = 'Invalid!'
    console.log(validate.errors)
  } else {
    message.value = 'Valid!'
    console.log('valid!!!!!!!!!!!!!!!1111elf')
  }
} catch (e) {
  console.error(e)
}
</script>

<template>
  {{ message }}
</template>

<style scoped>

</style>