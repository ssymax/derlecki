<template>
  <div class="home-page">
    <section class="home">
      <div v-if="slidesContent?.images?.length" class="home__hero">
        <div class="home__hero-slider">
          <div
            v-for="(image, index) in slidesContent.images"
            :key="image.id"
            class="home__hero-slide"
            :class="{ 'home__hero-slide--active': currentSlide === index }"
          >
            <NuxtImg
              :src="image.filename"
              :alt="image.alt"
              class="home__hero-image"
              format="webp"
            />
          </div>
        </div>

        <div class="home__hero-overlay">
          <div ref="heroContentRef" class="home__hero-content">
            <h1 class="home__hero-title">{{ contactData?.owner_name }}</h1>
            <p class="home__hero-subtitle">{{ contactData?.owner_profession }}</p>
            <div class="home__hero-links">
              <Transition name="fade" mode="out-in">
                <NuxtLink
                  v-if="heroRoutes[currentSlide]"
                  :key="currentSlide"
                  :to="heroRoutes[currentSlide]?.path || '/'"
                  class="home__hero-cta"
                >
                  {{ heroRoutes[currentSlide]?.name }}
                </NuxtLink>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section ref="opinionsRef" class="home__opinions">
      <AtomsDecoratedHeading>Opinie</AtomsDecoratedHeading>

      <div ref="sliderRef" class="home__opinions-slider">
        <div ref="trackRef" class="home__opinions-track">
          <div
            v-for="(opinion, index) in opinions"
            :key="index"
            class="home__opinion-card"
          >
            <p class="home__opinion-description">{{ opinion.description }}</p>
            <p class="home__opinion-author">— {{ opinion.author }}</p>
          </div>
        </div>
      </div>

      <div class="home__opinions-cta">
        <a
          href="https://www.google.com/maps"
          target="_blank"
          rel="noopener noreferrer"
          class="home__opinions-button"
        >
          Zobacz więcej
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { slidesContent } = useSlides();
const { contactData } = useContactInfo();
const { routes } = useNavigation();

const heroRoutes = computed(() => {
  return routes.value.filter((route) => route.path !== '/');
});

const opinionsData = [
  {
    author: 'Anna Kowalska',
    description:
      'Profesjonalne podejście i ogromne wsparcie. Dzięki terapii nauczyłam się radzić sobie ze stresem i odnalazłam spokój wewnętrzny.',
  },
  {
    author: 'Piotr Nowak',
    description:
      'Serdecznie polecam! Atmosfera pełna zrozumienia i empatii. Każda sesja przynosiła mi nowe spojrzenie na moje problemy.',
  },
  {
    author: 'Maria Wiśniewska',
    description:
      'Wspaniała psycholog, która pomogła mi przejść przez trudny okres w życiu. Czuję się teraz o wiele silniejsza i pewniejsza siebie.',
  },
  {
    author: 'Jan Lewandowski',
    description:
      'Bardzo kompetentna i ciepła osoba. Polecam każdemu, kto szuka profesjonalnej pomocy psychologicznej.',
  },
  {
    author: 'Katarzyna Dąbrowska',
    description:
      'Terapia zmieniła moje życie na lepsze. Dziękuję za cierpliwość, wsparcie i niezawodną pomoc w najtrudniejszych momentach.',
  },
];

// Duplicate opinions for infinite loop
const opinions = computed(() => [...opinionsData, ...opinionsData]);

const sliderRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);
const opinionsRef = ref<HTMLElement | null>(null);
const heroContentRef = ref<HTMLElement | null>(null);

const { $gsap, $ScrollTrigger } = useNuxtApp();

const currentSlide = ref(0);

onMounted(() => {
  // Animate hero content on load
  if (heroContentRef.value && $gsap) {
    const title = heroContentRef.value.querySelector('.home__hero-title');
    const subtitle = heroContentRef.value.querySelector('.home__hero-subtitle');
    const cta = heroContentRef.value.querySelector('.home__hero-links');

    $gsap.fromTo(
      [title, subtitle, cta],
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power2.out',
        delay: 0.3,
      },
    );
  }

  if (trackRef.value && sliderRef.value && $gsap) {
    const track = trackRef.value;

    const trackWidth = track.scrollWidth / 2; // Half because duplicated
    const duration = trackWidth / 50;

    $gsap.set(track, { x: 0 });

    $gsap.to(track, {
      x: `-=${trackWidth * 2}`,
      duration: duration * 2,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: $gsap.utils.unitize((x: number) => x % trackWidth),
      },
    });
  }

  // Parallax effect for opinions section
  if (opinionsRef.value && $gsap && $ScrollTrigger) {
    $gsap.fromTo(
      opinionsRef.value,
      {
        y: 0,
      },
      {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.home__hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      },
    );
  }

  if (slidesContent.value?.images && slidesContent.value.images.length > 1 && $gsap) {
    const totalSlides = slidesContent.value.images.length;

    $gsap.to(currentSlide, {
      value: totalSlides,
      duration: totalSlides * 8,
      ease: 'none',
      repeat: -1,
      modifiers: {
        value: (value: number) => Math.floor(value % totalSlides),
      },
    });
  }
});
</script>

