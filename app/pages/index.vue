<template>
  <div class="page">
    <OrganismsHomeHero />
    <div ref="parallaxSectionsRef" class="parallax">
      <OrganismsHomeServices />
      <OrganismsHomeOpinions />
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Fizjoterapia Olsztyn - Profesjonalna Terapia Manualna',
  description:
    'Profesjonalna fizjoterapia w Olsztynie. Specjalizuję się w terapii manualnej, rehabilitacji ortopedycznej i sportowej. Indywidualne podejście do każdego pacjenta. Umów się na konsultację.',
  ogImage: '/img/og-image.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
});

const parallaxSectionsRef = ref<HTMLElement | null>(null);
const { $gsap } = useNuxtApp() as any;
const { state } = useAppStore();

onMounted(() => {
  // Wait for loader to finish before starting animations
  watch(
    () => state.animationsReady,
    (ready) => {
      if (!ready) return;

      // Parallax effect for services and opinions sections
      if (parallaxSectionsRef.value) {
        $gsap.fromTo(
          parallaxSectionsRef.value,
          {
            y: 0,
          },
          {
            y: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: '.home__hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          },
        );
      }
    },
    { immediate: true },
  );
});
</script>

<style scoped lang="scss">
.page {
  @include px-to-vw(margin-left, -100);
  @include px-to-vw(margin-right, -100);
  @include px-to-vw(margin-top, -50);
  @include px-to-vw(margin-bottom, -50);
}

.parallax {
  position: relative;
  z-index: 3;
  will-change: transform;
  background-color: #fff;
}
</style>
