<template>
  <section v-if="servicesContent" class="services">
    <MoleculesSectionIntroPanel
      :title="servicesContent.header"
      :intro="servicesContent.intro"
    />

    <div class="services__navigation" role="tablist" aria-label="Obszary pracy">
      <div class="services__nav-grid">
        <MoleculesPanelNavButton
          v-for="(service, index) in services"
          :key="service._uid"
          :index-label="formatNavIndex(index)"
          :title="service.title"
          :is-active="activeIndex === index"
          @click="changeService(index)"
        />
      </div>
    </div>

    <div class="services__content">
      <div class="services__text">
        <div class="services__clip">
          <div ref="heading" class="services__heading">
            <AtomsDecoratedHeading align="left">
              {{ currentService.title }}
            </AtomsDecoratedHeading>
          </div>
        </div>
        <div :key="activeIndex" class="services__description">
          <div class="services__clip services__clip--paragraphs">
            <div ref="paragraphContent" class="services__paragraphs">
              <p v-for="contentItem in currentService.content" :key="contentItem._uid">
                {{ contentItem.item }}
              </p>
            </div>
          </div>
          <div
            v-if="currentService.list?.length"
            class="services__clip services__clip--list"
          >
            <ul ref="listContent">
              <li v-for="listItem in currentService.list" :key="listItem._uid">
                {{ listItem.item }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div ref="imageWrapper" class="services__image">
        <NuxtImg
          :key="currentService._uid"
          ref="image"
          :src="currentService.image.filename"
          :alt="currentService.image.alt || currentService.title"
          format="webp"
          width="1280"
          height="1280"
          class="services__img"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SplitType from 'split-type';

const { servicesContent } = await useHelpContent();

const { $gsap } = useNuxtApp();

const services = computed(() => servicesContent.value?.list || []);

const activeIndex = ref(0);
const heading = ref<HTMLElement | null>(null);
const paragraphContent = ref<HTMLElement | null>(null);
const listContent = ref<HTMLUListElement | null>(null);
const imageWrapper = ref<HTMLElement | null>(null);
const image = ref<{ $el: HTMLElement } | HTMLElement | null>(null);
let splitInstance: SplitType | null = null;

const currentService = computed<ServiceItem>(() => services.value[activeIndex.value]!);
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
  padding: clamp(2rem, 4vw, 5rem) 0;
}

.services__navigation {
  margin: 0 auto 6rem;
  padding: 2rem;
}

.services__nav-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;
}

.services__content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
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
