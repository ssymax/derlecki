<template>
  <div class="contact-info">
    <h3 class="contact-info__name">
      {{ contactData?.owner_name }}<br />{{ contactData?.owner_profession }}
    </h3>
    <a
      v-for="(contact, index) in contactItems"
      :key="index"
      :href="contact.href"
      :target="contact.newTab ? '_blank' : undefined"
      :rel="contact.newTab ? 'noreferrer noopener' : undefined"
      class="contact-info__link"
    >
      <span class="contact-info__icon">
        <Icon :name="contact.icon" size="32" />
      </span>
      <span>{{ contact.text }}</span>
    </a>
  </div>
</template>

<script setup lang="ts">
interface Props {
  contactData?: ContactContent;
}

const props = defineProps<Props>();

const contactItems = computed(() => {
  if (!props.contactData) return [];

  return [
    {
      icon: 'mdi:phone',
      href: `tel:${props.contactData.phone}`,
      text: props.contactData.phone_display || props.contactData.phone,
    },
    {
      icon: 'mdi:email-outline',
      href: `mailto:${props.contactData.email}`,
      text: props.contactData.email,
    },
    {
      icon: 'mdi:map-marker',
      href: props.contactData.directions_url,
      text: `${props.contactData.address_street}, ${props.contactData.address_city}`,
      newTab: true,
    },
    {
      icon: 'mdi:facebook',
      href: props.contactData.facebook_url,
      text: 'Facebook',
      newTab: true,
    },
  ];
});
</script>

<style scoped lang="scss">
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 2rem;

  @media (max-width: 768px) {
    gap: 2.5rem;
  }
}

.contact-info__name {
  font-size: 3.2rem;
  font-weight: 700;
  color: $primary-color;
  text-align: left;
  margin: 0 0 3rem;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 2.6rem;
    margin: 0 0 2.5rem;
  }
}

.contact-info__link {
  display: flex;
  align-items: center;
  gap: 2rem;
  font-size: 2.4rem;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    font-size: 2rem;
    gap: 1.5rem;
  }

  &:hover {
    color: $primary-color;

    .contact-info__icon {
      transform: scale(1.3);
    }
  }
}

.contact-info__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: $primary-color;
  flex-shrink: 0;
  transition: transform 0.3s ease;

  :deep(svg) {
    color: $primary-color;
  }
}
</style>
