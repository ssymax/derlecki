<template>
  <header class="nav-bar">
    <NuxtLink class="nav-bar__logo" to="/" aria-label="Strona główna">
      <img :src="logoUrl" alt="Derlecki Fizjoterapia" />
    </NuxtLink>

    <nav class="nav-bar__menu" aria-label="Główne menu">
      <NuxtLink
        v-for="route in routes"
        :key="route.path"
        class="nav-bar__menu-link"
        :to="route.path"
      >
        {{ route.name.toUpperCase() }}
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
      >
        <Icon :name="link.icon" size="20" />
        <span class="nav-bar__action-label">{{ link.text }}</span>
      </a>
    </div>
  </header>
</template>

<script setup lang="ts">
import logoUrl from '~/assets/logo.svg';
import { contactLinks, routes } from '~/utils/constants';
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 2.4rem;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  gap: 1.6rem;
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
}

.nav-bar__menu {
  display: flex;
  justify-content: center;
  flex: 1;
  gap: 2.4rem;
}

.nav-bar__menu-link {
  font-weight: 600;
  font-size: 1.4rem;
  color: #222;
  text-decoration: none;
  transition: color 0.2s ease;

  &.router-link-active {
    color: $primary-color;
  }

  &:hover {
    color: $primary-color;
  }
}

.nav-bar__actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
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
}

.nav-bar__action-label {
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
}
</style>
