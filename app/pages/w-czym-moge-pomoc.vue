<template>
  <section class="services">
    <div v-if="panelIntro.length" class="services__panel-intro">
      <p v-for="(paragraph, idx) in panelIntro" :key="`intro-${idx}`">
        {{ paragraph }}
      </p>
    </div>

    <div class="services__navigation" role="tablist" aria-label="Obszary pracy">
      <div class="services__nav-grid">
        <button
          v-for="(service, index) in services"
          :key="index"
          type="button"
          :class="[
            'services__nav-item',
            { 'services__nav-item--active': activeIndex === index },
          ]"
          :aria-pressed="activeIndex === index"
          @click="changeService(index)"
        >
          <span class="services__nav-index">{{ formatNavIndex(index) }}</span>
          <span class="services__nav-divider" aria-hidden="true" />
          <span class="services__nav-text">
            <span class="services__nav-title">{{ service.title }}</span>
          </span>
          <span class="services__nav-arrow" aria-hidden="true">↓</span>
        </button>
      </div>
    </div>

    <div class="services__content">
      <div class="services__text">
        <div class="services__clip">
          <div ref="heading" class="services__heading">
            <AtomsAppDecoratedHeading align="left">
              {{ currentService.title }}
            </AtomsAppDecoratedHeading>
          </div>
        </div>
        <div :key="activeIndex" class="services__description">
          <div class="services__clip services__clip--paragraphs">
            <div ref="paragraphContent" class="services__paragraphs">
              <p v-for="(paragraph, idx) in currentService.content" :key="idx">
                {{ paragraph }}
              </p>
            </div>
          </div>
          <div v-if="currentService.list" class="services__clip services__clip--list">
            <ul ref="listContent">
              <li v-for="(item, idx) in currentService.list" :key="idx">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div ref="imageWrapper" class="services__image">
        <NuxtImg
          ref="image"
          :src="currentService.image"
          :alt="currentService.title"
          format="webp"
          width="800"
          height="1000"
          class="services__img"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SplitType from 'split-type';

const { $gsap } = useNuxtApp();

const panelIntro = help.panel.intro;
const services: HelpService[] = help.services;

const activeIndex = ref(0);
const heading = ref<HTMLElement | null>(null);
const paragraphContent = ref<HTMLElement | null>(null);
const listContent = ref<HTMLUListElement | null>(null);
const imageWrapper = ref<HTMLElement | null>(null);
const image = ref<{ $el: HTMLElement } | HTMLElement | null>(null);
let splitInstance: SplitType | null = null;

const currentService = computed<HelpService>(() => services[activeIndex.value]!);
const formatNavIndex = (index: number) => `${String(index + 1).padStart(2, '0')}.`;
const getImageEl = () =>
  (image.value && '$el' in image.value
    ? image.value.$el
    : image.value) as HTMLElement | null;
const getListItems = () =>
  listContent.value ? (Array.from(listContent.value.children) as HTMLElement[]) : [];

const changeService = (index: number) => {
  if (
    index === activeIndex.value ||
    !paragraphContent.value ||
    !heading.value ||
    !image.value
  )
    return;

  const wrapperEl = imageWrapper.value;
  const currentImageEl = getImageEl();
  const currentListItems = getListItems();

  // Create timeline for out animation
  const tl = $gsap.timeline({
    onComplete: () => {
      // Clean up split instance
      if (splitInstance) {
        splitInstance.revert();
        splitInstance = null;
      }

      // Update active index
      activeIndex.value = index;

      // Wait for next tick and animate in
      nextTick(() => {
        const wrapperInEl = imageWrapper.value;
        const newImageEl = getImageEl();
        const newListItems = getListItems();

        if (wrapperInEl) {
          $gsap.set(wrapperInEl, { y: -30 });
        }

        if (newImageEl) {
          $gsap.set(newImageEl, {
            y: -60,
            opacity: 0,
          });
        }

        // Split new content
        if (paragraphContent.value) {
          splitInstance = new SplitType(paragraphContent.value, { types: 'lines' });
        }

        // Animate in new content
        const tlIn = $gsap.timeline();

        if (heading.value) {
          tlIn.fromTo(
            heading.value,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            0,
          );
        }

        if (wrapperInEl) {
          tlIn.to(wrapperInEl, { y: 0, duration: 0.6, ease: 'power3.out' }, 0.15);
        }

        if (newImageEl) {
          tlIn.to(
            newImageEl,
            { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
            0.15,
          );
        }

        if (splitInstance?.lines) {
          tlIn.fromTo(
            splitInstance.lines,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' },
            0.3,
          );
        }

        if (newListItems.length) {
          $gsap.set(newListItems, { opacity: 0, y: 20 });
          tlIn.to(
            newListItems,
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.05,
              ease: 'power2.out',
            },
            0.35,
          );
        }
      });
    },
  });

  // Animate out current content
  if (splitInstance?.lines) {
    tl.to(
      splitInstance.lines,
      {
        opacity: 0,
        y: -20,
        duration: 0.4,
        stagger: 0.03,
        ease: 'power2.in',
      },
      0,
    );
  }

  if (currentListItems.length) {
    tl.to(
      currentListItems,
      {
        opacity: 0,
        y: -10,
        duration: 0.3,
        stagger: 0.04,
        ease: 'power2.in',
      },
      0,
    );
  }

  if (heading.value) {
    tl.to(heading.value, { opacity: 0, y: -20, duration: 0.3, ease: 'power2.in' }, 0);
  }

  if (currentImageEl) {
    tl.to(
      currentImageEl,
      {
        y: 60,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      },
      0,
    );
  }

  if (wrapperEl) {
    tl.to(
      wrapperEl,
      {
        y: 30,
        duration: 0.5,
        ease: 'power2.inOut',
      },
      0,
    );
  }
};

