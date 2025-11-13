<template>
  <section class="bio">
    <div class="bio__images">
      <div ref="image1" class="bio__image-wrapper bio__image-wrapper--1">
        <NuxtImg
          src="/img/o-mnie.jpg"
          alt="Mateusz Derlecki"
          format="webp"
          width="960"
          height="1280"
          loading="lazy"
          class="bio__image"
        />
      </div>
      <div ref="image2" class="bio__image-wrapper bio__image-wrapper--2">
        <NuxtImg
          src="/img/o-mnie-2.jpg"
          alt="Mateusz Derlecki - Kwalifikacje"
          format="webp"
          width="960"
          height="1280"
          loading="lazy"
          class="bio__image bio__image--left"
        />
      </div>
    </div>
    <div class="bio__content">
      <div ref="bioSection" class="bio__section">
        <AtomsAppDecoratedHeading align="left">O mnie</AtomsAppDecoratedHeading>
        <ContentRenderer v-if="bio" :value="bio" />
        <p v-else>Ładowanie...</p>
      </div>
      <div ref="eduSection" class="bio__section">
        <AtomsAppDecoratedHeading align="right">Kwalifikacje</AtomsAppDecoratedHeading>
        <ContentRenderer v-if="education" :value="education" />
        <p v-else>Ładowanie...</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { $gsap, $ScrollTrigger } = useNuxtApp();
const { data: bio } = await useAsyncData('bio', () =>
  queryCollection('content').path('/bio').first(),
);
const { data: education } = await useAsyncData('edu', () =>
  queryCollection('content').path('/edu').first(),
);

const image1 = ref<HTMLElement | null>(null);
const image2 = ref<HTMLElement | null>(null);
const bioSection = ref<HTMLElement | null>(null);
const eduSection = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!image1.value || !image2.value || !bioSection.value || !eduSection.value) return;

  // Initial state - show first image
  $gsap.set(image2.value, { opacity: 0, scale: 0.95 });
  $gsap.set(image1.value, { opacity: 1, scale: 1 });

  // Animate first image on load
  $gsap.from(image1.value, {
    opacity: 0,
    scale: 0.9,
    duration: 1.2,
    ease: 'power2.out',
  });

  // Image transition based on scroll with border-radius morphing
  $ScrollTrigger.create({
    trigger: eduSection.value,
    start: 'top center',
    end: 'top top',
    onEnter: () => {
      $gsap.to(image1.value, {
        opacity: 0,
        scale: 1.05,
        duration: 0.8,
        ease: 'power2.inOut',
      });
      $gsap.to(image2.value, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.inOut',
      });
    },
    onLeaveBack: () => {
      $gsap.to(image1.value, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.inOut',
      });
      $gsap.to(image2.value, {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: 'power2.inOut',
      });
    },
  });

  // Parallax effect on images
  $gsap.to(image1.value, {
    y: 50,
    scrollTrigger: {
      trigger: bioSection.value,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  });

  $gsap.to(image2.value, {
    y: 50,
    scrollTrigger: {
      trigger: eduSection.value,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  });
});
</script>

<style scoped lang="scss">
.bio {
  display: flex;
  gap: 4rem;
  min-height: 100vh;
}

.bio__images {
  position: sticky;
  top: 0;
  flex: 1;
  height: 100vh;
  overflow: hidden;
}

.bio__image-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bio__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;

  &--left {
    object-position: left center;
  }
}

.bio__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 2rem 0;
}

.bio__section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  :deep(ul) {
    margin-left: 0;
    padding-left: 0;
    list-style: none;
    margin-bottom: 1.5rem;
  }

  :deep(li) {
    position: relative;
    padding-left: 2.5rem;
    margin-bottom: 1rem;

    &::before {
      content: '✦';
      position: absolute;
      left: 0;
      top: 0.2rem;
      font-size: 1.2rem;
      color: $primary-color;
      opacity: 0.6;
    }
  }

  :deep(h1),
  :deep(h2),
  :deep(h3) {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
}

@media (max-width: 768px) {
  .bio {
    flex-direction: column;
    gap: 2rem;
  }

  .bio__images {
    position: relative;
    height: 60vh;
  }

  .bio__section {
    min-height: auto;
  }
}
</style>
