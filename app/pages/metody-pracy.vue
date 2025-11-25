<template>
  <section v-if="methodsContent" class="methods">
    <MoleculesSectionIntroPanel
      :title="methodsContent.header"
      :intro="methodsContent.intro"
    />

    <div class="methods__layout">
      <div
        ref="methodsListRef"
        class="methods__list"
        role="tablist"
        aria-label="Metody pracy"
      >
        <MoleculesPanelNavButton
          v-for="(method, index) in methodsList"
          :key="method._uid"
          variant="methods"
          :index-label="formatMethodIndex(index)"
          :title="method.name"
          :is-active="method._uid === activeMethodId"
          @click="selectMethod(method._uid)"
        />
      </div>

      <div class="methods__details">
        <article
          v-if="activeMethod"
          :key="activeMethod._uid"
          class="methods__details-card"
        >
          <header class="methods__details-header">
            <div ref="detailsHeading" class="methods__details-heading">
              <AtomsDecoratedHeading align="right">
                {{ activeMethod.name }}
              </AtomsDecoratedHeading>
            </div>
            <p ref="detailsLead" class="methods__details-lead">
              {{ activeMethod.short_description }}
            </p>
          </header>

          <div class="methods__details-body">
            <div class="methods__details-text">
              <p ref="detailsDescription">
                {{ activeMethod.description }}
              </p>

              <div v-if="activeMethod.list?.length" class="methods__details-section">
                <ul ref="techniquesList">
                  <li v-for="listItem in activeMethod.list" :key="listItem._uid">
                    {{ listItem.item }}
                  </li>
                </ul>
              </div>
            </div>

            <div ref="imageWrapper" class="methods__details-image">
              <NuxtImg
                :key="activeMethod._uid"
                :src="activeMethod.image.filename"
                :alt="activeMethod.image.alt || activeMethod.name"
                width="1024"
                height="1280"
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
import { useMethods } from '~/composables/useMethods';

const { methodsContent } = useMethods();
const { $gsap } = useNuxtApp();

const methodsList = computed(() => methodsContent.value?.methods_items || []);

const activeMethodId = ref(methodsList.value[0]?._uid ?? '');

const activeMethod = computed<MethodItem | null>(() => {
  if (!methodsList.value.length) return null;
  return (
    methodsList.value.find((method) => method._uid === activeMethodId.value) ||
    methodsList.value[0] ||
    null
  );
});

const selectMethod = (methodId: string) => {
  if (methodId === activeMethodId.value) return;
  activeMethodId.value = methodId;
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

const triggerDetailsAnimation = () => {
  nextTick(() => {
    animateDetails();
  });
};

onMounted(() => {
  triggerDetailsAnimation();
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
  @include px-to-vw(padding-top, 100);
}

.methods__details {
  position: relative;
}

.methods__details-card {
  background: #fff;
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
  overflow: hidden;
  min-height: 28rem;
  box-shadow: 0 2rem 3rem rgba(0, 0, 0, 0.1);
  border-radius: 1.2rem;
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

  .methods__details-image {
    min-height: 22rem;
  }
}
</style>
