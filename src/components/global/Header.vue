<script setup lang="ts">
import { watch } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { useUserStore } from '~/stores/user'

const { y } = useWindowScroll()
const user = useUserStore()

watch(y, async(newY, oldY) => {
  if (newY < oldY && newY > 24)
    document.body.classList.add('scrolling-up')
  else document.body.classList.remove('scrolling-up')
})
</script>

<template>
  <header class="pt-8 mb-18 inset-x-0 flex items-center justify-between z-20 md:sticky -top-24 transition-top duration-200">
    <Logo />
    <div>
      <nav class="hidden md:flex gap-6 font-play text-white text-shadow-outline">
        <router-link to="/contact">
          Kontakt
        </router-link>
        <router-link v-if="user.jwt" to="/submit">
          Einsenden
        </router-link>
        <router-link v-if="user.jwt" to="/user">
          Profile
        </router-link>
        <router-link v-else to="/login">
          Login
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
