export default defineNuxtPlugin(async () => {
  const { loadAllData } = useAppStore();

  // Load all data during app initialization
  await loadAllData();
});
