export const useAboutInfo = () => {
  const { state } = useAppStore();

  const aboutContent = computed(() => state.about);

  return { aboutContent };
};
