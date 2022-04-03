<script setup lang="ts">
const router = useRouter()

</script>

<template>
  <div class="flex gap-2 mx-auto justify-center flex-col lg:flex-row">
    <div class="paper lg:max-w-500px p-4 flex flex-col justify-around">
      <p class="text-2xl font-bold">
        You seem to be lost, but I will never gonna give you up.
      </p>
      <p class="my-4 text-xl">
        ... come on, let's get out of here!
      </p>
      <div class="flex gap-4 mt-2">
        <button class="bg-void-100 text-void-900 font-bold w-full p-2 mt-4 rounded" @click="router.back()">
          Go back
        </button>
        <button class="bg-void-700 text-gray-200 font-bold w-full p-2 mt-4 rounded" @click="router.push('/')">
          Home
        </button>
      </div>
    </div>
    <img src="/images/rick.gif" alt="never gonna let you down" class="rounded border border-border-400">
  </div>
</template>
