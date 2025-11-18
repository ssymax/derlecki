<template>
  <div>
    <section class="contact">
      <MoleculesSectionIntroPanel
        title="Kontakt"
        intro="Zapraszam do kontaktu w sprawie umówienia wizyty lub uzyskania dodatkowych informacji."
        intro-align="left"
      />

      <MoleculesContactGallery :images="images" />
    </section>
  </div>
</template>

<script setup lang="ts">
const images = [
  { src: '/img/dji-1.jpg', alt: 'Mateusz Derlecki - Fizjoterapia' },
  { src: '/img/dji-2.jpg', alt: 'Mateusz Derlecki - Fizjoterapia' },
  { src: '/img/building.jpg', alt: 'Mateusz Derlecki - Fizjoterapia' },
];
</script>

<style scoped lang="scss">
.contact {
  min-height: 100vh;
  max-width: 140rem;
  margin: 0 auto;
  padding: clamp(3rem, 5vw, 6rem) 2.4rem 0;

  @media (max-width: 768px) {
    padding: clamp(3rem, 5vw, 6rem) 1.6rem 0;
  }
}
</style>
