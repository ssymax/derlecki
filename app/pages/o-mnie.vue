<template>
  <div v-if="aboutContent" class="page">
    <MoleculesSectionIntroPanel
      :title="aboutContent.header"
      :intro="aboutContent.intro"
    />
    <section class="content">
      <div class="images">
        <div ref="image1" class="img-wrap">
          <NuxtImg
            :src="aboutContent.bio_image.filename"
            :alt="aboutContent.bio_image.alt"
            format="webp"
            width="960"
            height="1280"
            loading="eager"
            class="img"
          />
        </div>
      </div>
      <div class="text">
        <div ref="image1Mobile" class="img-wrap-mobile">
          <NuxtImg
            :src="aboutContent.bio_image.filename"
            :alt="aboutContent.bio_image.alt"
            format="webp"
            width="960"
            height="1280"
            loading="eager"
            class="img"
            fetchpriority="high"
          />
        </div>
        <div ref="bioSection" class="section">
          <AtomsDecoratedHeading align="left">
            {{ aboutContent.bio_header }}
          </AtomsDecoratedHeading>
          <ul>
            <li v-for="bioItem in aboutContent.bio_items" :key="bioItem._uid">
              {{ bioItem.item }}
            </li>
          </ul>
        </div>
        <div ref="eduSection" class="section">
          <AtomsDecoratedHeading align="right">
            {{ aboutContent.edu_header }}
          </AtomsDecoratedHeading>
          <h3>{{ aboutContent.edu_first_subheader }}</h3>
          <ul>
            <li v-for="eduItem in aboutContent.edu_first_items" :key="eduItem._uid">
              {{ eduItem.item }}
            </li>
          </ul>
          <h3>{{ aboutContent.edu_second_subheader }}</h3>
          <ul>
            <li v-for="eduItem in aboutContent.edu_second_items" :key="eduItem._uid">
              {{ eduItem.item }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'O mnie',
  description:
    'Poznaj doświadczenie i kwalifikacje Mateusza Derleckiego. Jestem wykwalifikowanym fizjoterapeutą specjalizującym się w terapii manualnej i rehabilitacji sportowej w Olsztynie.',
  ogImage: '/img/og-image.jpg',
});

const { aboutContent } = useAboutInfo();

const { $gsap, $ScrollTrigger } = useNuxtApp() as any;
const { state } = useAppStore();

const image1 = ref<HTMLElement | null>(null);
const image1Mobile = ref<HTMLElement | null>(null);
const bioSection = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!image1.value || !bioSection.value) return;

  const mm = $gsap.matchMedia();

  // Initial state
  $gsap.set(image1.value, { opacity: 0, scale: 0.9 });

  // Wait for loader to finish before starting animations
  watch(
    () => state.animationsReady,
    (ready) => {
      if (!ready || !image1.value) return;

      // Animate image on load
      $gsap.to(image1.value, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
      });

      // Desktop animations
      mm.add('(min-width: 768px)', () => {
        // Parallax effect on image
        $gsap.to(image1.value, {
          y: 50,
          scrollTrigger: {
            trigger: bioSection.value,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

      // Mobile animations
      mm.add('(max-width: 767px)', () => {
        if (!image1Mobile.value) return;

        // Scale down image on scroll
        $gsap.fromTo(
          image1Mobile.value.querySelector('.img'),
          { scale: 1.1 },
          {
            scale: 1,
            scrollTrigger: {
              trigger: image1Mobile.value,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          },
        );
      });
    },
    { immediate: true },
  );
});
</script>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: column;
  @include px-to-vw(gap, 40);
}

.content {
  display: flex;
  @include px-to-vw(gap, 40);
  min-height: 100vh;
}

.images {
  position: sticky;
  top: 0;
  flex: 1;
  height: 100vh;
  overflow: hidden;
}

.img-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1.2rem;

  &--left {
    object-position: left center;
  }
}

.img-wrap-mobile {
  display: none;
}

.text {
  flex: 1;
  display: flex;
  flex-direction: column;
  @include px-to-vw(gap, 40);
  @include px-to-vw(padding-top, 20);
  @include px-to-vw(padding-bottom, 20);
}

.section {
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
    @include px-to-vw(padding-left, 25);
    margin-bottom: 1rem;

    &::before {
      content: '✦';
      position: absolute;
      left: 0;
      top: 0.2rem;
      font-size: 1.2rem;
      color: var(--color-primary, #2c3e50);
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

@include max-width-md {
  .content {
    flex-direction: column;
    gap: 2rem;
  }

  .images {
    display: none;
  }

  .img-wrap-mobile {
    display: block;
    width: 100%;
    height: auto;
    overflow: hidden;
    border-radius: 1.2rem;
    margin-bottom: 2rem;

    .img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  .section {
    min-height: auto;
  }

  .section :deep(li) {
    padding-left: 2.4rem;

    &::before {
      left: 0.4rem;
    }
  }
}
</style>
