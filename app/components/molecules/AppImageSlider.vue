<template>
  <div class="slider-wrapper">
    <div class="slider">
      <div
        v-for="(img, index) in images"
        :key="index"
        :ref="(el) => setSlideRef(el, index)"
        class="slider__slide"
        :class="{ 'slider__slide--active': currentSlide === index }"
      >
        <NuxtImg
          :src="img.src"
          :alt="img.alt"
          format="webp"
          :width="imageWidth"
          :height="imageHeight"
          class="slider__img"
        />
      </div>
      <div ref="navRef" class="slider__nav">
        <button
          type="button"
          class="slider__nav-item slider__nav-item--control"
          :aria-label="isPaused ? 'Wznów pokaz slajdów' : 'Zatrzymaj pokaz slajdów'"
          @click="togglePause"
        >
          <Icon :name="isPaused ? 'mdi:play' : 'mdi:pause'" size="20" />
        </button>
        <button
          v-for="(img, index) in images"
          :key="`nav-${index}`"
          type="button"
          class="slider__nav-item"
          :class="{ 'slider__nav-item--active': currentSlide === index }"
          :aria-label="`Przejdź do zdjęcia ${index + 1}`"
          @click="goToSlide(index)"
        >
          {{ index + 1 }}
        </button>
      </div>
      <div class="slider__progress-bar">
        <div class="slider__progress-fill" :style="{ width: progress + '%' }" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SliderImage {
  src: string;
  alt: string;
}

const props = withDefaults(
  defineProps<{
    images: SliderImage[];
    imageWidth?: number;
    imageHeight?: number;
    slideDuration?: number;
  }>(),
  {
    imageWidth: 1920,
    imageHeight: 1280,
    slideDuration: 8000,
  },
);

const { $gsap, $ScrollTrigger } = useNuxtApp();

const currentSlide = ref(0);
const isTransitioning = ref(false);
const isPaused = ref(false);
const progressData = reactive({ value: 0 });
const progress = computed(() => progressData.value);
const slideRefs = ref<HTMLElement[]>([]);
const navRef = ref<HTMLElement | null>(null);
let progressTween: ReturnType<typeof $gsap.to> | null = null;
let autoplayCall: ReturnType<typeof $gsap.delayedCall> | null = null;
let scrollTrigger: ReturnType<typeof $ScrollTrigger.create> | null = null;

const setSlideRef = (el: Element | ComponentPublicInstance | null, index: number) => {
  if (el && el instanceof HTMLElement) {
    slideRefs.value[index] = el;
  }
};

const transitionToSlide = (targetIndex: number, isAutoAdvance = false) => {
  if (isTransitioning.value) return;
  isTransitioning.value = true;
  const prevIndex = currentSlide.value;
  stopAutoplay();
  progressData.value = 0;

  const direction = targetIndex > prevIndex ? 1 : -1;

  const tl = $gsap.timeline({
    onComplete: () => {
      if (slideRefs.value[prevIndex]) {
        slideRefs.value[prevIndex].style.display = 'none';
      }
      isTransitioning.value = false;
      startAutoplay();
    },
  });

  if (slideRefs.value[targetIndex]) {
    slideRefs.value[targetIndex].style.display = 'block';
  }

  currentSlide.value = targetIndex;

  nextTick(() => {
    if (slideRefs.value[targetIndex] && slideRefs.value[prevIndex]) {
      $gsap.set(slideRefs.value[targetIndex], {
        x: 100 * direction + '%',
        zIndex: 2,
        filter: 'blur(0px)',
      });
      $gsap.set(slideRefs.value[prevIndex], {
        x: '0%',
        zIndex: 1,
        filter: 'blur(0px)',
        display: 'block',
      });

      tl.to(
        slideRefs.value[targetIndex],
        { x: '0%', duration: 1, ease: 'power3.out' },
        0,
      );

      tl.to(
        slideRefs.value[prevIndex],
        {
          x: isAutoAdvance ? '-5%' : 20 * direction + '%',
          filter: 'blur(10px)',
          duration: 1.5,
          ease: 'power1.out',
        },
        0,
      );
    }
  });
};

