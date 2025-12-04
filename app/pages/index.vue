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
