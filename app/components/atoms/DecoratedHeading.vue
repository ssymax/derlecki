<template>
  <h2 class="heading" :class="`heading--${align}`">
    <span ref="sparkle" class="sparkle">✦</span>
    <span class="text"><slot /></span>
    <span class="line" />
  </h2>
</template>

<script setup lang="ts">
interface Props {
  align?: 'left' | 'right';
}

withDefaults(defineProps<Props>(), {
  align: 'left',
});

const { $gsap } = useNuxtApp() as any;
const sparkle = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!sparkle.value) return;

  // Continuous dynamic rotation based on scroll
  $gsap.to(sparkle.value, {
    rotation: 720,
    scrollTrigger: {
      trigger: sparkle.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5,
    },
  });
});
</script>

<style scoped lang="scss">
.heading {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: $primary-color;

  &--left {
    flex-direction: row;
  }
  &--right {
    flex-direction: row-reverse;
  }
}

.text {
  flex-shrink: 0;
}

.sparkle {
  flex-shrink: 0;
  font-size: 3rem;
  color: $primary-color;
  opacity: 0.5;
  display: inline-block;
  will-change: transform;
}

.line {
  flex-grow: 1;
  max-width: 15rem;
  height: 3px;
  border-radius: 2px;

  .heading--left & {
    background: linear-gradient(to right, $primary-color, rgba($primary-color, 0.3));
  }
  .heading--right & {
    background: linear-gradient(to left, $primary-color, rgba($primary-color, 0.3));
  }
}

@media (max-width: 768px) {
  .heading {
    margin-bottom: 2rem;
    gap: 1rem;
  }
  .text {
    font-size: 2rem;
  }
  .sparkle {
    font-size: 2rem;
  }
  .line {
    max-width: 8rem;
  }
}
</style>
