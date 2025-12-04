<template>
  <div class="section-panel" :class="`section-panel--align-${introAlign}`">
    <div v-if="title" class="section-panel__heading">
      <h1 aria-hidden="true">{{ title }}</h1>
      <span class="section-panel__underline" aria-hidden="true" />
    </div>
    <div v-if="intro" class="section-panel__intro">
      <p>{{ intro }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue';

const props = withDefaults(
  defineProps<{
    title?: string;
    intro?: string;
    introAlign?: 'left' | 'right';
  }>(),
  {
    title: '',
    intro: '',
    introAlign: 'left',
  },
);

const title = toRef(props, 'title');
const intro = toRef(props, 'intro');
const introAlign = computed(() => props.introAlign);
</script>

<style scoped lang="scss">
.section-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: clamp(50rem, 85vw, 110rem);
  margin: 0 auto clamp(3rem, 5vw, 6rem);
  padding: 0 clamp(1rem, 3vw, 3rem);

  @include max-width-md {
    max-width: 100%;
    padding: 0;
  }
}

.section-panel__heading {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  h1 {
    text-transform: uppercase;
    font-size: clamp(2.2rem, 4.5vw, 3.8rem);
    line-height: 1.1;
    letter-spacing: 0.12em;
    font-weight: 700;
    color: $primary-color;
  }
}

.section-panel__underline {
  width: 50%;
  height: 3px;
  background: linear-gradient(90deg, $primary-color 0%, rgba($primary-color, 0.3) 100%);
  border-radius: 999px;
}

.section-panel__intro {
  color: #555;
  line-height: 1.7;
  text-align: left;
  font-style: italic;

  p {
    font-size: clamp(1.8rem, 2.2vw, 2.2rem);
    margin-bottom: 0.75rem;
    text-align: inherit;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
