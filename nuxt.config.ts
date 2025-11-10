import { provide } from 'vue';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/icon', '@nuxt/image', '@nuxt/fonts'],
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
});
