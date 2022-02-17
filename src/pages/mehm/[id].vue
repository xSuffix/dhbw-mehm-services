<script setup lang="ts">
import mehms from '~/data/mehms.json'

function isObjKey<T>(key: PropertyKey, obj: T): key is keyof T {
  return key in obj
}

const getMehm = (id: string) => {
  if (isObjKey(id, mehms)) return mehms[id]
  return null
}

const props = defineProps<{
  id: string
}>()

const mehm = getMehm(props.id)

</script>

<template>
  <div>
    {{ mehm }}
  </div>
</template>
