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
  width: 14rem;
  flex-shrink: 0;

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  @include max-width-lg() {
    width: 12rem;
  }
}
</style>
