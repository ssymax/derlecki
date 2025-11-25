export const useHelpContent = () => {
  const { state } = useAppStore();

  const servicesContent = computed(() => state.services);

  return { servicesContent };
};
