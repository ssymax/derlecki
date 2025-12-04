<template>
  <section v-if="methodsContent" class="page">
    <MoleculesSectionIntroPanel
      :title="methodsContent.header"
      :intro="methodsContent.intro"
    />

    <div class="layout">
      <div ref="methodsListRef" class="list" role="tablist" aria-label="Metody pracy">
        <MoleculesPanelNavButton
          v-for="(method, index) in methodsList"
          :key="method._uid"
          variant="methods"
          :index-label="formatMethodIndex(index)"
          :title="method.name"
          :is-active="method._uid === activeMethodId"
          :id="getMethodTabId(method._uid, index)"
          :aria-controls="getMethodPanelId(method._uid, index)"
          @click="selectMethod(method._uid)"
        />
      </div>

      <div class="details">
        <article
          v-if="activeMethod"
          :key="activeMethod._uid"
          class="card"
          role="tabpanel"
          :id="getMethodPanelId(activeMethod._uid)"
          :aria-labelledby="getMethodTabId(activeMethod._uid)"
          tabindex="0"
        >
          <header class="header">
            <div ref="detailsHeading" class="heading">
              <AtomsDecoratedHeading align="right">
                {{ activeMethod.name }}
              </AtomsDecoratedHeading>
            </div>
            <p ref="detailsLead" class="lead">
              {{ activeMethod.short_description }}
            </p>
          </header>

          <div class="body">
            <div class="text">
              <p ref="detailsDescription">
                {{ activeMethod.description }}
              </p>

              <div v-if="activeMethod.list?.length" class="section">
                <ul ref="techniquesList">
                  <li v-for="listItem in activeMethod.list" :key="listItem._uid">
                    {{ listItem.item }}
                  </li>
                </ul>
              </div>
            </div>

            <div ref="imageWrapper" class="img-wrap">
              <NuxtImg
                :key="activeMethod._uid"
                :src="activeMethod.image.filename"
                :alt="activeMethod.image.alt || activeMethod.name"
                width="1024"
                height="1280"
                format="webp"
                class="img"
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SplitType from 'split-type';
import { useMethods } from '~/composables/useMethods';
const { $gsap } = useNuxtApp();

useSeoMeta({
  title: 'Metody pracy',
  description:
    'Nowoczesne metody fizjoterapeutyczne: NDT-Bobath, PNF, McKenzie, dry needling, terapia manualna Kaltenborna. Sprawdzone techniki leczenia w Olsztynie.',
  ogImage: '/img/og-image.jpg',
});

const { methodsContent } = useMethods();
const lenis = useLenisState();

const methodsList = computed(() => methodsContent.value?.methods_items || []);

const buildMethodId = (prefix: string, id: string, index?: number) =>
  `${prefix}-${id || (index ?? 0)}`;
const getMethodTabId = (id: string, index?: number) => buildMethodId('method-tab', id, index);
const getMethodPanelId = (id: string, index?: number) =>
  buildMethodId('method-panel', id, index);

const activeMethodId = ref(methodsList.value[0]?._uid ?? '');

const activeMethod = computed<MethodItem | null>(() => {
  if (!methodsList.value.length) return null;
  const found =
    methodsList.value.find((method) => method._uid === activeMethodId.value) ||
    methodsList.value[0] ||
    null;
  return found as unknown as MethodItem | null;
});

