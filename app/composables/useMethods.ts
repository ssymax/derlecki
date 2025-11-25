export const useMethods = () => {
  const { state } = useAppStore();

  const methodsContent = computed(() => state.methods);

  return { methodsContent };
};
