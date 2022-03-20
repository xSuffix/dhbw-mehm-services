<template>
  <div class="paper max-w-2xl mx-auto p-8 rounded">
    <h1 class="text-center mb-12">
      Sign in to DHBW Mehms
    </h1>
    <div>
      <div class="flex flex-col my-4">
        <label for="login" class="font-medium py-1">Username or Email Address</label>
        <input id="login" type="text" name="login" tabindex="1" class="box">
      </div>
      <div class="flex flex-col my-4">
        <label for="password" class="font-medium py-1">Password</label>
        <input id="password" type="password" name="password" tabindex="1" class="box">
      </div>
      <button class="bg-void-100 text-void-900 font-bold w-full p-2 mt-4 rounded">
        Sign In
      </button>
    </div>
  </div>
</template>

<style scoped>
input {
  @apply ;
}

</style>
