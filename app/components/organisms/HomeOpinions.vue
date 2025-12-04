<template>
  <section class="home__opinions">
    <AtomsDecoratedHeading>
      {{ slidesContent?.opinions?.opinions_subheader || 'Opinie' }}
    </AtomsDecoratedHeading>

    <div ref="sliderRef" class="home__opinions-slider">
      <div ref="trackRef" class="home__opinions-track">
        <div v-for="(opinion, index) in opinions" :key="index" class="home__opinion-card">
          <p class="home__opinion-description">
            {{ getTruncatedText(opinion.opinion) }}
            <button
              v-if="shouldTruncate(opinion.opinion)"
              class="home__opinion-more"
              @click="openModal(opinion)"
            >
              więcej
            </button>
          </p>
          <p class="home__opinion-author">— {{ opinion.author }}</p>
        </div>
      </div>
    </div>

    <div class="home__opinions-cta">
      <AtomsAppButton
        variant="primary"
        :href="slidesContent?.opinions?.reviews_url || 'https://www.google.com/maps'"
      >
        {{ slidesContent?.opinions?.reviews_button_label || 'Zobacz więcej' }}
      </AtomsAppButton>
    </div>

    <Teleport to="body">
      <Transition name="modal">
        <div v-if="selectedOpinion" class="opinion-modal" @click="closeModal">
          <div class="opinion-modal__content" @click.stop>
            <button class="opinion-modal__close" @click="closeModal">×</button>
            <p class="opinion-modal__text">{{ selectedOpinion.opinion }}</p>
            <p class="opinion-modal__author">— {{ selectedOpinion.author }}</p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
const { slidesContent } = useSlides();

// Duplicate opinions for infinite loop
const opinions = computed(() => {
  const items = slidesContent.value?.opinions?.opinions_items || [];
  return [...items, ...items];
});

const selectedOpinion = ref<OpinionItem | null>(null);

const MAX_LENGTH = 200;

const shouldTruncate = (text: string) => {
  return text.length > MAX_LENGTH;
};

const getTruncatedText = (text: string) => {
  if (text.length <= MAX_LENGTH) return text;
  return text.slice(0, MAX_LENGTH).trim() + '...';
};

const openModal = (opinion: OpinionItem) => {
  selectedOpinion.value = opinion;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  selectedOpinion.value = null;
  document.body.style.overflow = '';
};

const sliderRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);

const { $gsap } = useNuxtApp() as any;

onMounted(() => {
  if (trackRef.value && sliderRef.value && $gsap) {
    const track = trackRef.value;

    const trackWidth = track.scrollWidth / 2; // Half because duplicated
    const duration = trackWidth / 50;

    $gsap.set(track, { x: 0 });

    $gsap.to(track, {
      x: `-=${trackWidth * 2}`,
      duration: duration * 2,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: $gsap.utils.unitize((x: number) => x % trackWidth),
      },
    });
  }
});
</script>

<style scoped lang="scss">
@use 'sass:color';

.home__opinions {
  @include padding-style;
  padding-top: calc(100 / 1920 * 100vw);
  padding-bottom: calc(100 / 1920 * 100vw);
  margin-bottom: calc(100 / 1920 * 100vw);
  background: #fff;
  position: relative;

  @media (min-width: 1920px) {
    padding-top: 100px;
    padding-bottom: 100px;
    margin-bottom: 100px;
  }
}

.home__opinions-slider {
  overflow: hidden;
  margin: calc(80 / 1920 * 100vw) 0;

  @media (min-width: 1920px) {
    margin: 80px 0;
  }
}

.home__opinions-track {
  display: flex;
  gap: 2rem;
  width: fit-content;

  @media (min-width: 768px) {
    gap: calc(40 / 1920 * 100vw);
  }

  @media (min-width: 1920px) {
    gap: 40px;
  }
}

.home__opinion-card {
  flex: 0 0 auto;
  width: 85vw;
  padding: 3rem;
  background: #f8f8f8;
  border-radius: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 250px;

  @media (min-width: 768px) {
    width: calc(500 / 1920 * 100vw);
    padding: calc(40 / 1920 * 100vw);
  }

  @media (min-width: 1920px) {
    width: 500px;
    padding: 40px;
  }
}

.home__opinion-description {
  font-size: clamp(1.6rem, 2vw, 1.8rem);
  line-height: 1.6;
  margin-bottom: calc(24 / 1920 * 100vw);
  color: #333;

  @media (min-width: 1920px) {
    margin-bottom: 24px;
  }
}

.home__opinion-author {
  font-size: clamp(1.4rem, 1.8vw, 1.6rem);
  font-weight: 600;
  color: $primary-color;
}

.home__opinions-cta {
  text-align: center;
  margin-top: calc(60 / 1920 * 100vw);

  @media (min-width: 1920px) {
    margin-top: 60px;
  }
}

.home__opinion-more {
  background: none;
  border: none;
  color: #999;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-left: 0.5rem;
  font-size: inherit;
  transition: color 0.3s ease;

  &:hover {
    color: #666;
  }
}

.opinion-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 2rem;
}

.opinion-modal__content {
  background: #fff;
  padding: 4rem;
  border-radius: 1.2rem;
  max-width: 700px;
  width: 100%;
  position: relative;
  max-height: 80vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 3rem 2rem;
  }
}

.opinion-modal__close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  font-size: 3.6rem;
  cursor: pointer;
  color: #999;
  line-height: 1;
  padding: 0;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;

  &:hover {
    color: #333;
  }
}

.opinion-modal__text {
  font-size: clamp(1.6rem, 2vw, 1.8rem);
  line-height: 1.6;
  margin-bottom: 2.4rem;
  color: #333;
  padding-right: 3rem;
}

.opinion-modal__author {
  font-size: clamp(1.4rem, 1.8vw, 1.6rem);
  font-weight: 600;
  color: $primary-color;
  text-align: right;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .opinion-modal__content,
.modal-leave-active .opinion-modal__content {
  transition: transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .opinion-modal__content {
  transform: scale(0.9);
}

.modal-leave-to .opinion-modal__content {
  transform: scale(0.9);
}
</style>
