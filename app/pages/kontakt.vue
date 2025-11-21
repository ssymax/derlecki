<template>
  <div>
    <section class="contact">
      <MoleculesSectionIntroPanel
        :title="contactData?.header"
        :intro="contactData?.intro"
        intro-align="left"
      />

      <div class="contact__content">
        <MoleculesContactGallery :images="images" />
        <MoleculesContactInfo
          :name="contactData?.header"
          :phone="contactData?.phone"
          :phone-display="contactData?.phone_display"
          :email="contactData?.email"
          :address-street="contactData?.address_street"
          :address-city="contactData?.address_city"
          :facebook-url="contactData?.facebook_url"
          :directions-url="contactData?.directions_url"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { contactData, images } = await useContactInfo();
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

.contact__content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 6rem;
  }
}
</style>
