<script setup lang="ts">
import { watch } from 'vue'
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()

watch(y, async(newY, oldY) => {
  if (newY < oldY && newY > 24) document.body.classList.add('scrolling-up')
  else document.body.classList.remove('scrolling-up')
})
</script>

<template>
  <header class="container py-8 mx-auto inset-x-0 flex px-4 items-center justify-between z-20 sticky -top-24 transition-top duration-200">
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
</template>

<style>
.scrolling-up header {
  @apply -top-6;
}
</style>
