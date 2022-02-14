<template>
  <div class="w-full fixed bottom-0 bg-cool-gray-900 rounded-t-2xl md:hidden">
    <nav
      class="max-w-lg h-18 mx-auto flex justify-around text-gray-200"
    >
      <router-link to="/" class="flex items-center px-4">
        <div>
          <div
            class="pill w-13 h-26px flex items-center justify-center text-gray-300"
          >
            <heroicons-solid:home />
          </div>
          <div class="text-center text-xs font-medium pt-1">
            Home
          </div>
        </div>
      </router-link>
      <router-link to="/vines" class="flex items-center px-4">
        <div>
          <div class="pill w-12 h-6 flex items-center justify-center text-gray-300">
            <heroicons-solid:film />
          </div>
          <div class="text-center text-xs font-medium pt-1">
            Vines
          </div>
        </div>
      </router-link>
      <router-link to="/numbers" class="flex items-center px-4">
        <div>
          <div class="pill w-12 h-6 flex items-center justify-center text-gray-300">
            <heroicons-solid:hashtag />
          </div>
          <div class="text-center text-xs font-medium pt-1">
            Zahlen
          </div>
        </div>
      </router-link>
      <router-link to="/contact" class="flex items-center px-4">
        <div>
          <div class="pill w-12 h-6 flex items-center justify-center text-gray-300">
            <heroicons-solid:mail />
          </div>
          <div class="text-center text-xs font-medium pt-1">
            Kontakt
          </div>
        </div>
      </router-link>
    </nav>
  </div>
</template>

<style scoped>
.router-link-active .pill {
  @apply rounded-2xl bg-indigo-500 !text-indigo-50;
}

.router-link-active {
  @apply text-indigo-100;
}
</style>
