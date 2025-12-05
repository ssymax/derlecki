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
  width: 12rem;
  flex-shrink: 0;

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  @include max-width-md() {
    width: 10rem;
  }

  @include min-width-lg() {
    width: 14rem;
  }
}
</style>
