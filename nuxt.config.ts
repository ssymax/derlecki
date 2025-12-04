// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/fonts',
    '@hypernym/nuxt-gsap',
    'lenis/nuxt',
    '@storyblok/nuxt',
    '@nuxtjs/seo',
  ],
  site: {
    url: 'https://fizjoterapia-olsztyn.pl',
    name: 'Mateusz Derlecki | Fizjoterapeuta Olsztyn',
    description:
      'Profesjonalna fizjoterapia w Olsztynie. Specjalizuję się w terapii manualnej, rehabilitacji ortopedycznej i sportowej. Umów się na konsultację.',
    defaultLocale: 'pl',
  },
  sitemap: {
    strictNuxtContentPaths: true,
  },
  robots: {
    enabled: true,
  },

  image: {
    provider: 'storyblok',
    storyblok: {
      baseURL: 'https://a.storyblok.com',
    },
  },
  fonts: {
    families: [
      {
        name: 'Montserrat',
        weights: [300, 400, 500, 600, 700],
        provider: 'google',
      },
    ],
  },
  css: ['normalize.css/normalize.css', '~/assets/scss/global.scss'],
  gsap: {
    provide: true,
    extraPlugins: {
      scrollTrigger: true,
      observer: true,
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "~/assets/scss/variables.scss" as *;\n@use "~/assets/scss/mixins.scss" as *;',
        },
      },
    },
  },
  storyblok: {
    accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
    apiOptions: {
      region: 'eu',
    },
    bridge: true,
  },
});
