export const useSlides = () => {
  const { state } = useAppStore();

  const slidesContent = computed(() => state.slides);

  return { slidesContent };
};
