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
        <MoleculesContactInfo
          :contact-data="
            contactData
              ? {
                  ...contactData,
                  images: Array.isArray(contactData.images)
                    ? contactData.images.slice()
                    : [],
                }
              : undefined
          "
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { contactData, images } = useContactInfo();
</script>

<style scoped lang="scss">
.contact {
  @include page-container;
}

.contact__content {
  @include px-to-vw(gap, 120);
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;

  @include max-width-lg {
    grid-template-columns: 1fr;
    gap: 6rem;
  }
}
</style>
