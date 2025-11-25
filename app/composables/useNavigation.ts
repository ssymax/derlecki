export const useNavigation = async () => {
  const { story } = await useAsyncStoryblok('navigation', {
    api: { version: 'published' },
    bridge: {},
  });

  const routes = computed<AppRoute[]>(() => {
    const items = (story.value?.content?.body || []) as MenuItem[];
    return items.map((item) => ({
      name: item.name,
      path: item.path,
    }));
  });

  return {
    story,
    routes,
  };
};
