<template>
  <NuxtLink v-if="to" :to="to" :class="['app-button', `app-button--${variant}`]">
    <slot />
  </NuxtLink>
  <a
    v-else-if="href"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :class="['app-button', `app-button--${variant}`]"
  >
    <slot />
  </a>
  <button v-else :type="type" :class="['app-button', `app-button--${variant}`]">
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'outline';
    to?: string;
    href?: string;
    type?: 'button' | 'submit' | 'reset';
  }>(),
  {
    variant: 'primary',
    type: 'button',
    to: undefined,
    href: undefined,
  },
);
</script>

<style scoped lang="scss">
@use 'sass:color';

.app-button {
  display: inline-block;
  padding: 1.4rem 3.2rem;
  font-size: 1.4rem;
  font-weight: 500;
  text-decoration: none;
  border-radius: 0;
  transition: all 0.4s ease;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  border: 2px solid transparent;

  &--primary {
    color: #fff;
    background: $primary-color;
    border-color: $primary-color;

    &:hover {
      background: color.adjust($primary-color, $lightness: 10%);
      border-color: color.adjust($primary-color, $lightness: -10%);
      transform: translateY(-2px);
    }
  }

  &--outline {
    color: #fff;
    background: transparent;
    border-color: #fff;

    &:hover {
      background: #fff;
      color: #000;
    }
  }
}
</style>
