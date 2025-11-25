export const useNavigation = () => {
  const { state } = useAppStore();

  const routes = computed<AppRoute[]>(() => {
    const items = state.navigation || [];
    return items.map((item) => ({
      name: item.name,
      path: item.path,
    }));
  });

  return {
    routes,
  };
};
