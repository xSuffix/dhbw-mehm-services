<script setup lang="ts">
import { watch } from 'vue'
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()
const scrollClass = ref('scroll-top')

watch(y, async(newY, oldY) => {
  scrollClass.value = newY > 96 ? (newY < oldY ? 'scroll-up' : 'scroll-down') : 'scroll-top'
})

</script>

<template>
  <Background />
  <header v-bind="$attrs" class="container mx-auto inset-x-0 flex px-4 items-center justify-between" :class="scrollClass">
    <Logo />
    <div>
      <nav class="hidden md:flex gap-6 font-play text-white text-shadow-outline">
        <router-link to="/vines">
          Vines
        </router-link>
        <router-link to="/numbers">
          Zahlen
        </router-link>
        <router-link to="/contact">
          Kontakt
        </router-link>
      </nav>
    </div>
  </header>
  <div class="h-32" />
</template>

<style>
.scroll-top {
  @apply absolute py-8;
}

.scroll-down {
  @apply fixed py-2;
}

.scroll-up {
  @apply fixed py-2;
}
</style>
