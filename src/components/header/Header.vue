<template>
  <Hero />

  <header class="container mx-auto flex px-4 py-8 items-center justify-between">
    <Logo />
    <div>
      <nav class="hidden md:flex gap-6 font-play text-white">
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
