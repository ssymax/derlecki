<template>
  <div v-if="courseContent" class="course-page">
    <MoleculesSectionIntroPanel
      :title="courseContent.header"
      :intro="courseContent.intro"
    />

    <!-- Hero Section with Quote -->
    <section ref="heroSection" class="course-hero">
      <div ref="heroImage" class="course-hero__image-wrapper">
        <NuxtImg
          v-if="courseContent.images[0]"
          :src="courseContent.images[0].filename"
          :alt="courseContent.images[0].alt || 'Course hero'"
          format="webp"
          width="1920"
          height="1080"
          loading="eager"
          class="course-hero__image"
        />
      </div>
      <div class="course-hero__overlay">
        <blockquote ref="quoteText" class="course-hero__quote">
          {{ courseContent.quote }}
        </blockquote>
      </div>
    </section>

    <!-- Main Content -->
    <section class="course-content">
      <!-- Items and Image 2 Row -->
      <div class="course-content__row course-content__row--first">
        <div ref="itemsSection" class="course-content__items">
          <AtomsDecoratedHeading align="left">O szkoleniu</AtomsDecoratedHeading>
          <p
            v-for="item in courseContent.text_items"
            :key="item._uid"
            class="course-content__item"
          >
            {{ item.item }}
          </p>
        </div>

        <div v-if="courseContent.images[1]" ref="image2" class="course-content__image">
          <NuxtImg
            :src="courseContent.images[1].filename"
            :alt="courseContent.images[1].alt || 'Course image 2'"
            format="webp"
            width="960"
            height="1280"
            loading="lazy"
            class="course-content__img"
          />
        </div>
      </div>

      <!-- Image 3 and For Who Row -->
      <div class="course-content__row course-content__row--second">
        <div v-if="courseContent.images[2]" ref="image3" class="course-content__image">
          <NuxtImg
            :src="courseContent.images[2].filename"
            :alt="courseContent.images[2].alt || 'Course image 3'"
            format="webp"
            width="1280"
            height="720"
            loading="lazy"
            class="course-content__img"
          />
        </div>

        <div ref="forWhoSection" class="course-content__for-who">
          <Icon name="mdi:account-group" class="course-content__icon" />
          <p ref="forWhoDescription" class="course-content__description">
            {{ courseContent.for_who }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import SplitType from 'split-type';

const { courseContent } = useCourse();

const { $gsap } = useNuxtApp();
const { state } = useAppStore();

const heroSection = ref<HTMLElement | null>(null);
const heroImage = ref<HTMLElement | null>(null);
const quoteText = ref<HTMLElement | null>(null);
const image2 = ref<HTMLElement | null>(null);
const image3 = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!heroImage.value || !quoteText.value) return;

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

  // Wait for animations ready
  watch(
    () => state.animationsReady,
    (ready) => {
      if (!ready || !quoteSplit.words) return;

      // Reveal quote words with stagger
      $gsap.to(quoteSplit.words, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: 'power2.out',
        delay: 0.5,
      });
    },
    { immediate: true },
  );

  // Parallax on image 2 - fixed effect without layout shift
  if (image2.value) {
    const img = image2.value.querySelector('img');
    if (img) {
      $gsap.set(img, { scale: 1.15 });
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
      $gsap.set(img, { scale: 1.15 });
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
});
</script>

<style scoped lang="scss">
.course-page {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding-top: clamp(2rem, 4vw, 5rem);
}

// Hero Section
.course-hero {
  position: relative;
  height: 70vh;
  min-height: 600px;
  overflow: hidden;
  border-radius: 1.2rem;
  margin: 0 clamp(1rem, 3vw, 3rem);

  @media (max-width: 768px) {
    height: 60vh;
    min-height: 500px;
  }
}

.course-hero__image-wrapper {
  position: absolute;
  top: -10%;
  left: 0;
  width: 100%;
  height: 120%;
  overflow: hidden;
}

.course-hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.course-hero__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%);
  padding: clamp(2rem, 4vw, 4rem);
}

.course-hero__quote {
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

// Main Content
.course-content {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 2rem clamp(1rem, 3vw, 3rem);
}

.course-content__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 4vw, 4rem);
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.course-content__items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.course-content__item {
  line-height: 1.8;
  color: var(--color-text, #333);
  position: relative;
  padding-left: 2.5rem;
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

.course-content__image {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  height: 100%;
}

.course-content__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 1rem;
}

.course-content__for-who {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.course-content__icon {
  font-size: clamp(3rem, 5vw, 4rem);
  color: $primary-color;
  opacity: 0.8;
}

.course-content__description {
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  line-height: 1.6;
  color: $primary-color;
  font-weight: 500;
}
</style>
