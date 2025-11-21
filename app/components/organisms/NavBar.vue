<template>
  <header class="app-nav">
    <MoleculesNavBrandRow
      :logo-url="logoUrl"
      :is-menu-open="isMenuOpen"
      @toggle="toggleMenu"
    />

    <MoleculesNavDrawer
      :routes="routes"
      :links="contactItemsForNav"
      :is-menu-open="isMenuOpen"
      @request-close="closeMenu"
    />

    <AtomsNavOverlay :is-visible="isMenuOpen" @close="closeMenu" />
  </header>
</template>

<script setup lang="ts">
import logoUrl from '~/assets/logo.svg';

const { contactItemsForNav } = await useContactInfo();

const isMenuOpen = defineModel<boolean>({ default: false });

// Prevent body scroll when menu is open
if (import.meta.client) {
  watch(isMenuOpen, (newVal) => {
    document.body.style.overflow = newVal ? 'hidden' : '';
  });
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const route = useRoute();
watch(
  () => route.fullPath,
  () => {
    closeMenu();
  },
);
</script>

<style scoped lang="scss">
.app-nav {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.6rem 2.4rem;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  z-index: 20;

  @include min-width-lg() {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 2.4rem;
  }
}
</style>
