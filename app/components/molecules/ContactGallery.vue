<template>
  <div>
    <h2 class="contact-gallery__heading">{{ imagesHeader }}</h2>
    <div class="contact-gallery__images">
      <div
        v-for="(img, index) in images"
        :key="index"
        class="contact-gallery__image-wrapper"
        @click="openFullscreen(index)"
      >
        <div class="contact-gallery__image-container">
          <NuxtImg
            :src="img.src.replace('https://a.storyblok.com', '')"
            :alt="img.alt"
            format="webp"
            provider="storyblok"
            sizes="(max-width: 768px) 100vw, 33vw"
            width="400"
            height="300"
            class="contact-gallery__image"
            loading="eager"
            :fetchpriority="index === 0 ? 'high' : 'auto'"
          />
          <div class="contact-gallery__expand-btn">
            <button
              type="button"
              class="contact-gallery__expand-btn-inner"
              :aria-label="`Pokaż ${img.alt} w pełnym rozmiarze`"
              @click.stop="openFullscreen(index)"
            >
              <Icon name="mdi:plus" size="24" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Fullscreen modal -->
    <Teleport to="body">
      <Transition name="fullscreen">
        <div
          v-if="fullscreenIndex !== null && images[fullscreenIndex]"
          class="contact-gallery__fullscreen"
          @click="closeFullscreen"
        >
          <button
            type="button"
            class="contact-gallery__close-btn"
            aria-label="Zamknij"
            @click="closeFullscreen"
          >
            <Icon name="mdi:close" size="32" />
          </button>
          <div
            ref="fullscreenContentRef"
            class="contact-gallery__fullscreen-content"
            @click.stop
          >
            <NuxtImg
              provider="storyblok"
              :src="
                (images[fullscreenIndex]?.src || '').replace(
                  'https://a.storyblok.com',
                  '',
                )
              "
              :alt="images[fullscreenIndex]?.alt ?? ''"
              width="1920"
              height="1280"
              quality="80"
              format="webp"
              class="contact-gallery__fullscreen-image"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
interface GalleryImage {
  src: string;
  alt: string;
}

defineProps<{
  images: GalleryImage[];
  imagesHeader?: string;
}>();

const { $gsap } = useNuxtApp() as any;
const { state } = useAppStore();
const fullscreenIndex = ref<number | null>(null);
const fullscreenContentRef = ref<HTMLElement | null>(null);

const openFullscreen = (index: number) => {
  const imageElement = document.querySelectorAll('.contact-gallery__image-container')[
    index
  ];
  const rect = imageElement?.getBoundingClientRect();

  fullscreenIndex.value = index;
  document.body.style.overflow = 'hidden';

  nextTick(() => {
    if (fullscreenContentRef.value && rect) {
      const scaleX = rect.width / window.innerWidth;
      const scaleY = rect.height / window.innerHeight;
      const translateX = rect.left + rect.width / 2 - window.innerWidth / 2;
      const translateY = rect.top + rect.height / 2 - window.innerHeight / 2;

      $gsap.fromTo(
        fullscreenContentRef.value,
        {
          x: translateX,
          y: translateY,
          scale: Math.max(scaleX, scaleY),
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
        },
      );
    }
  });
};

const closeFullscreen = () => {
  fullscreenIndex.value = null;
  document.body.style.overflow = '';
};

onMounted(() => {
  const wrappers = document.querySelectorAll('.contact-gallery__image-wrapper');

  // Wait for loader to finish before starting animations
  watch(
    () => state.animationsReady,
    (ready) => {
      if (!ready) return;

      wrappers.forEach((wrapper, index) => {
        const moveY = index === 0 ? -30 : index === 1 ? 25 : -20;
        const moveX = index === 0 ? 20 : index === 1 ? -30 : 15;

        $gsap.to(wrapper, {
          x: moveX,
          y: moveY,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top center',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    },
    { immediate: true },
  );
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';
});
</script>

<style scoped lang="scss">
.contact-gallery__heading {
  font-size: 3.6rem;
  font-weight: 700;
  color: $primary-color;
  margin: 0 0 4rem;
  rotate: -8deg;

  @include max-width-md {
    font-size: 2.8rem;
    margin: 0 0 3rem;
    text-align: center;
    rotate: 0deg;
  }
}

.contact-gallery__images {
  position: relative;
  min-height: 60rem;

  @include max-width-lg {
    min-height: 50rem;
  }

  @include max-width-md {
    min-height: 45rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.contact-gallery__image-wrapper {
  position: absolute;
  will-change: transform;

  &:nth-child(1) {
    top: 0;
    left: 5%;
    rotate: -8deg;
    z-index: 1;
  }

  &:nth-child(2) {
    top: 10%;
    right: 0;
    rotate: 5deg;
    z-index: 2;
  }

  &:nth-child(3) {
    bottom: 10%;
    left: 15%;
    rotate: -3deg;
    z-index: 3;
  }

  @include max-width-md {
    &:nth-child(1) {
      top: 0;
      left: 0;
      rotate: -5deg;
      z-index: 1;
    }

    &:nth-child(2) {
      top: 25%;
      right: 0;
      rotate: 3deg;
      z-index: 3;
    }

    &:nth-child(3) {
      top: 65%;
      left: 5%;
      rotate: -2deg;
      z-index: 2;
    }
  }
}

.contact-gallery__image-container {
  position: relative;
  overflow: hidden;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05) translateY(-5px);
    box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.3);

    .contact-gallery__expand-btn {
      transform: translate(-50%, -50%) scale(1.1);
    }
  }
}

.contact-gallery__image {
  display: block;
  width: 100%;
  height: auto;
  max-width: 35rem;
  border-radius: 1.2rem;

  @include max-width-md {
    max-width: 28rem;
  }
}

.contact-gallery__expand-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  border: 3px solid white;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  color: white;
  pointer-events: auto;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 0.6rem 1.6rem rgba(0, 0, 0, 0.8));
}

.contact-gallery__expand-btn-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  border-radius: 50%;

  &:focus-visible {
    outline: 3px solid rgba(255, 255, 255, 0.8);
    outline-offset: 2px;
  }
}

.contact-gallery__fullscreen {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  cursor: pointer;
}

.contact-gallery__close-btn {
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 2px solid white;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10000;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }
}

.contact-gallery__fullscreen-content {
  max-width: 90vw;
  max-height: 90vh;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-gallery__fullscreen-image {
  display: block;
  max-width: 90vw;
  max-height: 90vh;
  width: auto;
  height: auto;
  object-fit: contain;
}

.fullscreen-enter-active,
.fullscreen-leave-active {
  transition: opacity 0.3s ease;
}

.fullscreen-enter-from,
.fullscreen-leave-to {
  opacity: 0;
}
</style>
