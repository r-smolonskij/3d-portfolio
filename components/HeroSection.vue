<template>
  <section
    v-reveal
    class="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-center"
  >
    <div class="space-y-6">
      <div
        class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em]"
        :class="
          isDark
            ? 'border border-white/10 bg-white/5 text-slate-300'
            : 'border border-slate-200/70 bg-white/90 text-slate-700 shadow-sm'
        "
      >
        <span class="h-2 w-2 rounded-full bg-accent shadow-glow" />
        {{ t('hero.badge') }}
      </div>
      <h1
        class="font-display text-4xl font-semibold leading-tight sm:text-5xl"
        :class="isDark ? 'text-white' : 'text-slate-900'"
      >
        {{ t('hero.title') }}
      </h1>
      <p
        class="max-w-2xl text-lg sm:text-xl"
        :class="isDark ? 'text-slate-300' : 'text-slate-700'"
      >
        {{ t('hero.subtitle') }}
      </p>
      <div class="flex flex-wrap items-center gap-3">
        <a
          class="inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold shadow-glow transition hover:-translate-y-0.5 hover:shadow-lg"
          :class="isDark ? 'bg-accent text-night' : 'bg-accent !text-white'"
          href="#contact"
        >
          <span>{{ t('hero.ctaPrimary') }}</span>
        </a>
        <a
          class="inline-flex items-center gap-2 rounded-full border px-5 py-3 font-semibold transition hover:-translate-y-0.5"
          :class="
            isDark
              ? 'border-white/10 text-slate-200 hover:bg-white/10'
              : 'border-slate-300 text-slate-800 hover:bg-white'
          "
          href="#portfolio"
        >
          {{ t('nav.portfolio') }}
        </a>
      </div>
      <div class="grid gap-3 sm:grid-cols-3">
        <div
          v-for="(metric, index) in metricItems"
          :key="index"
          class="rounded-2xl p-4"
          :class="
            isDark
              ? 'glass'
              : 'border border-slate-200/70 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-md'
          "
        >
          <p
            class="text-sm"
            :class="isDark ? 'text-slate-400' : 'text-slate-600'"
          >
            {{ metric.label }}
          </p>
          <p
            class="mt-2 text-xl font-semibold"
            :class="isDark ? 'text-white' : 'text-slate-900'"
          >
            {{ metric.caption }}
          </p>
        </div>
      </div>
    </div>
    <ClientOnly>
      <HeroCanvas />
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
const isDark = useState("theme-dark", () => true);
const { t } = useI18n();

const metricItems = computed(() => [
  { label: t("about.metrics.projects"), caption: t("about.metricCaptions.projects") },
  { label: t("about.metrics.satisfaction"), caption: t("about.metricCaptions.satisfaction") },
  { label: t("about.metrics.response"), caption: t("about.metricCaptions.response") },
]);
</script>
