<template>
  <section v-if="servicesContent" class="page">
    <MoleculesSectionIntroPanel
      :title="servicesContent.header"
      :intro="servicesContent.intro"
    />

    <div class="nav" role="tablist" aria-label="Obszary pracy">
      <div class="nav__grid">
        <MoleculesPanelNavButton
          v-for="(service, index) in services"
          :key="service._uid"
          :index-label="formatNavIndex(index)"
          :title="service.title"
          :icon="getServiceIcon(index)"
          :is-active="activeIndex === index"
          :id="getServiceTabId(service, index)"
          :aria-controls="getServicePanelId(service, index)"
          @click="changeService(index)"
        />
      </div>
    </div>

    <div
      class="content"
      role="tabpanel"
      :id="getServicePanelId(currentService, activeIndex)"
      :aria-labelledby="getServiceTabId(currentService, activeIndex)"
      tabindex="0"
    >
      <div class="text">
        <div class="clip">
          <div ref="heading" class="heading">
            <AtomsDecoratedHeading align="left">
              {{ currentService.title }}
            </AtomsDecoratedHeading>
          </div>
        </div>
        <div :key="activeIndex" class="description">
          <div class="clip clip--p">
            <div ref="paragraphContent" class="paragraphs">
              <template v-if="[0, 2, 3].includes(activeIndex)">
                <p v-if="currentService.content[0]">
                  {{ currentService.content[0].item }}
                </p>
              </template>
              <template v-else>
                <p v-for="contentItem in currentService.content" :key="contentItem._uid">
                  {{ contentItem.item }}
                </p>
              </template>
            </div>
          </div>
          <div v-if="currentService.list?.length" class="clip clip--list">
            <ul ref="listContent">
              <li v-for="listItem in currentService.list" :key="listItem._uid">
                {{ listItem.item }}
              </li>
            </ul>
          </div>
          <div
            v-if="currentService.content[1] && [0, 2, 3].includes(activeIndex)"
            class="clip clip--p clip--after"
          >
            <div ref="afterListContent" class="paragraphs">
              <p>{{ currentService.content[1].item }}</p>
            </div>
          </div>
        </div>
      </div>

      <div ref="imageWrapper" class="img-wrap">
        <NuxtImg
          :key="currentService._uid"
          ref="image"
          :src="currentService.image.filename"
          :alt="currentService.image.alt || currentService.title"
          format="webp"
          width="1280"
          height="1280"
          class="img"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SplitType from 'split-type';
const { $gsap } = useNuxtApp() as any;
useSeoMeta({
  title: 'W czym mogę pomóc',
  description:
    'Profesjonalne usługi fizjoterapeutyczne w Olsztynie: terapia manualna, rehabilitacja ortopedyczna, sportowa, pooperacyjna i neurologiczna. Indywidualne podejście do każdego pacjenta.',
  ogImage: '/img/og-image.jpg',
});

const { servicesContent } = useHelpContent();

const lenis = useLenisState();

const services = computed(() => servicesContent.value?.list || []);

const getServiceIcon = (index: number) => serviceIcons[index] || '';
const getServiceTabId = (service: ServiceItem, index: number) =>
  `service-tab-${service?._uid || index}`;
const getServicePanelId = (service: ServiceItem, index: number) =>
  `service-panel-${service?._uid || index}`;

const activeIndex = ref(0);
const heading = ref<HTMLElement | null>(null);
const paragraphContent = ref<HTMLElement | null>(null);
const afterListContent = ref<HTMLElement | null>(null);
const listContent = ref<HTMLUListElement | null>(null);
const imageWrapper = ref<HTMLElement | null>(null);
const image = ref<{ $el: HTMLElement } | HTMLElement | null>(null);
let splitInstance: SplitType | null = null;
let afterListSplitInstance: SplitType | null = null;

const currentService = computed(() => services.value[activeIndex.value] as ServiceItem);
const formatNavIndex = (index: number) => `${String(index + 1).padStart(2, '0')}.`;
const getImageEl = () =>
  (image.value && '$el' in image.value
    ? image.value.$el
    : image.value) as HTMLElement | null;
const getListItems = () =>
  listContent.value ? (Array.from(listContent.value.children) as HTMLElement[]) : [];

