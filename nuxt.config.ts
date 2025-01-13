// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'SzabolcsN',
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    emailjsPrivateKey: process.env.EMAILJS_PRIVATE_KEY,
    public: {
      emailjsPublicKey: process.env.EMAILJS_PUBLIC_KEY,
      emailjsServiceId: process.env.EMAILJS_SERVICE_ID,
      emailjsTemplateId: process.env.EMAILJS_TEMPLATE_ID,
    }
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@nuxt/icon'],
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark'
  },
  icon: {
    serverBundle: {
      collections: ['uil']
    }
  },
  experimental: {
    crossOriginPrefetch: true,
  },
})