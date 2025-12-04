<template>
  <footer class="app-footer">
    <div v-if="isContactPage" class="app-footer__map">
      <div class="app-footer__map-divider" />
      <iframe
        :src="contactData?.google_maps_url"
        width="100%"
        height="450"
        style="border: 0"
        allowfullscreen="true"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      />
    </div>

    <div class="app-footer__columns">
      <div class="app-footer__brand">
        <p class="app-footer__brand-title">
          {{ contactData?.owner_name }} <br />
          {{ contactData?.owner_profession }}
        </p>
        <p>Kompleksowa fizjoterapia w Olsztynie</p>
      </div>

      <div class="app-footer__column">
        <h3>Nawigacja</h3>
        <ul>
          <li v-for="navRoute in routes" :key="navRoute.path">
            <NuxtLink :to="navRoute.path">
              {{ navRoute.name }}
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
          <li v-for="link in contactItemsForNav" :key="link.href">
            <a
              :href="link.href"
              :target="link.newTab ? '_blank' : undefined"
              :rel="link.newTab ? 'noreferrer noopener' : undefined"
            >
              <Icon :name="link.icon" size="18" />
              <span>{{ link.label }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="app-footer__bottom">
      © {{ currentYear }} {{ contactData?.owner_name }}
      {{ contactData?.owner_profession }}, Wszelkie prawa zastrzeżone.
    </div>
  </footer>
</template>

<script setup lang="ts">
const route = useRoute();
const currentYear = new Date().getFullYear();
const isContactPage = computed(() => route.path === '/kontakt');

const { contactData, contactItemsForNav } = useContactInfo();
const { routes } = useNavigation();

const directionsLink = computed(
  () =>
    contactItemsForNav.value.find(
      (link) => link.href === contactData.value?.directions_url,
    ) || {
      href: contactData.value?.directions_url || '',
      newTab: true,
    },
);

const address = computed(() => ({
  street: contactData.value?.address_street || '',
  city: contactData.value?.address_city || '',
}));
</script>

<style lang="scss" scoped>
.app-footer {
  background-color: $primary-color;
  color: #fff;
  padding: 4rem 2.4rem 2.4rem;

  @include max-width-lg() {
    padding: 3.2rem 1.6rem;
  }
}

.app-footer__map {
  width: calc(100% + 4.8rem);
  margin: -4rem -2.4rem 4rem;
  border-bottom: 8px solid rgba(255, 255, 255, 0.2);

  iframe {
    display: block;
  }

  @include max-width-lg() {
    width: calc(100% + 3.2rem);
    margin: -3.2rem -1.6rem 3.2rem;
  }
}

.app-footer__map-divider {
  height: 8px;
  background: linear-gradient(90deg, $primary-color 0%, rgba($primary-color, 0.3) 100%);
  margin-bottom: 0;
}

.app-footer__columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 2.4rem;

  @include max-width-lg() {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.app-footer__brand {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  p {
    margin: 0;
    max-width: 26rem;
  }

  .app-footer__brand-title {
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.3;
  }

  @include max-width-lg() {
    text-align: center;
    align-items: center;
    margin: 0 auto;

    p {
      max-width: none;
    }
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

    @include max-width-lg() {
      align-items: center;
      text-align: center;
      width: 100%;
    }
  }

  @include max-width-lg() {
    text-align: center;

    ul {
      align-items: center;
    }
  }
}

.app-footer__bottom {
  margin-top: 3.2rem;
  text-align: center;
  font-size: 1.4rem;
  opacity: 0.9;

  @include max-width-lg() {
    margin-top: 2.4rem;
    font-size: 1.3rem;
  }
}
</style>
