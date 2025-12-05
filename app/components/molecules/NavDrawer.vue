<template>
  <div
    ref="drawerRef"
    class="app-nav-drawer"
    :class="{ 'app-nav-drawer--open': isMenuOpen }"
  >
    <MoleculesNavMenu :routes="routes" @navigate="handleRequestClose" />
    <MoleculesNavActions :links="links" @select="handleRequestClose" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  routes: AppRoute[];
  links: ContactLink[];
  isMenuOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'request-close'): void;
}>();

const { $gsap } = useNuxtApp() as any;
const drawerRef = ref<HTMLElement | null>(null);

const handleRequestClose = () => {
  emit('request-close');
};

watch(
  () => props.isMenuOpen,
  (isOpen) => {
    if (!drawerRef.value) return;

    const isMobile = window.innerWidth < 1024;
    if (!isMobile) return;

    if (isOpen) {
      $gsap.to(drawerRef.value, {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'expo.out',
      });
    } else {
      $gsap.to(drawerRef.value, {
        x: '110%',
        opacity: 0,
        duration: 0.5,
        ease: 'expo.in',
      });
    }
  },
);
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
    padding: 6rem 2rem 3rem;
    flex-direction: column;
    gap: 3.2rem;
    background-color: #fff;
    box-shadow: 0 1.2rem 3rem rgba(0, 0, 0, 0.12);
    border-radius: 0;
    transform: translateX(110%);
    opacity: 0;
    pointer-events: none;
    z-index: 12;
    will-change: transform, opacity;
  }
}

.app-nav-drawer--open {
  @include max-width-lg() {
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
