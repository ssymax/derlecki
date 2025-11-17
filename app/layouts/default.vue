<template>
  <div class="layout-default">
    <VueLenis root />
    <OrganismsNavBar />
    <main class="layout-default__content">
      <slot />
    </main>
    <OrganismsFooter />
    <AtomsScrollToTop />
  </div>
</template>

<script setup lang="ts">
import { VueLenis, useLenis } from 'lenis/vue';

const lenis = useLenis((lenis) => {
  // called every scroll
  console.log(lenis);
});

watch(
  lenis,
  (lenis) => {
    // lenis instance
    console.log(lenis);
  },
  { immediate: true },
);
</script>

<style lang="scss">
.layout-default__content {
  @include padding-style;
}
</style>
