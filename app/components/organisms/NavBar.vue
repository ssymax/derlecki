<template>
  <header ref="navRef" class="app-nav" :class="{ 'app-nav--hidden': isHidden }">
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

const { contactItemsForNav } = useContactInfo();
const { routes } = useNavigation();

const isMenuOpen = defineModel<boolean>({ default: false });
const navRef = ref<HTMLElement | null>(null);
const isHidden = ref(false);

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

onMounted(() => {
  if (!navRef.value) return;

  const lenis = useLenisState();

  let lastScrollY = 0;
  const scrollThreshold = 10;

  // Listen to Lenis scroll events
  const handleScroll = (e: any) => {
    const currentScrollY = e.scroll;
    const scrollDelta = Math.abs(currentScrollY - lastScrollY);

    // Always update lastScrollY to keep it current
    if (scrollDelta < scrollThreshold) {
      lastScrollY = currentScrollY;
      return;
    }

    // Don't hide navbar when drawer is open
    if (isMenuOpen.value) {
      lastScrollY = currentScrollY;
      return;
    }

    // Only hide if scrolled down more than 100px
    if (currentScrollY > 100) {
      if (currentScrollY > lastScrollY) {
        // Scrolling down - hide
        isHidden.value = true;
      } else {
        // Scrolling up - show
        isHidden.value = false;
      }
    } else {
      // Near top - always show
      isHidden.value = false;
    }

    lastScrollY = currentScrollY;
  };

  // Attach listener when Lenis is ready
  watch(
    lenis,
    (lenisInstance) => {
      if (lenisInstance) {
        lenisInstance.on('scroll', handleScroll);
      }
    },
    { immediate: true },
  );
});
</script>

<style scoped lang="scss">
.app-nav {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 1.6rem;
  background-color: rgba(255, 255, 255, 1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  z-index: 20;
  transform: translateY(0);
  backdrop-filter: blur(0px);
  transition:
    transform 0.8s cubic-bezier(0.4, 0, 0.2, 1),
    background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1),
    backdrop-filter 0.8s cubic-bezier(0.4, 0, 0.2, 1);

  @include max-width-md() {
    padding: 1rem 1.4rem;
  }

  @include min-width-lg() {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 2.4rem;
    padding: 1.6rem 2.4rem;
  }

  &--hidden {
    transform: translateY(-100%);
    background-color: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(16px);
  }
}
</style>
