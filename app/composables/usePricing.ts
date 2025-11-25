export const usePricing = () => {
  const { state } = useAppStore();

  const pricingContent = computed(() => state.pricing);

  return { pricingContent };
};
