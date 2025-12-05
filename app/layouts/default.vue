<template>
  <div class="layout">
    <div ref="scrollWrapperRef" class="scroll-wrapper">
      <div ref="contentRef" class="scroll-content">
        <OrganismsNavBar v-model="isMenuOpen" />
        <main class="content">
          <NuxtPage />
        </main>
        <OrganismsFooter />
        <AtomsScrollToTop />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Lenis from 'lenis';

const scrollWrapperRef = ref<HTMLElement>();
const contentRef = ref<HTMLElement>();
const isMenuOpen = ref(false);
const route = useRoute();
const lenis = useLenisState();

onMounted(() => {
  const { $gsap, $ScrollTrigger } = useNuxtApp() as any;

  if (scrollWrapperRef.value && contentRef.value) {
    // configure ScrollTrigger to use the scroll wrapper globally
    if ($ScrollTrigger) {
      $ScrollTrigger.defaults({
        scroller: scrollWrapperRef.value,
      });
    }

    // initialize Lenis with wrapper and content
    lenis.value = new Lenis({
      wrapper: scrollWrapperRef.value,
      content: contentRef.value,
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
    });

    // integrate Lenis with GSAP ScrollTrigger
    if ($gsap && $ScrollTrigger) {
      lenis.value.on('scroll', $ScrollTrigger.update);

      $gsap.ticker.add((time: number) => {
        lenis.value?.raf(time * 1000);
      });

      $gsap.ticker.lagSmoothing(0);
    }
  }
});
onUnmounted(() => {
  lenis.value?.destroy();
});

// Prevent body scroll when drawer is open using CSS
watch(isMenuOpen, (isOpen) => {
  if (scrollWrapperRef.value) {
    if (isOpen) {
      scrollWrapperRef.value.style.overflow = 'hidden';
    } else {
      scrollWrapperRef.value.style.overflow = '';
    }
  }
});

// Scroll to top when route changes
watch(
  () => route.path,
  async () => {
    await nextTick();

    if (lenis.value) {
      lenis.value.scrollTo(0, { immediate: true });

      // Safety fallback for touch devices where Lenis might not animate
      requestAnimationFrame(() => {
        const wrapper = scrollWrapperRef.value;
        if (wrapper) {
          wrapper.scrollTo({ top: 0, behavior: 'auto' });
        }
      });
    } else {
      const wrapper = scrollWrapperRef.value;
      if (wrapper) {
        wrapper.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  },
);
</script>

<style scoped lang="scss">
.layout {
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
}

.scroll-wrapper {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.scroll-content {
  width: 100%;
}

.content {
  @include padding-style;
  @include page-container;
}
</style>
