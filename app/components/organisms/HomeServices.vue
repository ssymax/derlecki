<template>
  <section v-if="servicesContent" class="home-services">
    <h2 ref="titleRef" class="home-services__title">{{ servicesContent.header }}</h2>

    <div class="home-services__grid">
      <div
        v-for="(service, index) in services"
        :key="service._uid"
        class="home-services__item"
      >
        <div class="home-services__icon">
          <Icon :name="serviceIcons[index]!" size="32" />
        </div>
        <h3 class="home-services__name">{{ service.title }}</h3>
      </div>
    </div>

    <div class="home-services__cta">
      <AtomsAppButton variant="primary" to="/w-czym-moge-pomoc">
        Zobacz więcej
      </AtomsAppButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import SplitType from 'split-type';

const { servicesContent } = useHelpContent();
const services = computed(() => servicesContent.value?.list || []);

const titleRef = ref<HTMLElement | null>(null);
const { $gsap } = useNuxtApp() as any;
const { state } = useAppStore();
let splitInstance: SplitType | null = null;

onMounted(() => {
  // Set initial state
  if (titleRef.value) {
    splitInstance = new SplitType(titleRef.value, { types: 'words' });
    if (splitInstance.words) {
      $gsap.set(splitInstance.words, { y: '-100%' });
    }
  }

  // Set initial state for service items
  const items = document.querySelectorAll('.home-services__item');
  $gsap.set(items, {
    borderColor: 'rgba(255, 255, 255, 0)',
    boxShadow: '0 8px 24px rgba(255, 255, 255, 0)',
  });

  // Set initial state for icons
  const icons = document.querySelectorAll('.home-services__icon');
  $gsap.set(icons, {
    backgroundColor: 'rgba(255, 255, 255, 0)',
  });

  // Wait for loader to finish before starting animations
  watch(
    () => state.animationsReady,
    (ready) => {
      if (!ready) return;

      if (splitInstance?.words) {
        $gsap.to(splitInstance.words, {
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'deco.out',
          scrollTrigger: {
            trigger: titleRef.value,
            start: 'top 85%',
            once: true,
          },
        });
      }

      // Animate service items
      const items = document.querySelectorAll('.home-services__item');
      $gsap.to(items, {
        borderColor: 'rgba(0, 68, 171, 0.3)',
        boxShadow: '0 8px 24px rgba(0, 68, 171, 0.15)',
        duration: 2,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: '.home-services__grid',
          start: 'top 85%',
          once: true,
        },
      });

      // Animate icons background
      const icons = document.querySelectorAll('.home-services__icon');
      $gsap.to(icons, {
        backgroundColor: 'rgba(0, 68, 171, 0.05)',
        duration: 2,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: '.home-services__grid',
          start: 'top 85%',
          once: true,
        },
      });
    },
    { immediate: true },
  );
});

onBeforeUnmount(() => {
  if (splitInstance) {
    splitInstance.revert();
  }
});
</script>

<style scoped lang="scss">
.home-services {
  max-width: 140rem;
  @include px-to-vw(padding-top, 100);
  @include px-to-vw(padding-left, 24);
  @include px-to-vw(padding-right, 24);
  margin: 0 auto;

  @include max-width-md {
    padding: clamp(4rem, 8vw, 6rem) 1.6rem;
  }
}

.home-services__title {
  font-size: clamp(3.2rem, 5vw, 5.6rem);
  font-weight: 600;
  color: $primary-color;
  text-align: center;
  @include px-to-vw(margin-bottom, 60);
  line-height: 1.2;
  overflow: hidden;

  :deep(.word) {
    display: inline-block;
    overflow: hidden;
  }

  @include max-width-md {
    margin-bottom: 4rem;
  }
}

.home-services__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  @include px-to-vw(gap, 30);
  @include px-to-vw(margin-bottom, 60);

  @include max-width-xxl {
    grid-template-columns: repeat(4, 1fr);
  }

  @include max-width-xl {
    grid-template-columns: repeat(3, 1fr);
    gap: 2.4rem;
  }

  @include max-width-lg {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.4rem;
  }

  @include max-width-sm {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 4rem;
  }
}

.home-services__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  @include px-to-vw(padding-top, 30);
  @include px-to-vw(padding-bottom, 30);
  @include px-to-vw(padding-left, 20);
  @include px-to-vw(padding-right, 20);
  border: 1px solid rgba($primary-color, 0.3);
  border-radius: 1.2rem;
  background: #fff;
  box-shadow: 0 8px 24px rgba($primary-color, 0.15);
  will-change: border-color, box-shadow;

  @include max-width-md {
    flex-direction: row;
    text-align: left;
    padding: 2rem 1.6rem;
    gap: 1.5rem;
  }
}

.home-services__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  @include px-to-vw(width, 60);
  @include px-to-vw(height, 60);
  border-radius: 50%;
  background: rgba($primary-color, 0.05);
  color: rgba($primary-color, 0.75);
  @include px-to-vw(margin-bottom, 16);
  will-change: background-color;
  flex-shrink: 0;

  @include max-width-md {
    width: 5rem;
    height: 5rem;
    margin-bottom: 0;
  }
}

.home-services__name {
  font-size: clamp(1.6rem, 2vw, 1.8rem);
  font-weight: 600;
  color: #333;
  line-height: 1.4;
  margin: 0;

  @include max-width-md {
    display: flex;
    align-items: center;
  }
}

.home-services__cta {
  text-align: center;
  @include px-to-vw(margin-top, 60);
}
</style>
