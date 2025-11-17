<template>
  <section class="methods">
    <div class="methods__panel">
      <div v-if="panelIntro.length" class="methods__panel-intro">
        <p v-for="(paragraph, idx) in panelIntro" :key="`methods-intro-${idx}`">
          {{ paragraph }}
        </p>
      </div>
    </div>

    <div class="methods__layout">
      <div
        ref="methodsListRef"
        class="methods__list"
        :class="{ 'methods__list--animated': buttonsAnimated }"
        role="tablist"
        aria-label="Metody pracy"
      >
        <button
          v-for="(method, index) in methodsList"
          :key="method.id"
          class="methods__list-item"
          :class="{ 'methods__list-item--active': method.id === activeMethodId }"
          type="button"
          :aria-pressed="method.id === activeMethodId"
          @click="selectMethod(method.id)"
        >
          <span class="methods__list-index">{{ formatMethodIndex(index) }}</span>
          <span class="methods__list-divider" aria-hidden="true" />
          <span class="methods__list-text">
            <span class="methods__list-name">{{ method.name }}</span>
          </span>
          <span class="methods__list-arrow" aria-hidden="true">→</span>
        </button>
      </div>

      <div class="methods__details">
        <article v-if="activeMethod" :key="activeMethod.id" class="methods__details-card">
          <header class="methods__details-header">
            <div ref="detailsHeading" class="methods__details-heading">
              <AtomsAppDecoratedHeading align="left">
                {{ activeMethod.name }}
              </AtomsAppDecoratedHeading>
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

const { $gsap } = useNuxtApp();

const methodsIntro = methods.intro;
const methodsList = methods.methods;
const panelIntro = Array.isArray(methodsIntro) ? methodsIntro : [methodsIntro];
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
const buttonsAnimated = ref(false);
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

const animateButtonsIntro = () => {
  if (!$gsap) return;
  nextTick(() => {
    if (!methodsListRef.value) return;
    const buttons = methodsListRef.value.querySelectorAll('.methods__list-item');
    if (!buttons.length) return;
    $gsap.fromTo(
      buttons,
      { scale: 0.85 },
      {
        scale: 1,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power1.out',
        delay: 0,
        onComplete: () => {
          $gsap.set(buttons, { clearProps: 'transform' });
          buttonsAnimated.value = true;
        },
      },
    );
  });
};

onMounted(() => {
  triggerDetailsAnimation();
  animateButtonsIntro();
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

.methods {
  min-height: 100vh;
}

.methods__panel {
  max-width: 110rem;
  margin: 0 auto 4rem;
}

.methods__panel-heading {
  margin-bottom: 2rem;
}

.methods__panel-intro {
  @include px-to-vw(font-size, 28);
  color: #555;
  line-height: 1.7;
  text-align: left;
  font-style: italic;

  p {
    margin-bottom: 0.75rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.methods__layout {
  display: grid;
  grid-template-columns: minmax(0, 42rem) minmax(0, 1fr);
  gap: 3rem;
  align-items: center;
}

.methods__list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.methods__list:not(.methods__list--animated) .methods__list-item {
  transform: scale(0.9);
}

.methods__list-item {
  width: 100%;
  background: white;
  border: 1px solid rgba($primary-color, 0.2);
  border-radius: 1.5rem;
  padding: 1.75rem;
  text-align: left;
  display: grid;
  grid-template-columns: auto 1px 1fr auto;
  gap: 1.5rem;
  align-items: center;
  color: #222;
  transition: all 0.3s ease;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: rgba($primary-color, 0.5);
    box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.08);
    transform: translateX(6px);
  }

  &--active {
    background: $primary-color;
    color: #fff;
    border-color: $primary-color;
    box-shadow: 0 2rem 3.5rem rgba($primary-color, 0.25);

    .methods__list-divider {
      background: rgba(255, 255, 255, 0.4);
    }

    .methods__list-arrow {
      color: rgba(255, 255, 255, 0.85);
      transform: translateX(0.4rem);
    }
  }
}

.methods__list-index {
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba($primary-color, 0.8);

  .methods__list-item--active & {
    color: rgba(255, 255, 255, 0.9);
  }
}

.methods__list-divider {
  width: 1px;
  height: 100%;
  background: rgba($primary-color, 0.2);
}

.methods__list-text {
  display: flex;
  flex-direction: column;
}

.methods__list-name {
  font-weight: 600;
  font-size: 1.8rem;
}

.methods__list-arrow {
  font-size: 2rem;
  color: rgba($primary-color, 0.4);
  transition:
    transform 0.3s ease,
    color 0.3s ease;
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
  .methods__panel-intro {
    font-size: 1.6rem;
  }

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