<style scoped lang="scss">
.home-page {
  margin-left: calc(100 / 1920 * -100vw);
  margin-right: calc(100 / 1920 * -100vw);
  margin-top: calc(50 / 1920 * -100vw);
  margin-bottom: calc(50 / 1920 * -100vw);

  @media (min-width: 1920px) {
    margin-left: -100px;
    margin-right: -100px;
    margin-top: -50px;
    margin-bottom: -50px;
  }
}

.home {
  min-height: 100vh;
  overflow: hidden;
}

.home__hero {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.home__hero-slider {
  position: relative;
  width: 100%;
  height: 100%;
}

.home__hero-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 2s ease-in-out;

  &--active {
    opacity: 1;
  }
}

.home__hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.home__hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5));
}

.home__hero-content {
  text-align: center;
  color: #fff;
  padding: 0 2rem;
}

.home__hero-title {
  font-size: clamp(4.8rem, 8vw, 9.6rem);
  font-weight: 300;
  margin-bottom: 1.6rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.home__hero-subtitle {
  font-size: clamp(2rem, 3vw, 3.2rem);
  font-weight: 300;
  line-height: 1.4;
  margin-bottom: 4.8rem;
  opacity: 0.9;
  letter-spacing: 0.05em;
}

.home__hero-links {
  display: flex;
  gap: 2.4rem;
  justify-content: center;
  flex-wrap: wrap;
}

.home__hero-cta {
  display: inline-block;
  padding: 1.8rem 4rem;
  font-size: 1.8rem;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
  background: transparent;
  border: 2px solid #fff;
  border-radius: 0;
  transition: all 0.4s ease;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  &:hover {
    background: #fff;
    color: #000;
  }
}

.fade-enter-active {
  transition: opacity 0.8s ease;
  transition-delay: 0.6s;
}

.fade-leave-active {
  transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.home__opinions {
  @include padding-style;
  padding-top: calc(100 / 1920 * 100vw);
  padding-bottom: calc(100 / 1920 * 100vw);
  margin-bottom: calc(100 / 1920 * 100vw);
  background: #fff;
  position: relative;
  z-index: 3;
  will-change: transform;

  @media (min-width: 1920px) {
    padding-top: 100px;
    padding-bottom: 100px;
    margin-bottom: 100px;
  }
}

.home__opinions-slider {
  overflow: hidden;
  margin: calc(80 / 1920 * 100vw) 0;

  @media (min-width: 1920px) {
    margin: 80px 0;
  }
}

.home__opinions-track {
  display: flex;
  gap: 2rem;
  width: fit-content;

  @media (min-width: 768px) {
    gap: calc(40 / 1920 * 100vw);
  }

  @media (min-width: 1920px) {
    gap: 40px;
  }
}

.home__opinion-card {
  flex: 0 0 auto;
  width: 85vw;
  padding: 3rem;
  background: #f8f8f8;
  border-radius: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 250px;

  @media (min-width: 768px) {
    width: calc(500 / 1920 * 100vw);
    padding: calc(40 / 1920 * 100vw);
  }

  @media (min-width: 1920px) {
    width: 500px;
    padding: 40px;
  }
}

.home__opinion-description {
  font-size: clamp(1.6rem, 2vw, 1.8rem);
  line-height: 1.6;
  margin-bottom: calc(24 / 1920 * 100vw);
  color: #333;

  @media (min-width: 1920px) {
    margin-bottom: 24px;
  }
}

.home__opinion-author {
  font-size: clamp(1.4rem, 1.8vw, 1.6rem);
  font-weight: 600;
  color: $primary-color;
}

.home__opinions-cta {
  text-align: center;
  margin-top: calc(60 / 1920 * 100vw);

  @media (min-width: 1920px) {
    margin-top: 60px;
  }
}

.home__opinions-button {
  display: inline-block;
  padding: 1.8rem 4rem;
  font-size: 1.8rem;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
  background: $primary-color;
  border-radius: 0;
  transition: all 0.4s ease;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  &:hover {
    background: darken($primary-color, 10%);
    transform: translateY(-2px);
  }
}
</style>
