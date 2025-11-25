<template>
  <div>
    <section class="pricing">
      <MoleculesSectionIntroPanel
        :title="pricingContent?.header"
        :intro="pricingContent?.intro"
      />

      <div class="pricing__list">
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

      <div v-if="pricingContent?.images?.length" class="pricing__images">
        <div
          v-for="image in pricingContent.images"
          :key="image.id"
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

onMounted(() => {
  // Animate images with scale effect on scroll
  const images = document.querySelectorAll('.pricing__image');
  images.forEach((image) => {
    $gsap.fromTo(
      image,
      {
        scale: 1.05,
      },
      {
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: image,
          start: 'top 85%',
          end: 'top 30%',
          scrub: 1,
        },
      },
    );
  });
});
</script>

<style scoped lang="scss">
.pricing {
  min-height: 100vh;
  max-width: 140rem;
  margin: 0 auto;
  padding: clamp(3rem, 5vw, 6rem) 2.4rem 0;

  @media (max-width: 768px) {
    padding: clamp(3rem, 5vw, 6rem) 1.6rem 0;
  }
}

.pricing__list {
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

.pricing__item {
  background: #fff;
  border: 1px solid rgba($primary-color, 0.1);
  border-radius: 1.2rem;
  padding: 3rem 2.4rem;
  box-shadow: 0 4px 20px rgba($primary-color, 0.08);

  @media (max-width: 768px) {
    padding: 2.4rem 2rem;
  }
}

.pricing__item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.6rem;
  margin-bottom: 1.2rem;
}

.pricing__item-title {
  font-size: clamp(2rem, 2.5vw, 2.4rem);
  font-weight: 600;
  color: $primary-color;
  line-height: 1.3;
  flex: 1;
}

.pricing__item-price {
  font-size: clamp(2.2rem, 2.8vw, 2.8rem);
  font-weight: 700;
  color: $primary-color;
  white-space: nowrap;
}

.pricing__item-description {
  font-size: 1.6rem;
  line-height: 1.6;
  color: #666;
  margin: 0;
}

.pricing__images {
  display: grid;
  gap: 2.4rem;
  margin-top: 6rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3.2rem;
  }

  @media (min-width: 1024px) {
    gap: 4rem;
  }
}

.pricing__image-wrapper {
  width: 100%;
  overflow: hidden;
  border-radius: 1.2rem;
  aspect-ratio: 3 / 2;
}

.pricing__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
