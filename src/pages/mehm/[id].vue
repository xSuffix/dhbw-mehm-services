<script setup lang="ts">
import mehms from '~/data/mehms.json'

const props = defineProps<{
  id: string
}>()

const mehm = mehms.find(mehm => mehm.id === props.id)

</script>

<template>
  <div>
    {{ mehm }}
  </div>
</template>
