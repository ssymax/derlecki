<template>
  <div>
    <section class="pricing">
      <MoleculesSectionIntroPanel
        :title="pricingContent?.header"
        :intro="pricingContent?.intro"
      />

      <div class="pricing__grid">
        <!-- Single pricing tile with all items -->
        <div class="pricing__tile">
          <div
            v-for="item in pricingContent?.pricing_list"
            :key="item._uid"
            class="pricing__item"
          >
            <div class="pricing__item-header">
              <h3 class="pricing__item-title">{{ item.visit_type }}</h3>
              <span class="pricing__item-price">{{ item.price }}</span>
            </div>
            <p class="pricing__item-description">{{ item.description }}</p>
          </div>
        </div>

        <!-- Images displayed as separate tiles -->
        <div
          v-for="(image, index) in pricingContent?.images"
          :key="`${image.id || image.filename}-${index}`"
          class="pricing__image-wrapper"
        >
          <NuxtImg
            :src="image.filename"
            :alt="image.alt"
            class="pricing__image"
            format="webp"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { pricingContent } = usePricing();
const { $gsap } = useNuxtApp();
const { state } = useAppStore();

onMounted(() => {
  // Wait for loader to finish before starting animations
  watch(
    () => state.animationsReady,
    (ready) => {
      if (!ready) return;

      // Use nextTick to ensure DOM is fully rendered
      nextTick(() => {
        // Animate images with scale effect on scroll
        const wrappers = document.querySelectorAll('.pricing__image-wrapper');
        wrappers.forEach((wrapper) => {
          const image = wrapper.querySelector('.pricing__image');
          if (!image) return;

          $gsap.to(image, {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top 90%',
              end: 'bottom 10%',
              scrub: 3,
            },
          });
        });
      });
    },
    { immediate: true },
  );
});
</script>

<style scoped lang="scss">
.pricing {
  min-height: 100vh;
  max-width: 140rem;
  margin: 0 auto;
  padding: clamp(3rem, 5vw, 6rem) 2.4rem;

  @media (max-width: 768px) {
    padding: clamp(3rem, 5vw, 6rem) 1.6rem;
  }
}

.pricing__grid {
  display: grid;
  gap: 2.4rem;
  margin-top: 4rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3.2rem;
  }

  @media (min-width: 1024px) {
    gap: 4rem;
  }
}

.pricing__tile {
  background: #fff;
  border: 1px solid rgba($primary-color, 0.1);
  border-radius: 1.2rem;
  padding: 2.4rem 2rem;
  box-shadow: 0 4px 20px rgba($primary-color, 0.08);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;

  @media (max-width: 768px) {
    padding: 2rem 1.6rem;
  }
}

.pricing__item {
  &:not(:last-child) {
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba($primary-color, 0.1);
  }
}

.pricing__item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.2rem;
  margin-bottom: 0.8rem;
}

.pricing__item-title {
  font-size: clamp(1.6rem, 2vw, 1.8rem);
  font-weight: 600;
  color: $primary-color;
  line-height: 1.3;
  flex: 1;
}

.pricing__item-price {
  font-size: clamp(1.5rem, 1.8vw, 1.6rem);
  font-weight: 600;
  color: $primary-color;
  white-space: nowrap;
}

.pricing__item-description {
  font-size: 1.4rem;
  line-height: 1.5;
  color: #666;
  margin: 0;
}

.pricing__image-wrapper {
  width: 100%;
  overflow: hidden;
  border-radius: 1.2rem;
  aspect-ratio: 3 / 2;
  box-shadow: 0 4px 20px rgba($primary-color, 0.08);
}

.pricing__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.05);
  will-change: transform;
  transition: transform 0.1s ease-out;
}
</style>
