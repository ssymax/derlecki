interface AppStoreState {
  navigation: MenuItem[] | null;
  about: AboutContent | null;
  services: ServicesContent | null;
  methods: MethodsContent | null;
  contact: ContactContent | null;
  pricing: PricingContent | null;
  slides: SlidesContent | null;
  isLoaded: boolean;
}

const state = reactive<AppStoreState>({
  navigation: null,
  about: null,
  services: null,
  methods: null,
  contact: null,
  pricing: null,
  slides: null,
  isLoaded: false,
});

export const useAppStore = () => {
  const progress = ref(0);

  const loadAllData = async () => {
    if (state.isLoaded) {
      return state;
    }

    try {
      // Load all data in parallel and track completion
      const loadPromises = [
        useAsyncStoryblok('navigation', {
          api: { version: 'published' },
          bridge: {},
        }),
        useAsyncStoryblok('about', {
          api: { version: 'published' },
          bridge: {},
        }),
        useAsyncStoryblok('help', {
          api: { version: 'published' },
          bridge: {},
        }),
        useAsyncStoryblok('methods', {
          api: { version: 'published' },
          bridge: {},
        }),
        useAsyncStoryblok('kontakt', {
          api: { version: 'published' },
          bridge: {},
        }),
        useAsyncStoryblok('pricing', {
          api: { version: 'published' },
          bridge: {},
        }),
        useAsyncStoryblok('slides', {
          api: { version: 'published' },
          bridge: {},
        }),
      ];

      const totalSteps = loadPromises.length;
      let completedSteps = 0;

      const results = await Promise.all(
        loadPromises.map(async (promise) => {
          const result = await promise;
          completedSteps++;
          progress.value = Math.round((completedSteps / totalSteps) * 100);
          return result;
        }),
      );

      // Assign results to state
      state.navigation = (results[0]?.story.value?.content?.body || []) as MenuItem[];
      state.about =
        ((results[1]?.story.value?.content?.body || [])[0] as AboutContent) || null;
      state.services =
        ((results[2]?.story.value?.content?.body || [])[0] as ServicesContent) || null;
      state.methods =
        ((results[3]?.story.value?.content?.body || [])[0] as MethodsContent) || null;
      state.contact =
        ((results[4]?.story.value?.content?.body || [])[0] as ContactContent) || null;
      state.pricing =
        ((results[5]?.story.value?.content?.body || [])[0] as PricingContent) || null;
      state.slides =
        ((results[6]?.story.value?.content?.body || [])[0] as SlidesContent) || null;

      state.isLoaded = true;
    } catch (error) {
      console.error('Error loading app data:', error);
      throw error;
    }
  };

  return {
    state: readonly(state),
    progress: readonly(progress),
    loadAllData,
  };
};
