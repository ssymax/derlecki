<template>
  <div>
    <h2 class="contact-gallery__heading">Tu mnie znajdziesz</h2>
    <div class="contact-gallery">
      <!-- Left side: Scattered images -->
      <div class="contact-gallery__images">
        <div
          v-for="(img, index) in images"
          :key="index"
          class="contact-gallery__image-wrapper"
          @click="openFullscreen(index)"
        >
          <div class="contact-gallery__image-container">
            <NuxtImg
              :src="img.src"
              :alt="img.alt"
              format="webp"
              width="400"
              height="300"
              class="contact-gallery__image"
            />
            <div
              class="contact-gallery__expand-btn"
              :aria-label="`Pokaż ${img.alt} w pełnym rozmiarze`"
            >
              <Icon name="mdi:plus" size="24" />
            </div>
          </div>
        </div>
      </div>

      <!-- Right side: Contact info -->
      <div class="contact-gallery__info">
        <h3 class="contact-gallery__name">Mateusz Derlecki<br />Fizjoterapia</h3>
        <a
          v-for="(contact, index) in contactItems"
          :key="index"
          :href="contact.href"
          :target="contact.newTab ? '_blank' : undefined"
          :rel="contact.newTab ? 'noreferrer noopener' : undefined"
          class="contact-gallery__link"
        >
          <span class="contact-gallery__icon">
            <Icon :name="contact.icon" size="32" />
          </span>
          <span>{{ contact.text }}</span>
        </a>
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
              :src="images[fullscreenIndex]?.src ?? ''"
              :alt="images[fullscreenIndex]?.alt ?? ''"
              format="webp"
              width="1920"
              height="1280"
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
}>();

const contactItems = [
  {
    icon: 'mdi:phone',
    href: `tel:${phoneNumber.replace(/\s+/g, '')}`,
    text: phoneNumber,
  },
  {
    icon: 'mdi:email-outline',
    href: `mailto:${emailAddress}`,
    text: emailAddress,
  },
  {
    icon: 'mdi:map-marker',
    href: directionsUrl,
    text: `${address.street}, ${address.city}`,
    newTab: true,
  },
  {
    icon: 'mdi:facebook',
    href: facebookUrl,
    text: 'Facebook',
    newTab: true,
  },
];

const { $gsap } = useNuxtApp();
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

  wrappers.forEach((wrapper, index) => {
    const moveY = index === 0 ? -30 : index === 1 ? 25 : -20;
    const moveX = index === 0 ? 20 : index === 1 ? -30 : 15;

    $gsap.fromTo(
      wrapper,
      { y: 0, x: 0 },
      {
        y: moveY,
        x: moveX,
        scrollTrigger: {
          trigger: wrapper,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      },
    );
  });
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';
});
</script>

<style scoped lang="scss">
.contact-gallery {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8rem;
  padding: 6rem 0;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 6rem;
    padding: 4rem 0;
  }
}

.contact-gallery__heading {
  font-size: 3.6rem;
  font-weight: 700;
  color: $primary-color;
  margin: 0 0 4rem;
  rotate: -8deg;

  @media (max-width: 768px) {
    font-size: 2.8rem;
    margin: 0 0 3rem;
  }
}

.contact-gallery__images {
  position: relative;
  min-height: 60rem;

  @media (max-width: 1024px) {
    min-height: 50rem;
  }

  @media (max-width: 768px) {
    min-height: 45rem;
  }
}

.contact-gallery__image-wrapper {
  position: absolute;

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

  @media (max-width: 768px) {
    &:nth-child(1) {
      top: 0;
      left: 0;
      rotate: -5deg;
      z-index: 1;
    }

    &:nth-child(2) {
      top: 20%;
      right: 5%;
      rotate: 3deg;
      z-index: 3;
    }

    &:nth-child(3) {
      bottom: 0;
      left: 10%;
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

  @media (max-width: 768px) {
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
  pointer-events: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 0.6rem 1.6rem rgba(0, 0, 0, 0.8));
}

.contact-gallery__info {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 2rem;

  @media (max-width: 768px) {
    gap: 2.5rem;
  }
}

.contact-gallery__name {
  font-size: 3.2rem;
  font-weight: 700;
  color: $primary-color;
  text-align: left;
  margin: 0 0 3rem;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 2.6rem;
    margin: 0 0 2.5rem;
  }
}

.contact-gallery__link {
  display: flex;
  align-items: center;
  gap: 2rem;
  font-size: 2.4rem;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    font-size: 2rem;
    gap: 1.5rem;
  }

  &:hover {
    color: $primary-color;

    .contact-gallery__icon {
      transform: scale(1.3);
    }
  }
}

.contact-gallery__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: $primary-color;
  flex-shrink: 0;
  transition: transform 0.3s ease;

  :deep(svg) {
    color: $primary-color;
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
}

.contact-gallery__fullscreen-image {
  display: block;
  width: 100%;
  height: 100%;
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
