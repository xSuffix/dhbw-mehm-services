<template>
  <Hero />

  <header class="flex px-4 py-8 items-center justify-between">
    <Logo />
    <div>
      <nav class="flex gap-4 font-play text-white">
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
