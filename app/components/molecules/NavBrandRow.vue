<template>
  <div class="app-nav__brand-row">
    <AtomsNavLogo :logo-url="logoUrl" />
    <AtomsNavToggleButton
      :is-open="isMenuOpen"
      @toggle="handleToggle"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  logoUrl: string;
  isMenuOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggle'): void;
}>();

const handleToggle = () => {
  emit('toggle');
};
</script>

<style scoped lang="scss">
.app-nav__brand-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
  z-index: 15;

  @include min-width-lg() {
    width: auto;
    gap: 2.4rem;
  }
}
</style>
