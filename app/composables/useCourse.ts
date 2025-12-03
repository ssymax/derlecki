export const useCourse = () => {
  const { state } = useAppStore();

  const courseContent = computed(() => state.course);

  return { courseContent };
};
