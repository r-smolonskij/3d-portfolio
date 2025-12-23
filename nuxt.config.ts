import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  css: ["~/assets/css/tailwind.css"],
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n"],
  runtimeConfig: {
    mailgunApiKey: process.env.MAILGUN_API_KEY,
  },
  i18n: {
    locales: [
      { code: "lv", language: "lv-LV", file: "lv.json" },
      { code: "ru", language: "ru-RU", file: "ru.json" },
      { code: "en", language: "en-US", file: "en.json" },
    ],
    defaultLocale: "en",
    strategy: "no_prefix",
  },
  app: {
    head: {
      title: "MobWebTech | Mobilā un web izstrāde",
      meta: [
        {
          name: "description",
          content:
            "MobWebTech ir mobilās un web izstrādes aģentūra, kas veido digitāli spēcīgus produkus ar drošu arhitektūru un daudzvalodu pieredzi.",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/images/favicon.ico" },
      ],
    },
  },
  tailwindcss: {
    viewer: false,
  },
});
