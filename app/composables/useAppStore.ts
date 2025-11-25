interface AppStoreState {
  navigation: MenuItem[] | null;
  about: AboutContent | null;
  services: ServicesContent | null;
  methods: MethodsContent | null;
  contact: ContactContent | null;
  isLoaded: boolean;
}

const state = reactive<AppStoreState>({
  navigation: null,
  about: null,
  services: null,
  methods: null,
  contact: null,
  isLoaded: false,
});

export const useAppStore = () => {
  const loadAllData = async () => {
    if (state.isLoaded) {
      return state;
    }

    const totalSteps = 5;
    let completedSteps = 0;

    const updateProgress = () => {
      completedSteps++;
      return Math.round((completedSteps / totalSteps) * 100);
    };

    try {
      // Load navigation
      const { story: navStory } = await useAsyncStoryblok('navigation', {
        api: { version: 'published' },
        bridge: {},
      });
      state.navigation = (navStory.value?.content?.body || []) as MenuItem[];
      const progress1 = updateProgress();

      // Load about
      const { story: aboutStory } = await useAsyncStoryblok('about', {
        api: { version: 'published' },
        bridge: {},
      });
      const aboutBody = aboutStory.value?.content?.body || [];
      state.about = (aboutBody[0] as AboutContent) || null;
      const progress2 = updateProgress();

      // Load services/help
      const { story: helpStory } = await useAsyncStoryblok('help', {
        api: { version: 'published' },
        bridge: {},
      });
      const helpBody = helpStory.value?.content?.body || [];
      state.services = (helpBody[0] as ServicesContent) || null;
      const progress3 = updateProgress();

      // Load methods
      const { story: methodsStory } = await useAsyncStoryblok('methods', {
        api: { version: 'published' },
        bridge: {},
      });
      const methodsBody = methodsStory.value?.content?.body || [];
      state.methods = (methodsBody[0] as MethodsContent) || null;
      const progress4 = updateProgress();

      // Load contact
      const { story: contactStory } = await useAsyncStoryblok('kontakt', {
        api: { version: 'published' },
        bridge: {},
      });
      const contactBody = contactStory.value?.content?.body || [];
      state.contact = (contactBody[0] as ContactContent) || null;
      const progress5 = updateProgress();

      state.isLoaded = true;

      return {
        progress1,
        progress2,
        progress3,
        progress4,
        progress5,
      };
    } catch (error) {
      console.error('Error loading app data:', error);
      throw error;
    }
  };

  return {
    state: readonly(state),
    loadAllData,
  };
};
