<template>
  <footer class="app-footer">
    <div class="app-footer__columns">
      <div class="app-footer__brand">
        <p class="app-footer__brand-title">
          Mateusz Derlecki<br />
          Fizjoterapia
        </p>
        <p>Kompleksowa fizjoterapia w Olsztynie.</p>
      </div>

      <div class="app-footer__column">
        <h3>Nawigacja</h3>
        <ul>
          <li v-for="route in routes" :key="route.path">
            <NuxtLink :to="route.path">
              {{ route.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="app-footer__column">
        <h3>Adres</h3>
        <a
          class="app-footer__address"
          :href="directionsLink.href"
          target="_blank"
          rel="noreferrer noopener"
        >
          <span>{{ address.street }}</span>
          <span>{{ address.city }}</span>
        </a>
      </div>

      <div class="app-footer__column">
        <h3>Kontakt</h3>
        <ul>
          <li v-for="link in contactLinks" :key="link.href">
            <a
              :href="link.href"
              :target="link.newTab ? '_blank' : undefined"
              :rel="link.newTab ? 'noreferrer noopener' : undefined"
            >
              <Icon :name="link.icon" size="18" />
              <span>{{ link.text }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="app-footer__bottom">
      © {{ currentYear }} Mateusz Derlecki Fizjoterapia, all rights reserved.
    </div>
  </footer>
</template>

<script setup lang="ts">
import { address, contactLinks, routes, directionsUrl } from '~/utils/constants';

const currentYear = new Date().getFullYear();
const directionsLink = contactLinks.find((link) => link.href === directionsUrl) || {
  href: directionsUrl,
  newTab: true,
};
</script>

<style lang="scss" scoped>
.app-footer {
  background-color: $primary-color;
  color: #fff;
  padding: 4rem 2.4rem 2.4rem;
}

.app-footer__columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 2.4rem;
}

.app-footer__brand {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  p {
    margin: 0;
  }

  .app-footer__brand-title {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.3;
  }
}

.app-footer__column {
  h3 {
    margin: 0 0 1rem;
    font-size: 1.6rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  a {
    color: #fff;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }

  .app-footer__address {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2rem;
  }
}

.app-footer__bottom {
  margin-top: 3.2rem;
  text-align: center;
  font-size: 1.4rem;
  opacity: 0.9;
}
</style>
