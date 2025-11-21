export const useContactInfo = async (slug: string = 'kontakt') => {
  const { story } = await useAsyncStoryblok(slug, {
    api: { version: 'published' },
    bridge: {},
  });

  const contactData = computed(
    () => story.value?.content?.body?.[0] as ContactContent | undefined,
  );

  const contactItems = computed(() => {
    const data = contactData.value;
    if (!data) return [];

    return [
      {
        icon: 'mdi:phone',
        href: `tel:${data.phone}`,
        text: data.phone_display || data.phone,
        label: 'Telefon',
      },
      {
        icon: 'mdi:email-outline',
        href: `mailto:${data.email}`,
        text: data.email,
        label: 'Email',
      },
      {
        icon: 'mdi:map-marker',
        href: data.directions_url,
        text: `${data.address_street}, ${data.address_city}`,
        label: 'Lokalizacja',
        newTab: true,
      },
      {
        icon: 'mdi:facebook',
        href: data.facebook_url,
        text: 'Facebook',
        label: 'Facebook',
        newTab: true,
      },
    ];
  });

  const contactItemsForNav = computed(() => {
    const data = contactData.value;
    if (!data) return [];

    return [
      {
        icon: 'mdi:phone',
        href: `tel:${data.phone}`,
        label: data.phone_display,
      },
      {
        icon: 'mdi:email-outline',
        href: `mailto:${data.email}`,
        label: 'Email',
      },
      {
        icon: 'mdi:map-marker',
        href: data.directions_url,
        label: 'Lokalizacja',
        newTab: true,
      },
      {
        icon: 'mdi:facebook',
        href: data.facebook_url,
        label: 'Facebook',
        newTab: true,
      },
    ];
  });

  const images = computed(() => {
    const imgs = contactData.value?.images || [];
    return imgs.map((img) => ({
      src: img.filename,
      alt: img.alt,
    }));
  });

  return {
    story,
    contactData,
    contactItems,
    contactItemsForNav,
    images,
  };
};
