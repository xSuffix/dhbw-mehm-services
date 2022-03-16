<script setup lang="ts">
const { t } = useI18n()

const sitemapLinks = [
  { label: t('nav.mehms'), url: '/' },
  { label: t('nav.submit'), url: '/submit' },
  { label: t('nav.contact'), url: '/contact' },
]

const legalLinks = [
  { label: t('nav.imprint'), url: '/imprint' },
  { label: t('nav.privacy'), url: '/privacy' },
]

const dhbwLinks = [
  { label: 'Lohrtalweg 10\n74821 Mosbach', url: 'https://goo.gl/maps/TvTZgwM64HwZpfdLA', icon: 'heroicons-solid:office-building' },
  { label: '06261 / 939-0', url: 'tel:+4962619390', icon: 'heroicons-solid:phone' },
  { label: '06261 / 939-504', url: 'fax:+496261939504', icon: 'heroicons-solid:printer' },
]
</script>

<template>
  <div class="pt-10 pb-16">
    <footer class="flex flex-wrap gap-8 rounded bg-void-700">
      <div class="flex-grow-[10]">
        <p class="pb-4">
          <strong>{{ t('footer.about.title') }}</strong>
        </p>
        <Logo />
        <p class="pt-3">
          {{ t('footer.about.description') }}
        </p>
      </div>

      <div>
        <p class="pb-4">
          <strong>{{ t('footer.follow.title') }}</strong>
        </p>
        <div class="flex gap-2">
          <IconBadge alt="GitHub" href="https://github.com/xSuffix/dhbw-mehms" src="/images/icons/github.svg" />
          <IconBadge alt="Mail" href="mailto:mehms4DHBW@gmail.com" src="/images/icons/gmail.svg" img-class="w-6" />
        </div>
      </div>

      <div>
        <p class="pb-4">
          <strong>{{ t('footer.sitemap.title') }}</strong>
        </p>
        <ul>
          <li v-for="link in sitemapLinks" :key="link.url">
            <IconLinkInternal v-bind="link" />
          </li>
        </ul>
      </div>

      <div>
        <p class="pb-4">
          <strong>{{ t('footer.legal.title') }}</strong>
        </p>
        <ul>
          <li v-for="link in legalLinks" :key="link.url">
            <IconLinkInternal v-bind="link" />
          </li>
        </ul>
      </div>

      <div>
        <p class="pb-4">
          <strong>DHBW Mosbach</strong>
        </p>
        <ul>
          <li v-for="link in dhbwLinks" :key="link.url">
            <IconLinkExternal v-bind="link" />
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<style>
footer > div {
  @apply max-w-80 p-4 flex-grow flex-shrink;
}
</style>
