<template>
  <div class="home-page">
    <OrganismsHomeHero />
    <div ref="parallaxSectionsRef" class="home-page__parallax-sections">
      <OrganismsHomeServices />
      <OrganismsHomeOpinions />
    </div>
  </div>
</template>

<script setup lang="ts">
const parallaxSectionsRef = ref<HTMLElement | null>(null);
const { $gsap, $ScrollTrigger } = useNuxtApp();

onMounted(() => {
  // Parallax effect for services and opinions sections
  if (parallaxSectionsRef.value && $gsap && $ScrollTrigger) {
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
});
</script>

<style scoped lang="scss">
.home-page {
  margin-left: calc(100 / 1920 * -100vw);
  margin-right: calc(100 / 1920 * -100vw);
  margin-top: calc(50 / 1920 * -100vw);
  margin-bottom: calc(50 / 1920 * -100vw);

  @media (min-width: 1920px) {
    margin-left: -100px;
    margin-right: -100px;
    margin-top: -50px;
    margin-bottom: -50px;
  }
}

.home-page__parallax-sections {
  position: relative;
  z-index: 3;
  will-change: transform;
  background-color: #fff;
}
</style>
