<template>
  <div class="app-nav-drawer" :class="{ 'app-nav-drawer--open': isMenuOpen }">
    <MoleculesNavMenu :routes="routes" @navigate="handleRequestClose" />
    <MoleculesNavActions :links="links" @select="handleRequestClose" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  routes: AppRoute[];
  links: ContactLink[];
  isMenuOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'request-close'): void;
}>();

const handleRequestClose = () => {
  emit('request-close');
};
</script>

<style scoped lang="scss">
.app-nav-drawer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3.2rem;
  width: 100%;

  @include max-width-lg() {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    padding: 8rem 2.4rem 3.2rem;
    flex-direction: column;
    gap: 3.2rem;
    background-color: #fff;
    box-shadow: 0 1.2rem 3rem rgba(0, 0, 0, 0.12);
    border-radius: 0;
    transform: translateX(110%);
    opacity: 0;
    pointer-events: none;
    z-index: 12;
    transition:
      opacity 0.3s ease,
      transform 0.35s ease;
  }
}

.app-nav-drawer--open {
  @include max-width-lg() {
    opacity: 1;
    transform: translateX(0);
    pointer-events: auto;
  }
}

@include min-width-lg() {
  .app-nav-drawer {
    position: static;
    box-shadow: none;
    border-radius: 0;
    transform: none;
    opacity: 1;
    pointer-events: auto;
    padding: 0;
    gap: 2.4rem;
    align-items: center;
  }
}
</style>
