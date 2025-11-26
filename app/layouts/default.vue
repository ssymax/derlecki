<template>
  <div class="layout-default">
    <VueLenis ref="lenisRef" root />
    <OrganismsNavBar v-model="isMenuOpen" />
    <main class="layout-default__content">
      <NuxtPage />
    </main>
    <OrganismsFooter />
    <AtomsScrollToTop />
  </div>
</template>

<script setup lang="ts">
import { VueLenis, useLenis } from 'lenis/vue';

const lenisRef = ref();
const isMenuOpen = ref(false);
const route = useRoute();
const lenis = useLenis();

// Stop Lenis when mobile menu is open
watch(isMenuOpen, (isOpen) => {
  if (lenis.value) {
    if (isOpen) {
      lenis.value.stop();
    } else {
      lenis.value.start();
    }
  }
});

// Scroll to top when route changes
watch(
  () => route.path,
  () => {
    if (lenis.value) {
      lenis.value.scrollTo(0, { immediate: true });
    }
  },
);
</script>

<style lang="scss">
.layout-default__content {
  @include padding-style;
}
</style>