const scrollToContent = () => {
  if (window.innerWidth <= 768 && heading.value) {
    if (lenis.value) {
      lenis.value.scrollTo(heading.value, {
        offset: -100,
        duration: 1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  }
};

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
      // Clean up split instances
      if (splitInstance) {
        splitInstance.revert();
        splitInstance = null;
      }
      if (afterListSplitInstance) {
        afterListSplitInstance.revert();
        afterListSplitInstance = null;
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

        // Animate after-list content if exists
        if (afterListContent.value && [0, 2, 3].includes(index)) {
          afterListSplitInstance = new SplitType(afterListContent.value, {
            types: 'lines',
          });
          if (afterListSplitInstance.lines) {
            tlIn.fromTo(
              afterListSplitInstance.lines,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' },
              0.4,
            );
          }
        }

        // Scroll to content on mobile
        scrollToContent();
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

const { state } = useAppStore();

onMounted(() => {
  // Set initial states
  if (paragraphContent.value) {
    splitInstance = new SplitType(paragraphContent.value, { types: 'lines' });
    if (splitInstance.lines) {
      $gsap.set(splitInstance.lines, { opacity: 0, y: 20 });
    }
  }
  if (heading.value) {
    $gsap.set(heading.value, { opacity: 0, y: 20 });
  }
  const initialListItems = getListItems();
  if (initialListItems.length) {
    $gsap.set(initialListItems, { opacity: 0, y: 20 });
  }
  const initialImageEl = getImageEl();
  if (initialImageEl) {
    $gsap.set(initialImageEl, { opacity: 0, y: -30 });
  }

  // Wait for loader to finish before starting animations
  watch(
    () => state.animationsReady,
    (ready) => {
      if (!ready) return;

      if (splitInstance?.lines) {
        $gsap.to(splitInstance.lines, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power2.out',
          delay: 0.5,
        });
      }

      if (heading.value) {
        $gsap.to(heading.value, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        });
      }

      const initialListItems = getListItems();
      if (initialListItems.length) {
        $gsap.to(initialListItems, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
          delay: 0.6,
        });
      }

      const initialImageEl = getImageEl();
      if (initialImageEl) {
        $gsap.to(initialImageEl, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.3,
        });
      }

      // Animate after-list content if exists
      if (afterListContent.value && [0, 2, 3].includes(activeIndex.value)) {
        afterListSplitInstance = new SplitType(afterListContent.value, {
          types: 'lines',
        });
        if (afterListSplitInstance.lines) {
          $gsap.set(afterListSplitInstance.lines, { opacity: 0, y: 20 });
          $gsap.to(afterListSplitInstance.lines, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out',
            delay: 0.7,
          });
        }
      }
    },
    { immediate: true },
  );
});

onBeforeUnmount(() => {
  if (splitInstance) {
    splitInstance.revert();
  }
  if (afterListSplitInstance) {
    afterListSplitInstance.revert();
  }
});
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  @include px-to-vw(padding-top, 20);
}

.nav {
  @include px-to-vw(margin-bottom, 60);
  @include px-to-vw(padding, 20);
}

.nav__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  @include px-to-vw(gap, 50);
}

.clip {
  position: relative;
  overflow: hidden;

  &--p {
    margin-bottom: 1.5rem;
  }

  &--list {
    margin-top: 1rem;
  }

  &--after {
    margin-top: 1.5rem;
  }

  > * {
    position: relative;
  }
}

.heading {
  font-size: 3rem;
  font-weight: 700;
  color: $primary-color;
  margin-bottom: 2rem;
}

.description {
  ul {
    margin-left: 0;
    padding-left: 0;
    list-style: none;
  }

  li {
    position: relative;
    @include px-to-vw(padding-left, 25);
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
}

.img-wrap {
  height: 70vh;
  overflow: hidden;
  will-change: transform;
  border-radius: 1.2rem;
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: transform;
}

@include max-width-lg {
  .content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .nav {
    padding: 1.5rem;
  }

  .nav__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .img-wrap {
    height: 50vh;
  }

  .heading {
    font-size: 2.5rem;
  }
}

@include max-width-md {
  .page {
    padding: 1rem;
  }

  .nav {
    padding: 1.25rem;
    margin-bottom: 2rem;
  }

  .nav__grid {
    grid-template-columns: 1fr;
  }

  .heading {
    font-size: 2rem;
  }

  .description li {
    padding-left: 2.4rem;

    &::before {
      left: 0.4rem;
    }
  }
}
</style>
