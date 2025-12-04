<template>
  <h2 class="decorated-heading" :class="`decorated-heading--${align}`">
    <span ref="sparkle" class="decorated-heading__sparkle">✦</span>
    <span class="decorated-heading__text"><slot /></span>
    <span class="decorated-heading__line" />
  </h2>
</template>

<script setup lang="ts">
interface Props {
  align?: 'left' | 'right';
}

withDefaults(defineProps<Props>(), {
  align: 'left',
});

const { $gsap } = useNuxtApp();
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
.decorated-heading {
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

.decorated-heading__text {
  flex-shrink: 0;
}

.decorated-heading__sparkle {
  flex-shrink: 0;
  font-size: 3rem;
  color: $primary-color;
  opacity: 0.5;
  display: inline-block;
  will-change: transform;
}

.decorated-heading__line {
  flex-grow: 1;
  max-width: 15rem;
  height: 3px;
  border-radius: 2px;

  .decorated-heading--left & {
    background: linear-gradient(to right, $primary-color, rgba($primary-color, 0.3));
  }

  .decorated-heading--right & {
    background: linear-gradient(to left, $primary-color, rgba($primary-color, 0.3));
  }
}

@media (max-width: 768px) {
  .decorated-heading {
    margin-bottom: 2rem;
    gap: 1rem;
  }

  .decorated-heading__text {
    font-size: 2rem;
  }

  .decorated-heading__sparkle {
    font-size: 2rem;
  }

  .decorated-heading__line {
    max-width: 8rem;
  }
}
</style>