const goToSlide = (index: number) => {
  if (index === currentSlide.value) return;
  transitionToSlide(index);
};

const nextSlide = () => {
  const nextIndex = (currentSlide.value + 1) % props.images.length;
  transitionToSlide(nextIndex, true);
};

const startAutoplay = () => {
  if (props.images.length <= 1) return;

  // Clear any existing calls/tweens first
  if (autoplayCall) {
    autoplayCall.kill();
    autoplayCall = null;
  }
  if (progressTween) {
    progressTween.kill();
    progressTween = null;
  }

  // Keep at 0 during blur animation (0.5s extra), then animate to 100
  progressData.value = 0;
  progressTween = $gsap.to(progressData, {
    value: 100,
    duration: props.slideDuration / 1000,
    ease: 'none',
    delay: 0.5,
  });

  autoplayCall = $gsap.delayedCall(props.slideDuration / 1000 + 0.5, nextSlide);
};
const stopAutoplay = () => {
  if (autoplayCall) {
    autoplayCall.kill();
    autoplayCall = null;
  }
  if (progressTween) {
    progressTween.kill();
    progressTween = null;
  }
  progressData.value = 0;
};

const togglePause = () => {
  isPaused.value = !isPaused.value;

  if (isPaused.value) {
    autoplayCall?.pause();
    progressTween?.pause();
  } else if (!isTransitioning.value) {
    progressTween?.resume();
    autoplayCall?.resume();
  }
};

onMounted(() => {
  nextTick(() => {
    if (slideRefs.value[0]) {
      $gsap.set(slideRefs.value[0], { x: '0%' });
    }

    // Pin navigation on scroll
    if (navRef.value) {
      scrollTrigger = $ScrollTrigger.create({
        trigger: '.slider',
        start: 'top top',
        end: 'bottom top',
        pin: navRef.value,
        pinSpacing: false,
        invalidateOnRefresh: false,
      });
    }
  });
  startAutoplay();
});

onBeforeUnmount(() => {
  stopAutoplay();
  if (scrollTrigger) {
    scrollTrigger.kill();
  }
});
</script>

<style scoped lang="scss">
.slider-wrapper {
  width: 100%;
  margin: 0 auto;
  position: relative;
}

.slider {
  position: relative;
  width: 100%;
  max-width: 100%;
  aspect-ratio: 1920 / 1280;
  margin: 0 auto;
  overflow: hidden;
  box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.15);
  background: #f5f5f5;
}

.slider__slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  pointer-events: none;
  display: none;

  &--active {
    pointer-events: auto;
    display: block;
  }
}

.slider__img {
  display: block;
  max-width: 100%;
  height: auto;
}

.slider__nav {
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: flex;
  gap: 0.75rem;
  z-index: 10;
}

.slider__nav-item {
  min-width: 3.5rem;
  height: 3.5rem;
  padding: 0 1rem;
  border-radius: 0.5rem;
  border: 2px solid rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  color: #333;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
    border-color: rgba(255, 255, 255, 1);
    transform: translateY(-2px);
  }

  &--active {
    background: $primary-color;
    border-color: $primary-color;
    color: white;
  }
}

.slider__progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
  z-index: 10;
}

.slider__progress-fill {
  height: 100%;
  background: $primary-color;
  transition: width 0.05s linear;
}

@media (max-width: 1024px) {
  .slider__nav {
    top: 1.5rem;
    right: 1.5rem;
  }

  .slider__nav-item {
    min-width: 3rem;
    height: 3rem;
    font-size: 1.2rem;
  }
}

@media (max-width: 768px) {
  .slider__nav {
    top: 1rem;
    right: 1rem;
    gap: 0.5rem;
  }

  .slider__nav-item {
    min-width: 2.5rem;
    height: 2.5rem;
    font-size: 1.1rem;
  }
}
</style>
