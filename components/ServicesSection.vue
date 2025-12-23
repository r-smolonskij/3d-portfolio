<template>
  <section id="services" v-reveal class="space-y-5 scroll-mt-24">
    <p class="text-sm uppercase tracking-[0.2em] text-slate-400">
      {{ t("nav.services") }}
    </p>
    <div
      class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <h3
        class="font-display text-3xl font-semibold"
        :class="isDark ? 'text-white' : 'text-slate-900'"
      >
        {{ t("services.title") }}
      </h3>
      <p class="max-w-xl" :class="isDark ? 'text-slate-300' : 'text-slate-600'">
        {{ t("services.subtitle") }}
      </p>
    </div>
    <div class="grid gap-4 md:grid-cols-2">
      <article
        v-for="(item, index) in services"
        :key="index"
        class="group relative overflow-hidden rounded-2xl border p-6 transition"
        :class="
          isDark
            ? 'border-white/5 bg-gradient-to-br from-white/5 to-white/0 hover:border-white/15'
            : 'border-slate-200/70 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-lg hover:border-slate-300'
        "
      >
        <div
          class="absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl transition group-hover:scale-125"
          :class="isDark ? 'bg-accent/10' : 'bg-accent/20'"
        />
        <div
          class="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg"
          :class="
            isDark ? 'bg-white/10 text-white' : 'bg-slate-200 text-slate-800'
          "
        >
          {{ serviceIcons[index % serviceIcons.length] }}
        </div>
        <h4
          class="font-display text-xl font-semibold"
          :class="isDark ? 'text-white' : 'text-slate-900'"
        >
          {{ item.title }}
        </h4>
        <p class="mt-2" :class="isDark ? 'text-slate-300' : 'text-slate-600'">
          {{ item.description }}
        </p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
type ServiceItem = {
  title: string;
  description: string;
};

const isDark = useState("theme-dark", () => true);
const { t } = useI18n();

const serviceEntries: { titleKey: string; descriptionKey: string }[] = [
  { titleKey: "services.items.0.title", descriptionKey: "services.items.0.description" },
  { titleKey: "services.items.1.title", descriptionKey: "services.items.1.description" },
  { titleKey: "services.items.2.title", descriptionKey: "services.items.2.description" },
  { titleKey: "services.items.3.title", descriptionKey: "services.items.3.description" },
  { titleKey: "services.items.4.title", descriptionKey: "services.items.4.description" },
  { titleKey: "services.items.5.title", descriptionKey: "services.items.5.description" },
];

const translateEntries = (entries: { titleKey: string; descriptionKey: string }[]) =>
  entries.map((entry) => ({
    title: t(entry.titleKey),
    description: t(entry.descriptionKey),
  }));

const services = computed<ServiceItem[]>(() => translateEntries(serviceEntries));

const serviceIcons = ["📱", "💻", "☁️", "🎨", "🏢", "🧭"];
</script>
