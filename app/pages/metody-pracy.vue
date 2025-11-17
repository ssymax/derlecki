<template>
  <section class="methods">
    <MoleculesSectionIntroPanel title="METODY PRACY" :intro="panelIntro" />

    <div class="methods__layout">
      <div
        ref="methodsListRef"
        class="methods__list"
        role="tablist"
        aria-label="Metody pracy"
      >
        <MoleculesPanelNavButton
          v-for="(method, index) in methodsList"
          :key="method.id"
          variant="methods"
          :index-label="formatMethodIndex(index)"
          :title="method.name"
          :is-active="method.id === activeMethodId"
          @click="selectMethod(method.id)"
        />
      </div>

      <div class="methods__details">
        <article v-if="activeMethod" :key="activeMethod.id" class="methods__details-card">
          <header class="methods__details-header">
            <div ref="detailsHeading" class="methods__details-heading">
              <AtomsDecoratedHeading align="right">
                {{ activeMethod.name }}
              </AtomsDecoratedHeading>
            </div>
            <p ref="detailsLead" class="methods__details-lead">
              {{ activeMethod.shortDescription }}
            </p>
          </header>

          <div class="methods__details-body">
            <div class="methods__details-text">
              <p ref="detailsDescription">
                {{ activeMethod.description }}
              </p>

              <div
                v-if="activeMethod.techniques?.length"
                class="methods__details-section"
              >
                <p class="methods__section-label">Techniki i narzędzia</p>
                <ul ref="techniquesList">
                  <li v-for="technique in activeMethod.techniques" :key="technique">
                    {{ technique }}
                  </li>
                </ul>
              </div>

              <div
                v-if="activeMethod.focusAreas?.length"
                class="methods__details-section"
              >
                <p class="methods__section-label">Obszary pracy</p>
                <ul ref="focusList">
                  <li v-for="area in activeMethod.focusAreas" :key="area">
                    {{ area }}
                  </li>
                </ul>
              </div>
            </div>

            <div ref="imageWrapper" class="methods__details-image">
              <NuxtImg
                :src="activeMethodImage"
                :alt="activeMethod.name"
                width="800"
                height="1000"
                format="webp"
                class="methods__img"
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

const { $gsap, $ScrollTrigger } = useNuxtApp();

const methodsIntro = methods.intro;
const methodsList = methods.methods;
const panelIntro = methodsIntro;
const methodImages: Record<string, string> = {
  'terapia-manualna': '/img/o-mnie.jpg',
  'igloterapia-sucha': '/img/o-mnie-2.jpg',
  akupunktura: '/img/o-mnie-2.jpg',
  'rehabilitacja-ruchowa': '/img/o-mnie.jpg',
  'fizjoterapia-stomatologiczna': '/img/o-mnie-2.jpg',
  'terapia-wisceralna': '/img/o-mnie.jpg',
  klawiterapia: '/img/o-mnie-2.jpg',
  kinesiotaping: '/img/o-mnie.jpg',
  default: '/img/o-mnie.jpg',
};

type MethodItem = (typeof methodsList)[number];

const activeMethodId = ref(methodsList[0]?.id ?? '');

const activeMethod = computed<MethodItem | null>(() => {
  if (!methodsList.length) return null;
  return (
    methodsList.find((method) => method.id === activeMethodId.value) ||
    methodsList[0] ||
    null
  );
});

const selectMethod = (methodId: string) => {
  if (methodId === activeMethodId.value) return;
  activeMethodId.value = methodId;
};

const formatMethodIndex = (index: number) => `${String(index + 1).padStart(2, '0')}.`;
const activeMethodImage = computed(
  () => methodImages[activeMethodId.value] ?? methodImages.default,
);

const detailsHeading = ref<HTMLElement | null>(null);
const detailsLead = ref<HTMLElement | null>(null);
const detailsDescription = ref<HTMLElement | null>(null);
const techniquesList = ref<HTMLUListElement | null>(null);
const focusList = ref<HTMLUListElement | null>(null);
const imageWrapper = ref<HTMLElement | null>(null);
const methodsListRef = ref<HTMLElement | null>(null);
let splitInstance: SplitType | null = null;
let buttonFloatTween: ReturnType<typeof $gsap.to> | null = null;

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
  animateList(focusList.value, 0.25);

  if (imageWrapper.value) {
    tl.fromTo(
      imageWrapper.value,
      { opacity: 0, y: 25, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
      0.15,
    );
  }
};

const triggerDetailsAnimation = () => {
  nextTick(() => {
    animateDetails();
  });
};

const setupButtonFloatScrollTrigger = () => {
  if (buttonFloatTween) {
    buttonFloatTween.kill();
    buttonFloatTween = null;
  }

  if (!$gsap || !$ScrollTrigger || !methodsListRef.value) return;

  $gsap.set(methodsListRef.value, { y: 0 });

  buttonFloatTween = $gsap.to(methodsListRef.value, {
    y: 100,
    ease: 'none',
    scrollTrigger: {
      trigger: methodsListRef.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

onMounted(() => {
  triggerDetailsAnimation();
  nextTick(() => {
    if ($gsap && $ScrollTrigger) {
      $gsap.registerPlugin($ScrollTrigger);
    }
    setupButtonFloatScrollTrigger();
  });
});

watch(activeMethodId, () => {
  triggerDetailsAnimation();
});

onBeforeUnmount(() => {
  if (splitInstance) {
    splitInstance.revert();
  }
  if (buttonFloatTween) {
    buttonFloatTween.kill();
    buttonFloatTween = null;
  }
});
</script>

<style scoped lang="scss">
@use 'sass:color';

.methods {
  min-height: 100vh;
  padding: clamp(2rem, 4vw, 5rem) 0;
}

.methods__layout {
  display: grid;
  grid-template-columns: minmax(0, 42rem) minmax(0, 1fr);
  gap: 4rem;
}

.methods__list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.methods__details {
  position: relative;
}

.methods__details-card {
  background: #fff;
  border-radius: 2rem;
  padding: 3rem;
}

.methods__details-header {
  margin-bottom: 2rem;

  :deep(.decorated-heading) {
    margin-bottom: 1.5rem;
  }
}

.methods__details-lead {
  font-size: 1.6rem;
  color: #555;
  line-height: 1.6;
}

.methods__details-body {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(24rem, 0.9fr);
  gap: 2.5rem;
  align-items: stretch;
}

.methods__details-text {
  font-size: 1.7rem;
  color: #292929;
  line-height: 1.7;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.methods__details-section {
  margin-top: 2.5rem;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 1rem;
  }

  li {
    position: relative;
    padding-left: 2.4rem;
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

.methods__section-label {
  font-weight: 600;
  font-size: 1.4rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(#000, 0.6);
  margin-bottom: 1.2rem;
}

.methods__details-image {
  border-radius: 1.5rem;
  overflow: hidden;
  min-height: 28rem;
  box-shadow: 0 2rem 3rem rgba(0, 0, 0, 0.1);
}

.methods__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 1024px) {
  .methods__layout {
    grid-template-columns: 1fr;
  }

  .methods__list-item {
    padding: 1.5rem;
  }

  .methods__details-body {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .methods__details-card {
    padding: 2rem;
  }

  .methods__list-item {
    border-radius: 1rem;
  }

  .methods__details-image {
    min-height: 22rem;
  }
}
</style>
