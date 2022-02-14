<script setup lang="ts">
const sitemapLinks = [
  { label: 'Mehms', url: '/' },
  { label: 'Kontakt', url: '/contact' },
  { label: 'Mehm Einsendung', url: 'submit' },
]

const legalLinks = [
  { label: 'Impressum', url: '/imprint' },
  { label: 'Datenschutz', url: '/privacy' },
]

const dhbwLinks = [
  { label: 'Lohrtalweg 10\n74821 Mosbach', url: 'https://goo.gl/maps/TvTZgwM64HwZpfdLA', icon: 'heroicons-solid:home' },
  { label: '06261 / 939-0', url: 'tel:+4962619390', icon: 'heroicons-solid:phone' },
  { label: '06261 / 939-504', url: 'fax:+496261939504', icon: 'heroicons-solid:printer' },
]
</script>

<template>
  <footer class="container mx-auto p-4 bg-light-300 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
    <div>
      <p class="pb-4">
        <strong>Über DHBW Mehms</strong>
      </p>
      <Logo />
      <p class="pt-3">
        Diese Webseite ist eine gemeinsame Prüfungsleistung im Kurs Web-Services der DHBW Mosbach.
      </p>
    </div>

    <div>
      <p class="pb-4">
        <strong>Folge uns</strong>
      </p>
      <div class="flex gap-2">
        <IconBadge alt="GitHub" href="https://github.com/xSuffix/dhbw-mehms" src="/images/icons/github.svg" />
        <IconBadge alt="Mail" href="mailto:mehms4DHBW@gmail.com" src="/images/icons/gmail.svg" img-class="w-6" />
      </div>
    </div>

    <div>
      <p class="pb-4">
        <strong>Sitemap</strong>
      </p>
      <ul>
        <li v-for="link in sitemapLinks" :key="link.url">
          <FooterLinkInternal v-bind="link" />
        </li>
      </ul>
    </div>

    <div>
      <p class="pb-4">
        <strong>Rechtliches</strong>
      </p>
      <ul>
        <li v-for="link in legalLinks" :key="link.url">
          <FooterLinkInternal v-bind="link" />
        </li>
      </ul>
    </div>

    <div>
      <p class="pb-4">
        <strong>DHBW Mosbach</strong>
      </p>
      <ul>
        <li v-for="link in dhbwLinks" :key="link.url">
          <FooterLinkExternal v-bind="link" />
        </li>
      </ul>
    </div>
  </footer>
</template>
