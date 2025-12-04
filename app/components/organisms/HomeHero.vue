<template>
  <section class="home">
    <div v-if="slidesContent?.images?.images?.length" class="home__hero">
      <div class="home__hero-slider">
        <div
          v-for="(image, index) in slidesContent.images.images"
          :key="image.id"
          class="home__hero-slide"
          :class="{ 'home__hero-slide--active': currentSlide === index }"
        >
          <NuxtImg
            :src="image.filename"
            :alt="image.alt"
            class="home__hero-image"
            format="webp"
          />
        </div>
      </div>

      <div class="home__hero-overlay">
        <div ref="heroContentRef" class="home__hero-content">
          <h1 class="home__hero-title">{{ contactData?.owner_name }}</h1>
          <p class="home__hero-subtitle">{{ contactData?.hero_description }}</p>
          <div class="home__hero-links">
            <Transition name="fade" mode="out-in">
              <AtomsAppButton
                v-if="heroRoutes[currentSlide]"
                :key="currentSlide"
                variant="outline"
                :to="heroRoutes[currentSlide]?.path || '/'"
              >
                {{ heroRoutes[currentSlide]?.name }}
              </AtomsAppButton>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { slidesContent } = useSlides();
const { contactData } = useContactInfo();
const { routes } = useNavigation();

const heroRoutes = computed(() => {
  return routes.value.filter((route) => route.path !== '/');
});

const heroContentRef = ref<HTMLElement | null>(null);
const { $gsap } = useNuxtApp() as any;
const currentSlide = ref(0);
const { state } = useAppStore();

onMounted(() => {
  // Set initial states
  if (heroContentRef.value && $gsap) {
    const title = heroContentRef.value.querySelector('.home__hero-title');
    const subtitle = heroContentRef.value.querySelector('.home__hero-subtitle');
    const cta = heroContentRef.value.querySelector('.home__hero-links');
    $gsap.set([title, subtitle, cta], { opacity: 0 });
  }

  // Wait for loader to finish before starting animations
  watch(
    () => state.animationsReady,
    (ready) => {
      if (!ready) return;

      // Animate hero content on load
      if (heroContentRef.value && $gsap) {
        const title = heroContentRef.value.querySelector('.home__hero-title');
        const subtitle = heroContentRef.value.querySelector('.home__hero-subtitle');
        const cta = heroContentRef.value.querySelector('.home__hero-links');

        $gsap.to([title, subtitle, cta], {
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power2.out',
          delay: 0.3,
        });
      }

      if (
        slidesContent.value?.images?.images &&
        slidesContent.value.images.images.length > 1 &&
        $gsap
      ) {
        const totalSlides = slidesContent.value.images.images.length;

        $gsap.to(currentSlide, {
          value: totalSlides,
          duration: totalSlides * 8,
          ease: 'none',
          repeat: -1,
          modifiers: {
            value: (value: number) => Math.floor(value % totalSlides),
          },
        });
      }
    },
    { immediate: true },
  );
});
</script>

<style scoped lang="scss">
.home {
  min-height: 100vh;
  min-height: 100dvh;
  overflow: hidden;
}

.home__hero {
  position: relative;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
}

.home__hero-slider {
  position: relative;
  width: 100%;
  height: 100%;
}

.home__hero-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 2s ease-in-out;

  &--active {
    opacity: 1;
  }
}

.home__hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.home__hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5));
}

.home__hero-content {
  text-align: center;
  color: #fff;
  padding: 0 2rem;
}

.home__hero-title {
  font-size: clamp(3.6rem, 6vw, 7.2rem);
  font-weight: 300;
  margin-bottom: 1.6rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.home__hero-subtitle {
  font-size: clamp(1.6rem, 2.2vw, 2.2rem);
  font-weight: 300;
  line-height: 1.4;
  margin-bottom: 4.8rem;
  opacity: 0.9;
  letter-spacing: 0.05em;
}

.home__hero-links {
  display: flex;
  gap: 2.4rem;
  justify-content: center;
  flex-wrap: wrap;
}

.fade-enter-active {
  transition: opacity 0.8s ease;
  transition-delay: 0.6s;
}

.fade-leave-active {
  transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
