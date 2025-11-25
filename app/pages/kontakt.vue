<template>
  <div>
    <section class="contact">
      <MoleculesSectionIntroPanel
        :title="contactData?.header"
        :intro="contactData?.intro"
        intro-align="left"
      />

      <div class="contact__content">
        <MoleculesContactGallery
          :images="images"
          :images-header="contactData?.images_header"
        />
        <MoleculesContactInfo :contact-data="contactData as ContactContent | undefined" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { contactData, images } = useContactInfo();
</script>

<style scoped lang="scss">
.contact {
  min-height: 100vh;
  max-width: 140rem;
  margin: 0 auto;
  padding: clamp(3rem, 5vw, 6rem) 2.4rem 0;
}

.contact__content {
  @include px-to-vw(gap, 120);
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 6rem;
  }
}
</style>
