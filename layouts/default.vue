<template>
  <div
    class="relative min-h-screen overflow-hidden"
    :class="
      isDark ? 'dark bg-night text-slate-100' : 'bg-slate-50 text-slate-900'
    "
  >
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        class="absolute -left-10 top-10 h-72 w-72 rounded-full blur-3xl"
        :class="isDark ? 'bg-accent/20' : 'bg-accent/15'"
      />
      <div
        class="absolute right-0 top-32 h-80 w-80 rounded-full blur-3xl"
        :class="isDark ? 'bg-accent-2/20' : 'bg-accent-2/15'"
      />
      <div
        class="absolute bottom-10 left-1/3 h-64 w-64 rounded-full blur-3xl"
        :class="isDark ? 'bg-white/5' : 'bg-slate-200/60'"
      />
    </div>

    <header
      class="sticky top-0 z-30 border-b backdrop-blur-xl"
      :class="
        isDark
          ? 'border-white/5 bg-night/80'
          : 'border-slate-200/80 bg-white/80 text-slate-900'
      "
    >
      <div class="flex w-full items-center justify-between px-4 py-3 md:px-6">
        <div class="flex items-center gap-3">
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 text-lg font-semibold text-night shadow-glow"
          >
            <img
              src="/images/logo-black.webp"
              alt="MobWebTech logo"
              class="h-11 w-11 shrink-0 rounded-xl object-contain"
            />
          </div>
          <div>
            <div class="font-display text-lg font-semibold">MobWebTech</div>
            <p class="text-xs text-slate-400">{{ t("header.tagline") }}</p>
          </div>
        </div>

        <nav
          class="hidden nav-wide items-center gap-6 text-sm font-medium"
          :class="isDark ? 'text-slate-200' : 'text-slate-700'"
        >
          <a
            v-for="item in navItems"
            :key="item.href"
            :class="isDark ? 'hover:text-white' : 'hover:text-slate-900'"
            :href="item.href"
          >
            {{ item.label }}
          </a>
        </nav>

        <div class="flex items-center gap-3">
          <div
            class="hidden locale-wide items-center gap-1 text-xs font-semibold"
            :class="isDark ? 'text-slate-200' : 'text-slate-700'"
          >
            <button
              v-for="option in localeOptions"
              :key="option.code"
              class="rounded-full border px-3 py-1 transition"
              :class="
                option.code === locale
                  ? isDark
                    ? 'border-accent/70 bg-accent text-night shadow-glow'
                    : 'border-accent/80 bg-accent text-white shadow'
                  : isDark
                  ? 'border-white/10 bg-white/5 hover:border-white/20'
                  : 'border-slate-200 bg-white/80 hover:border-slate-300'
              "
              type="button"
              @click="changeLocale(option.code)"
            >
              {{ option.label }}
            </button>
          </div>
          <button
            class="flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition hover:-translate-y-0.5"
            :class="
              isDark
                ? 'border-white/10 bg-white/10 text-white hover:border-white/20'
                : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'
            "
            type="button"
            @click="toggleTheme"
          >
            <span v-if="isDark">☀️</span>
            <span v-else>🌙</span>
          </button>
          <button
            class="flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition hover:-translate-y-0.5 hamburger-only"
            :class="
              isDark
                ? 'border-white/10 bg-white/10 text-white hover:border-white/20'
                : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'
            "
            type="button"
            @click="mobileOpen = !mobileOpen"
            aria-label="Toggle navigation"
          >
            <span v-if="!mobileOpen">☰</span>
            <span v-else>✕</span>
          </button>
          <a
            class="hidden cta-wide rounded-full px-4 py-2 text-sm font-semibold shadow-glow transition hover:translate-y-0.5 hover:shadow-lg"
            :class="isDark ? 'bg-accent text-night' : 'bg-accent !text-white'"
            href="#contact"
          >
            {{ t("hero.ctaSecondary") }}
          </a>
        </div>
      </div>

      <div
        v-if="mobileOpen"
        class="mobile-menu border-t px-4 py-4"
        :class="
          isDark
            ? 'border-white/10 bg-night'
            : 'border-slate-200/80 bg-white/95 text-slate-900'
        "
      >
        <div class="flex flex-col gap-3">
          <a
            v-for="item in navItems"
            :key="item.href"
            class="text-base font-semibold"
            :class="
              isDark
                ? 'text-slate-100 hover:text-white'
                : 'text-slate-800 hover:text-slate-900'
            "
            :href="item.href"
            @click="mobileOpen = false"
          >
            {{ item.label }}
          </a>
          <div class="flex flex-wrap items-center gap-2 pt-2">
            <button
              v-for="option in localeOptions"
              :key="option.code"
              class="rounded-full border px-3 py-1 text-xs font-semibold transition"
              :class="
                option.code === locale
                  ? isDark
                    ? 'border-accent/70 bg-accent text-night shadow-glow'
                    : 'border-accent/80 bg-accent text-white shadow'
                  : isDark
                  ? 'border-white/10 bg-white/5 hover:border-white/20 text-slate-200'
                  : 'border-slate-200 bg-white/90 hover:border-slate-300 text-slate-700'
              "
              type="button"
              @click="
                changeLocale(option.code);
                mobileOpen = false;
              "
            >
              {{ option.label }}
            </button>
          </div>
          <a
            class="inline-flex items-center justify-center rounded-full px-4 py-3 text-sm font-semibold shadow-glow transition hover:-translate-y-0.5 hover:shadow-lg"
            :class="isDark ? 'bg-accent text-night' : 'bg-accent !text-white'"
            href="#contact"
            @click="mobileOpen = false"
          >
            {{ t("hero.ctaSecondary") }}
          </a>
        </div>
      </div>
    </header>

    <main class="relative z-10">
      <slot />
    </main>

    <footer
      class="border-t"
      :class="
        isDark
          ? 'border-white/5 bg-night/80'
          : 'border-slate-200/80 bg-white/80 text-slate-900'
      "
    >
      <div class="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 md:px-6">
        <div
          class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
        >
          <p class="font-display text-lg font-semibold">MobWebTech</p>
          <div
            class="flex flex-wrap items-center gap-2 text-sm"
            :class="isDark ? 'text-slate-300' : 'text-slate-600'"
          >
            <span>Rīga, Ausekļu 3</span>
            <span class="text-slate-400">·</span>
            <span>+37123234704</span>
            <span class="text-slate-400">·</span>
            <a
              class="underline-offset-2 hover:underline"
              :class="isDark ? 'text-slate-200' : 'text-slate-700'"
              href="mailto:mobwebtech.latvia@gmail.com"
            >
              mobwebtech.latvia@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const isDark = useState("theme-dark", () => true);

