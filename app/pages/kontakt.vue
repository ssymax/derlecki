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
useSeoMeta({
  title: 'Kontakt',
  description:
    'Skontaktuj się z gabinetem fizjoterapii w Olsztynie. Umów wizytę telefonicznie lub mailowo. Mateusz Derlecki - profesjonalna fizjoterapia i terapia manualna.',
  ogImage: '/img/og-image.jpg',
});

const { contactData, images } = useContactInfo();
</script>

<style scoped lang="scss">
.contact {
  @include padding-style;
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
