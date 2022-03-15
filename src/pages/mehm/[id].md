---
title: Mehm
---

<route lang="yaml">
meta:
  layout: default
</route>

<script setup lang="ts">
defineProps({
  id: String
})
</script>

<MehmsToolbar show-search />
<MehmPost :id="id" />