const scrollToContent = () => {
  if (window.innerWidth <= 768 && detailsHeading.value) {
    if (lenis.value) {
      lenis.value.scrollTo(detailsHeading.value, {
        offset: -100,
        duration: 1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  }
};

const selectMethod = (methodId: string) => {
  if (methodId === activeMethodId.value) return;
  activeMethodId.value = methodId;
  nextTick(() => {
    scrollToContent();
  });
};

const formatMethodIndex = (index: number) => `${String(index + 1).padStart(2, '0')}.`;

const detailsHeading = ref<HTMLElement | null>(null);
const detailsLead = ref<HTMLElement | null>(null);
const detailsDescription = ref<HTMLElement | null>(null);
const techniquesList = ref<HTMLUListElement | null>(null);
const imageWrapper = ref<HTMLElement | null>(null);
const methodsListRef = ref<HTMLElement | null>(null);
let splitInstance: SplitType | null = null;

const animateDetails = () => {
  if (!$gsap) return;

  if (splitInstance) {
    splitInstance.revert();
    splitInstance = null;
  }

  if (detailsDescription.value) {
    splitInstance = new SplitType(detailsDescription.value, { types: 'lines' });
  }

  const tl = $gsap.timeline();

  if (detailsHeading.value) {
    tl.fromTo(
      detailsHeading.value,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
      0,
    );
  }

  if (detailsLead.value) {
    tl.fromTo(
      detailsLead.value,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      0.05,
    );
  }

  if (splitInstance?.lines?.length) {
    tl.fromTo(
      splitInstance.lines,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: 'ease.out',
      },
      0.1,
    );
  }

  const animateList = (listEl: HTMLUListElement | null, startTime: number) => {
    if (!listEl) return;
    const items = Array.from(listEl.children) as HTMLElement[];
    if (!items.length) return;
    $gsap.set(items, { opacity: 0, y: 15 });
    tl.to(
      items,
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out',
      },
      startTime,
    );
  };

  animateList(techniquesList.value, 0.2);

  if (imageWrapper.value) {
    tl.fromTo(
      imageWrapper.value,
      { opacity: 0, y: 25, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
      0.15,
    );
  }
};

const { state } = useAppStore();

const triggerDetailsAnimation = () => {
  nextTick(() => {
    animateDetails();
  });
};

onMounted(() => {
  // Set initial states immediately to prevent flash
  if (detailsHeading.value) {
    $gsap.set(detailsHeading.value, { opacity: 0, y: 20 });
  }
  if (detailsLead.value) {
    $gsap.set(detailsLead.value, { opacity: 0, y: 15 });
  }
  if (detailsDescription.value) {
    // Split text first, then hide the lines
    splitInstance = new SplitType(detailsDescription.value, { types: 'lines' });
    if (splitInstance.lines) {
      $gsap.set(splitInstance.lines, { opacity: 0, y: 20 });
    }
  }
  if (imageWrapper.value) {
    $gsap.set(imageWrapper.value, { opacity: 0, y: 25, scale: 0.97 });
  }

  // Wait for loader to finish before starting animations
  watch(
    () => state.animationsReady,
    (ready) => {
      if (!ready) return;
      triggerDetailsAnimation();
    },
    { immediate: true },
  );
});

watch(activeMethodId, () => {
  triggerDetailsAnimation();
});

onBeforeUnmount(() => {
  if (splitInstance) {
    splitInstance.revert();
  }
});
</script>

<style scoped lang="scss">
@use 'sass:color';

.page {
  min-height: 100vh;
  @include px-to-vw(padding-top, 20);
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 42rem) minmax(0, 1fr);
  @include px-to-vw(gap, 40);
}

.list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  @include px-to-vw(padding-top, 100);
}

.details {
  position: relative;
}

.card {
  background: #fff;
  @include px-to-vw(padding, 30);
}

.header {
  margin-bottom: 2rem;

  :deep(.decorated-heading) {
    margin-bottom: 1.5rem;
  }
}

.lead {
  color: #555;
  line-height: 1.6;
}

.body {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(24rem, 0.9fr);
  @include px-to-vw(gap, 25);
  align-items: stretch;
}

.text {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.section {
  @include px-to-vw(margin-top, 25);

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 1rem;
  }

  li {
    position: relative;
    @include px-to-vw(padding-left, 24);
    color: #2f2f2f;
    font-size: 1.5rem;
    line-height: 1.5;

    &::before {
      content: '✦';
      position: absolute;
      left: 0;
      top: 0.2rem;
      color: color.adjust($primary-color, $lightness: 5%);
      opacity: 0.6;
      font-size: 1.2rem;
    }
  }
}

.img-wrap {
  overflow: hidden;
  min-height: 28rem;
  box-shadow: 0 2rem 3rem rgba(0, 0, 0, 0.1);
  border-radius: 1.2rem;
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@include max-width-lg {
  .layout {
    grid-template-columns: 1fr;
  }

  .body {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@include max-width-md {
  .card {
    padding: 0;
    background: transparent;
  }

  .section li {
    padding-left: 2.4rem;

    &::before {
      left: 0.4rem;
    }
  }
}

@include max-width-sm {
  .img-wrap {
    min-height: 22rem;
  }
}
</style>
