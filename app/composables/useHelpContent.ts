export const useHelpContent = async () => {
  const { story } = await useAsyncStoryblok('help', {
    api: { version: 'published' },
    bridge: {},
  });

  const servicesContent = computed<ServicesContent | null>(() => {
    const body = story.value?.content?.body || [];
    return (body[0] as ServicesContent) || null;
  });

  return { story, servicesContent };
};
