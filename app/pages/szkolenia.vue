<template>
  <div v-if="courseContent" class="page">
    <MoleculesSectionIntroPanel
      :title="courseContent.header"
      :intro="courseContent.intro"
    />

    <!-- Hero Section with Quote -->
    <section ref="heroSection" class="hero">
      <div ref="heroImage" class="hero__wrap">
        <NuxtImg
          v-if="courseContent.images[0]"
          :src="courseContent.images[0].filename"
          :alt="courseContent.images[0].alt || 'Course hero'"
          format="webp"
          width="1920"
          height="1080"
          loading="eager"
          class="hero__img"
        />
      </div>
      <div class="hero__overlay">
        <blockquote ref="quoteText" class="hero__quote">
          {{ courseContent.quote }}
        </blockquote>
      </div>
    </section>

    <!-- Main Content -->
    <section class="content">
      <!-- Items and Image 2 Row -->
      <div class="row">
        <div ref="itemsSection" class="items">
          <AtomsDecoratedHeading align="left">O szkoleniu</AtomsDecoratedHeading>
          <p v-for="item in courseContent.text_items" :key="item._uid" class="item">
            {{ item.item }}
          </p>
        </div>

        <div v-if="courseContent.images[1]" ref="image2" class="img-wrap">
          <NuxtImg
            :src="courseContent.images[1].filename"
            :alt="courseContent.images[1].alt || 'Course image 2'"
            format="webp"
            width="960"
            height="1280"
            loading="lazy"
            class="img"
          />
        </div>
      </div>

      <!-- Image 3 and For Who Row -->
      <div class="row">
        <div v-if="courseContent.images[2]" ref="image3" class="img-wrap">
          <NuxtImg
            :src="courseContent.images[2].filename"
            :alt="courseContent.images[2].alt || 'Course image 3'"
            format="webp"
            width="1280"
            height="720"
            loading="lazy"
            class="img"
          />
        </div>

        <div ref="forWhoSection" class="for-who">
          <Icon name="mdi:account-group" class="for-who__icon" />
          <p ref="forWhoDescription" class="for-who__text">
            {{ courseContent.for_who }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import SplitType from 'split-type';
useSeoMeta({
  title: 'Szkolenia',
  description:
    'Profesjonalne szkolenia z fizjoterapii w Olsztynie. Podnoszę kwalifikacje i dzielę się wiedzą z zakresu terapii manualnej, rehabilitacji sportowej i metod fizjoterapeutycznych.',
  ogImage: '/img/og-image.jpg',
});

const { courseContent } = useCourse();

const { $gsap } = useNuxtApp() as any;
const { state } = useAppStore();

const heroSection = ref<HTMLElement | null>(null);
const heroImage = ref<HTMLElement | null>(null);
const quoteText = ref<HTMLElement | null>(null);
const image2 = ref<HTMLElement | null>(null);
const image3 = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!heroImage.value || !quoteText.value) return;

  // Set initial state for quote text to prevent flash
  if (quoteText.value) {
    $gsap.set(quoteText.value, { opacity: 0 });
  }

  // Wait for loader to finish before starting animations
  watch(
    () => state.animationsReady,
    (ready) => {
      if (!ready) return;

      // Hero image parallax effect
      $gsap.to(heroImage.value, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection.value,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Make quote visible before splitting
      $gsap.set(quoteText.value, { opacity: 1 });

      if (!quoteText.value) return;

      // Split quote text for reveal animation
      const quoteSplit = new SplitType(quoteText.value, {
        types: 'lines,words',
        lineClass: 'split-line',
      });

      // Initial state - hide quote words
      $gsap.set(quoteSplit.words, {
        opacity: 0,
        y: 20,
      });

      // Reveal quote words with stagger
      $gsap.to(quoteSplit.words, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: 'power2.out',
        delay: 0.5,
      });

      // Parallax on image 2 - fixed effect without layout shift
      if (image2.value) {
        const img = image2.value.querySelector('img');
        if (img) {
          $gsap.to(img, {
            y: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: image2.value,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      }

      // Parallax on image 3 - fixed effect without layout shift
      if (image3.value) {
        const img = image3.value.querySelector('img');
        if (img) {
          $gsap.to(img, {
            y: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: image3.value,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      }
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

.hero {
  position: relative;
  height: 70vh;
  min-height: 600px;
  overflow: hidden;
  border-radius: 1.2rem;
  @include px-to-vw(margin-left, 10);
  @include px-to-vw(margin-right, 10);

  @media (max-width: 768px) {
    height: 60vh;
    min-height: 500px;
  }
}

.hero__wrap {
  position: absolute;
  top: -10%;
  left: 0;
  width: 100%;
  height: 120%;
  overflow: hidden;
}

.hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%);
  @include px-to-vw(padding, 40);
}

.hero__quote {
  font-size: clamp(1.5rem, 3.5vw, 3rem);
  font-weight: 600;
  line-height: 1.4;
  font-style: italic;
  text-align: center;
  color: #ffffff;
  max-width: 900px;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);

  :deep(.split-line) {
    overflow: hidden;
    display: block;
  }
}

.content {
  display: flex;
  flex-direction: column;
  @include px-to-vw(gap, 40);
  @include px-to-vw(padding-top, 20);
  @include px-to-vw(padding-left, 10);
  @include px-to-vw(padding-right, 10);
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  @include px-to-vw(gap, 40);
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item {
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

.img-wrap {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  height: 100%;

  img {
    transform: scale(1.15);
    will-change: transform;
    border-radius: 1rem;
  }
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.for-who {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.for-who__icon {
  font-size: clamp(3rem, 5vw, 4rem);
  color: $primary-color;
  opacity: 0.8;
}

.for-who__text {
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  line-height: 1.6;
  color: $primary-color;
  font-weight: 500;
}

@include max-width-md {
  .hero {
    margin-bottom: 3rem;
  }

  .hero__img {
    object-position: 40% center;
  }

  .row {
    gap: 4rem;

    &:first-of-type {
      display: flex;
      flex-direction: column;
    }

    &:last-of-type {
      display: flex;
      flex-direction: column-reverse;
    }
  }

  .item {
    padding-left: 2.4rem;

    &::before {
      left: 0.4rem;
    }
  }
}
</style>
