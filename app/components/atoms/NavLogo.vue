<template>
  <NuxtLink class="app-nav-logo" to="/" aria-label="Strona główna">
    <img :src="logoUrl" alt="Derlecki Fizjoterapia" />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  logoUrl: string;
}>();
</script>

<style scoped lang="scss">
.app-nav-logo {
  display: flex;
  align-items: center;
  max-width: 14rem;

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  @include max-width-lg() {
    max-width: 12rem;
  }
}
</style>
