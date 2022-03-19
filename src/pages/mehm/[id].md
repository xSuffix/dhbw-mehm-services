---
title: Mehm
---

<route lang="yaml">
meta:
  layout: default
</route>

<script setup lang="ts">
const props = defineProps({
  id: Number
})
</script>

<MehmsToolbar show-search show-category show-order />
<MehmPost :id="parseInt(id)" class="mt-4" />