const { t, locale, locales, setLocale } = useI18n();
const navItems = computed(() => [
  { label: t("nav.about"), href: "#about" },
  { label: t("nav.services"), href: "#services" },
  { label: t("nav.portfolio"), href: "#portfolio" },
  { label: t("nav.testimonials"), href: "#testimonials" },
  { label: t("nav.contact"), href: "#contact" },
]);

const localeOptions = computed(() =>
  (locales.value || []).map((loc: any) => {
    const code = typeof loc === "string" ? loc : loc.code;
    return { code, label: code?.toUpperCase?.() ?? code };
  })
);

const applyThemeClass = () => {
  if (!process.client) return;
  document.documentElement.classList.toggle("dark", isDark.value);
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  applyThemeClass();
  if (process.client) {
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
  }
};

onMounted(() => {
  if (!process.client) return;
  const stored = localStorage.getItem("theme");
  if (stored) {
    isDark.value = stored === "dark";
  } else {
    isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  applyThemeClass();
});

const changeLocale = async (code: string) => {
  if (code === locale.value) return;
  await setLocale(code);
};

const mobileOpen = ref(false);
</script>

<style scoped>
.nav-wide,
.locale-wide,
.cta-wide {
  display: none;
}

.hamburger-only {
  display: flex;
}

.mobile-menu {
  display: block;
}

@media (min-width: 1160px) {
  .nav-wide {
    display: flex;
  }
  .locale-wide {
    display: flex;
  }
  .cta-wide {
    display: inline-flex;
  }
  .hamburger-only {
    display: none;
  }
  .mobile-menu {
    display: none !important;
  }
}
</style>
