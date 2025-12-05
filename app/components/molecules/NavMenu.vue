<template>
  <nav id="main-navigation" class="app-nav-menu" aria-label="Główne menu">
    <NuxtLink
      v-for="route in routes"
      :key="route.path"
      class="app-nav-menu__link"
      :to="route.path"
      @click="handleNavigate"
    >
      {{ route.name }}
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  routes: AppRoute[];
}>();

const emit = defineEmits<{
  (e: 'navigate'): void;
}>();

const handleNavigate = () => {
  emit('navigate');
};
</script>

<style scoped lang="scss">
.app-nav-menu {
  display: flex;
  justify-content: center;
  flex: 1;
  gap: 2.4rem;

  @include max-width-lg() {
    flex-direction: column;
    align-items: center;
    width: 100%;
    text-align: center;
  }

  @include min-width-lg() {
    margin: 0 auto;
  }
  @include max-width-md() {
    gap: 1.6rem;
  }
}

.app-nav-menu__link {
  font-weight: 600;
  font-size: 1.4rem;
  color: #222;
  text-decoration: none;
  position: relative;
  padding-bottom: 0.2rem;
  text-transform: uppercase;
  transition: color 0.2s ease;

  @include max-width-lg() {
    flex-direction: column;
    align-items: flex-start;
    text-align: center;
  }

  @include max-width-md() {
    font-size: 1.25rem;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.2rem;
    background-color: $primary-color;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.25s ease;
  }

  &:hover::after,
  &.router-link-active::after {
    transform: scaleX(1);
  }

  &.router-link-active,
  &:hover {
    color: $primary-color;
  }
}
</style>
