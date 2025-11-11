<template>
  <header class="nav-bar" :class="{ 'nav-bar--open': isMenuOpen }">
    <div class="nav-bar__brand-row">
      <NuxtLink class="nav-bar__logo" to="/" aria-label="Strona główna">
        <img :src="logoUrl" alt="Derlecki Fizjoterapia" />
      </NuxtLink>

      <button
        class="nav-bar__toggle"
        type="button"
        :aria-expanded="isMenuOpen"
        aria-controls="main-navigation"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div class="nav-bar__drawer">
      <nav id="main-navigation" class="nav-bar__menu" aria-label="Główne menu">
        <NuxtLink
          v-for="route in routes"
          :key="route.path"
          class="nav-bar__menu-link"
          :to="route.path"
        >
          {{ route.name }}
        </NuxtLink>
      </nav>

      <div class="nav-bar__actions" aria-label="Kontakt">
        <a
          v-for="link in contactLinks"
          :key="link.href"
          :href="link.href"
          class="nav-bar__action-link"
          :aria-label="link.ariaLabel"
          :target="link.newTab ? '_blank' : undefined"
          :rel="link.newTab ? 'noreferrer noopener' : undefined"
          @click="closeMenu"
        >
          <Icon :name="link.icon" size="20" />
          <span class="nav-bar__action-label">{{ link.text }}</span>
        </a>
      </div>
    </div>

    <Transition name="nav-overlay">
      <div
        v-if="isMenuOpen"
        class="nav-bar__overlay"
        @click="closeMenu"
        aria-hidden="true"
      />
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import logoUrl from '~/assets/logo.svg';
import { contactLinks, routes } from '~/utils/constants';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const route = useRoute();
watch(
  () => route.fullPath,
  () => {
    closeMenu();
  },
);
</script>

<style lang="scss" scoped>
.nav-bar {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.6rem 2.4rem;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  z-index: 5;

  @include min-width-lg() {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 2.4rem;
  }
}

.nav-bar__brand-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
  z-index: 15;

  @include min-width-lg() {
    width: auto;
    gap: 2.4rem;
  }
}

.nav-bar__logo {
  display: flex;
  align-items: center;
  max-width: 14rem;

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  @include max-width-lg() {
    max-width: 12rem;
  }
}

.nav-bar__toggle {
  position: relative;
  width: 3.6rem;
  height: 3.6rem;
  border: none;
  background: none;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.2s ease;
  z-index: 20;

  @include max-width-lg() {
    display: inline-flex;
  }

  &:hover {
    background-color: rgba(0, 68, 171, 0.1);
  }

  span {
    position: absolute;
    width: 2.4rem;
    height: 0.2rem;
    background-color: #222;
    border-radius: 1rem;
    transition:
      transform 0.3s ease,
      width 0.3s ease,
      top 0.3s ease,
      opacity 0.3s ease;
  }

  span:nth-child(1) {
    top: 1.1rem;
  }

  span:nth-child(2) {
    top: 1.7rem;
  }

  span:nth-child(3) {
    top: 2.3rem;
  }
}

.nav-bar--open .nav-bar__toggle {
  span:nth-child(1) {
    top: 1.7rem;
    transform: rotate(45deg);
  }

  span:nth-child(2) {
    opacity: 0;
    transform: translateX(1.2rem);
  }

  span:nth-child(3) {
    top: 1.7rem;
    transform: rotate(-45deg);
  }
}

.nav-bar__drawer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3.2rem;
  width: 100%;

  @include max-width-lg() {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    padding: 8rem 2.4rem 3.2rem;
    flex-direction: column;
    gap: 3.2rem;
    background-color: #fff;
    box-shadow: 0 1.2rem 3rem rgba(0, 0, 0, 0.12);
    border-radius: 0;
    transform: translateX(110%);
    opacity: 0;
    pointer-events: none;
    z-index: 12;
    transition:
      opacity 0.3s ease,
      transform 0.35s ease;
  }
}

.nav-bar--open .nav-bar__drawer {
  @include max-width-lg() {
    opacity: 1;
    transform: translateX(0);
    pointer-events: auto;
  }
}

.nav-bar__menu {
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
}

.nav-bar__menu-link {
  font-weight: 600;
  font-size: 1.4rem;
  color: #222;
  text-decoration: none;
  position: relative;
  padding-bottom: 0.2rem;
  text-transform: uppercase;
  transition: color 0.2s ease;

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

.nav-bar__actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
  min-width: 20rem;

  @include max-width-lg() {
    width: 100%;
    background-color: $primary-color;
    padding: 1.6rem;
    border-radius: 1.6rem;
    gap: 1.2rem;
    align-items: center;
    text-align: center;
  }

  @include min-width-lg() {
    margin-left: auto;
  }
}

.nav-bar__action-link {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  color: $primary-color;
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
  padding: 0.4rem 0.8rem;
  border-radius: 999px;

  &:hover {
    background-color: rgba(0, 68, 171, 0.1);
  }

  @include max-width-lg() {
    color: #fff;
    width: 100%;
    justify-content: center;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
}

.nav-bar__action-label {
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;

  @include max-width-lg() {
    color: #fff;
  }
}

.nav-bar__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 10;
}

.nav-overlay-enter-active,
.nav-overlay-leave-active {
  transition: opacity 0.3s ease;
}

.nav-overlay-enter-from,
.nav-overlay-leave-to {
  opacity: 0;
}

@include min-width-lg() {
  .nav-bar__toggle {
    display: none;
  }

  .nav-bar__overlay {
    display: none;
  }

  .nav-bar__drawer {
    position: static;
    box-shadow: none;
    border-radius: 0;
    transform: none;
    opacity: 1;
    pointer-events: auto;
    padding: 0;
    gap: 2.4rem;
    align-items: center;
  }
}
</style>
