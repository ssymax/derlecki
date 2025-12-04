<template>
  <div>
    <AtomsAppLoader />
    <NuxtLayout v-if="isLoaded">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { state } = useAppStore();
const isLoaded = computed(() => state.isLoaded);

// Global structured data
useSchemaOrg([
  {
    '@type': 'MedicalBusiness',
    name: 'Mateusz Derlecki - Fizjoterapia Olsztyn',
    description:
      'Profesjonalna fizjoterapia i terapia manualna w Olsztynie. Specjalizacja: rehabilitacja ortopedyczna, sportowa, neurologiczna.',
    url: 'https://fizjoterapia-olsztyn.pl',
    logo: 'https://fizjoterapia-olsztyn.pl/img/logo.png',
    image: 'https://fizjoterapia-olsztyn.pl/img/og-image.jpg',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Olsztyn',
      addressRegion: 'Warmińsko-Mazurskie',
      addressCountry: 'PL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 53.7784,
      longitude: 20.4801,
    },
    priceRange: '$$',
  },
]);
</script>