onMounted(() => {
  if (paragraphContent.value) {
    splitInstance = new SplitType(paragraphContent.value, { types: 'lines' });
    $gsap.from(splitInstance.lines, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.05,
      ease: 'power2.out',
      delay: 0.5,
    });
  }

  if (heading.value) {
    $gsap.from(heading.value, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
    });
  }

  const initialListItems = getListItems();
  if (initialListItems.length) {
    $gsap.from(initialListItems, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power2.out',
      delay: 0.6,
    });
  }

  const initialImageEl = getImageEl();
  if (initialImageEl) {
    $gsap.from(initialImageEl, {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.3,
    });
  }
});

onBeforeUnmount(() => {
  if (splitInstance) {
    splitInstance.revert();
  }
});

</script>

<style scoped lang="scss">
@use 'sass:color';
.services {
  min-height: 100vh;
}

.services__navigation {
  margin: 0 auto 4rem;
  padding: 2rem;
  border-radius: 2rem;
  border: 1px solid rgba($primary-color, 0.15);
  background: rgba($primary-color, 0.04);
}

.services__nav-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;
}

.services__nav-item {
  display: grid;
  grid-template-columns: auto 1px 1fr auto;
  gap: 1.5rem;
  align-items: center;
  padding: 1.5rem;
  border: 1px solid rgba($primary-color, 0.2);
  border-radius: 1.5rem;
  background: white;
  color: #1f1f1f;
  text-align: left;
  transition: all 0.3s ease;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: rgba($primary-color, 0.5);
    transform: translateY(6px);
  }

  &--active {
    background: $primary-color;
    color: white;
    border-color: $primary-color;
    box-shadow: 0 1.5rem 3rem rgba($primary-color, 0.25);

    .services__nav-divider {
      background: rgba(255, 255, 255, 0.5);
    }

    .services__nav-arrow {
      color: white;
      transform: translateY(0.4rem);
    }

  }
}

.services__nav-index {
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba($primary-color, 0.8);

  .services__nav-item--active & {
    color: rgba(255, 255, 255, 0.9);
  }
}

.services__nav-divider {
  width: 1px;
  height: 100%;
  background: rgba($primary-color, 0.2);
}

.services__nav-text {
  display: flex;
  flex-direction: column;
}

.services__nav-title {
  font-weight: 600;
  font-size: 1.6rem;
  color: inherit;
}

.services__nav-arrow {
  font-size: 2rem;
  color: rgba($primary-color, 0.4);
  transition: transform 0.3s ease, color 0.3s ease;
}

.services__content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.services__panel-intro {
  @include px-to-vw(margin-bottom, 50);
  @include px-to-vw(font-size, 28);
  color: #555;
  line-height: 1.7;
  text-align: center;
  font-style: italic;
  p {
    margin-bottom: 0.75rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.services__clip {
  position: relative;
  overflow: hidden;
}

.services__clip--paragraphs {
  margin-bottom: 1.5rem;
}

.services__clip--list {
  margin-top: 1rem;
}

.services__clip > * {
  position: relative;
}

.services__heading {
  font-size: 3rem;
  font-weight: 700;
  color: $primary-color;
  margin-bottom: 2rem;
}

.services__description {
  line-height: 1.8;
  color: #333;

  p {
    margin-bottom: 1.5rem;
  }

  ul {
    margin-left: 0;
    padding-left: 0;
    list-style: none;
  }

  li {
    position: relative;
    padding-left: 2.5rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;

    &::before {
      content: '✦';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.2rem;
      color: $primary-color;
      opacity: 0.6;
    }
  }
}

.services__image {
  height: 70vh;
  border-radius: 0.5rem;
  overflow: hidden;
  will-change: transform;
}

.services__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: transform;
}

@media (max-width: 1024px) {
  .services__content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .services__navigation {
    padding: 1.5rem;
  }

  .services__nav-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .services__image {
    height: 50vh;
  }

  .services__heading {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .services {
    padding: 1rem;
  }

  .services__navigation {
    padding: 1.25rem;
    margin-bottom: 2rem;
  }

  .services__nav-grid {
    grid-template-columns: 1fr;
  }

  .services__nav-item {
    padding: 1.25rem;
    grid-template-columns: auto 1px minmax(0, 1fr) auto;
  }

  .services__heading {
    font-size: 2rem;
  }

  .services__description {
    font-size: 1rem;
  }
}
</style>
