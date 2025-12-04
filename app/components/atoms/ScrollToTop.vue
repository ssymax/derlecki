<template>
  <button
    ref="button"
    class="scroll-to-top"
    aria-label="Scroll to top"
    @click="scrollToTop"
  >
    <Icon name="ph:arrow-up-bold" size="24" />
  </button>
</template>

<script setup lang="ts">
const { $gsap, $ScrollTrigger } = useNuxtApp();
const button = ref<HTMLElement | null>(null);
const lenis = useLenisState();

const scrollToTop = () => {
  if (lenis.value) {
    lenis.value.scrollTo(0, {
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    const scrollWrapper = document.querySelector('.scroll-wrapper');
    if (scrollWrapper) {
      scrollWrapper.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }
};

onMounted(() => {
  if (!button.value) return;

  // Initial state - hidden
  $gsap.set(button.value, {
    opacity: 0,
    scale: 0.8,
    y: 20,
  });

  // Show/hide based on scroll position
  const scrollWrapper = document.querySelector('.scroll-wrapper');

  $ScrollTrigger.create({
    scroller: scrollWrapper,
    start: 'top -200',
    end: 'max',
    onEnter: () => {
      $gsap.to(button.value, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: 'back.out(1.7)',
      });
    },
    onLeaveBack: () => {
      $gsap.to(button.value, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.3,
        ease: 'power2.in',
      });
    },
  });

  // Hover animation
  button.value.addEventListener('mouseenter', () => {
    $gsap.to(button.value, {
      scale: 1.1,
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  button.value.addEventListener('mouseleave', () => {
    $gsap.to(button.value, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  });
});
</script>

<style scoped lang="scss">
.scroll-to-top {
  position: fixed;
  bottom: 3rem;
  right: 3rem;
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $primary-color;
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }

  &:focus-visible {
    outline: 2px solid $primary-color;
    outline-offset: 3px;
  }

  &:active {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  @include max-width-md {
    bottom: 2rem;
    right: 2rem;
    width: 4.5rem;
    height: 4.5rem;
  }
}
</style>
