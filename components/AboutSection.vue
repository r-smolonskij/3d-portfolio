<template>
  <section
    id="about"
    v-reveal
    class="grid scroll-mt-24 gap-8 rounded-3xl border p-8 backdrop-blur-xl lg:grid-cols-[1.1fr,0.9fr]"
    :class="
      isDark
        ? 'border-white/5 bg-white/5'
        : 'border-slate-200/70 bg-white/90 shadow-xl'
    "
  >
    <div class="space-y-5">
      <p class="text-sm uppercase tracking-[0.2em] text-slate-400">
        {{ t("nav.about") }}
      </p>
      <h2
        class="font-display text-3xl font-semibold sm:text-4xl"
        :class="isDark ? 'text-white' : 'text-slate-900'"
      >
        {{ t("about.title") }}
      </h2>
      <p :class="isDark ? 'text-slate-300' : 'text-slate-600'">
        {{ t("about.lead") }}
      </p>
      <p :class="isDark ? 'text-slate-300' : 'text-slate-600'">
        {{ t("about.body") }}
      </p>
      <div class="grid gap-3 sm:grid-cols-2">
        <div
          v-for="(feature, index) in seoFeatures"
          :key="index"
          class="flex items-start gap-3 rounded-xl border px-4 py-3"
          :class="
            isDark
              ? 'border-white/10 bg-white/5'
              : 'border-slate-200/70 bg-white/90 shadow-sm'
          "
        >
          <span
            class="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center text-accent"
            >•</span
          >
          <div>
            <p
              class="font-semibold"
              :class="isDark ? 'text-white' : 'text-slate-900'"
            >
              {{ feature.title }}
            </p>
            <p
              class="text-sm"
              :class="isDark ? 'text-slate-300' : 'text-slate-600'"
            >
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="relative flex flex-col gap-4 overflow-hidden rounded-3xl border p-6"
      :class="
        isDark
          ? 'border-white/10 bg-night/60'
          : 'border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-lg'
      "
    >
      <div
        class="absolute -left-10 top-6 h-40 w-40 rounded-full blur-3xl"
        :class="isDark ? 'bg-accent/20' : 'bg-accent/15'"
      />
      <div
        class="absolute -right-12 -bottom-8 h-44 w-44 rounded-full blur-3xl"
        :class="isDark ? 'bg-accent-2/25' : 'bg-accent-2/20'"
      />
      <div class="relative space-y-3">
        <p class="text-sm uppercase tracking-[0.2em] text-accent">
          {{ t("about.capabilitiesLabel") }}
        </p>
        <p
          class="text-2xl font-semibold leading-snug"
          :class="isDark ? 'text-white' : 'text-slate-900'"
        >
          {{ t("about.capabilitiesTitle") }}
        </p>
        <p
          class="text-sm"
          :class="isDark ? 'text-slate-300' : 'text-slate-700'"
        >
          {{ t("about.capabilitiesBody") }}
        </p>
      </div>
      <div class="relative grid gap-3">
        <div
          v-for="(card, index) in capabilityCards"
          :key="index"
          class="flex items-start gap-3 rounded-2xl border px-4 py-3"
          :class="
            isDark
              ? 'border-white/10 bg-white/5'
              : 'border-slate-200/80 bg-white/95 shadow-sm'
          "
        >
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl text-lg shrink-0"
            :class="
              isDark ? 'bg-white/10 text-white' : 'bg-slate-200 text-slate-800'
            "
          >
            {{ card.icon }}
          </div>
          <div class="space-y-1">
            <p
              class="font-semibold"
              :class="isDark ? 'text-white' : 'text-slate-900'"
            >
              {{ card.title }}
            </p>
            <p
              class="text-sm"
              :class="isDark ? 'text-slate-300' : 'text-slate-600'"
            >
              {{ card.body }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const isDark = useState("theme-dark", () => true);
const { t } = useI18n();

const featureEntries = [
  { titleKey: "about.features.0.title", descriptionKey: "about.features.0.description" },
  { titleKey: "about.features.1.title", descriptionKey: "about.features.1.description" },
  { titleKey: "about.features.2.title", descriptionKey: "about.features.2.description" },
  { titleKey: "about.features.3.title", descriptionKey: "about.features.3.description" },
];

const capabilityEntries = [
  { titleKey: "about.capabilities.0.title", bodyKey: "about.capabilities.0.body", icon: "🚀" },
  { titleKey: "about.capabilities.1.title", bodyKey: "about.capabilities.1.body", icon: "📊" },
  { titleKey: "about.capabilities.2.title", bodyKey: "about.capabilities.2.body", icon: "🛡️" },
];

const seoFeatures = computed(() =>
  featureEntries.map((entry) => ({
    title: t(entry.titleKey),
    description: t(entry.descriptionKey),
  }))
);

const capabilityCards = computed(() =>
  capabilityEntries.map((entry) => ({
    title: t(entry.titleKey),
    body: t(entry.bodyKey),
    icon: entry.icon,
  }))
);
</script>
