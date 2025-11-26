<template>
  <div class="error-page">
    <div class="error-page__content">
      <div class="error-page__code">{{ error.statusCode }}</div>
      <h1 class="error-page__title">{{ errorTitle }}</h1>
      <p class="error-page__message">{{ errorMessage }}</p>
      <NuxtLink to="/" class="error-page__button"> Wróć do strony głównej </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
});

const errorTitle = computed(() => {
  if (props.error.statusCode === 404) {
    return 'Strona nie znaleziona';
  }
  return 'Coś poszło nie tak';
});

const errorMessage = computed(() => {
  if (props.error.statusCode === 404) {
    return 'Przepraszamy, nie możemy znaleźć strony, której szukasz.';
  }
  return 'Przepraszamy, wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę lub wróć do strony głównej.';
});
</script>

<style scoped lang="scss">
@use 'sass:color';

.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, rgba($primary-color, 0.05) 0%, #fff 100%);
}

.error-page__content {
  text-align: center;
  max-width: 60rem;
}

.error-page__code {
  font-size: clamp(8rem, 15vw, 16rem);
  font-weight: 300;
  line-height: 1;
  color: $primary-color;
  opacity: 0.2;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
}

.error-page__title {
  font-size: clamp(3rem, 5vw, 4.8rem);
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 2rem;
  line-height: 1.2;
}

.error-page__message {
  font-size: clamp(1.6rem, 2.5vw, 2rem);
  color: #555;
  line-height: 1.6;
  margin-bottom: 4rem;
}

.error-page__button {
  display: inline-block;
  padding: 1.6rem 4rem;
  font-size: 1.6rem;
  font-weight: 500;
  color: #fff;
  background: $primary-color;
  text-decoration: none;
  border-radius: 0.4rem;
  transition: all 0.3s ease;
  letter-spacing: 0.05em;

  &:hover {
    background: color.adjust($primary-color, $lightness: -10%);
    transform: translateY(-2px);
    box-shadow: 0 0.8rem 2rem rgba($primary-color, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
}
</style>
