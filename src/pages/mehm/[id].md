---
title: Mehm
---

<route lang="yaml">
meta:
  layout: footerless
</route>

<script setup lang="ts">
const props = defineProps({
  id: String
})
</script>

<MehmsToolbar show-search show-category show-order />
<MehmPost :id="parseInt(id)" show-footer class="mt-4" />
