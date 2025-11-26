interface AppStoreState {
  navigation: MenuItem[] | null;
  about: AboutContent | null;
  services: ServicesContent | null;
  methods: MethodsContent | null;
  contact: ContactContent | null;
  pricing: PricingContent | null;
  slides: SlidesContent | null;
  isLoaded: boolean;
  progress: number;
  animationsReady: boolean;
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
  progress: 0,
  animationsReady: false,
});

export const useAppStore = () => {
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

      const results = await Promise.all(loadPromises);

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

      // Parse slides content to separate images and opinions
      const slidesBody = results[6]?.story.value?.content?.body || [];
      state.slides = {
        images:
          (slidesBody.find(
            (item: ImagesContent | OpinionsContent) => item.component === 'images',
          ) as ImagesContent) || null,
        opinions:
          (slidesBody.find(
            (item: ImagesContent | OpinionsContent) => item.component === 'opinions',
          ) as OpinionsContent) || null,
      };

      state.progress = 100;
      state.isLoaded = true;
    } catch (error) {
      console.error('Error loading app data:', error);
      throw error;
    }
  };

  const setAnimationsReady = () => {
    state.animationsReady = true;
  };

  return {
    state: readonly(state),
    loadAllData,
    setAnimationsReady,
  };
};
