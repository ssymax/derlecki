export const useAboutInfo = async () => {
  const { story } = await useAsyncStoryblok('about', {
    api: { version: 'published' },
    bridge: {},
  });

  const aboutContent = computed<AboutContent | null>(() => {
    const body = story.value?.content?.body || [];
    return (body[0] as AboutContent) || null;
  });

  return { story, aboutContent };
};
