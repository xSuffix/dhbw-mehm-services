---
title: Mehm
---

<route lang="yaml">
meta:
  layout: default
</route>

<script setup lang="ts">
const props = defineProps({
  id: String
})
</script>

<MehmsToolbar show-search show-category show-order />
<MehmPost :id="id" class="mt-4" />
