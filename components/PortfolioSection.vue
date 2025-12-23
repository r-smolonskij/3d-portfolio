<template>
  <section id="portfolio" v-reveal class="space-y-5 scroll-mt-24">
    <p class="text-sm uppercase tracking-[0.2em] text-slate-400">
      {{ t("nav.portfolio") }}
    </p>
    <div
      class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <h3
        class="font-display text-3xl font-semibold"
        :class="isDark ? 'text-white' : 'text-slate-900'"
      >
        {{ t("portfolio.title") }}
      </h3>
      <p class="max-w-xl" :class="isDark ? 'text-slate-300' : 'text-slate-600'">
        {{ t("portfolio.subtitle") }}
      </p>
    </div>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="filter in filters"
        :key="filter"
        class="rounded-full border px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5"
        :class="
          activeFilter === filter
            ? isDark
              ? 'border-accent/60 bg-accent text-night'
              : 'border-accent/80 bg-accent !text-white'
            : isDark
            ? 'border-white/10 bg-white/5 text-slate-200 hover:border-white/20'
            : 'border-slate-200 bg-white/90 text-slate-700 shadow-sm hover:border-slate-300'
        "
        @click="activeFilter = filter"
      >
        {{ t(`portfolio.filters.${filterKey(filter)}`) }}
      </button>
    </div>
    <div class="grid gap-6 md:grid-cols-3">
      <article
        v-for="(item, index) in filteredPortfolio"
        :key="index"
        class="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border transition hover:-translate-y-1"
        :class="
          isDark
            ? 'border-white/5 bg-white/5 hover:border-white/15'
            : 'border-slate-200/70 bg-white/90 shadow-lg hover:border-slate-300'
        "
        @click="openModal(item, index)"
      >
        <div class="relative h-44 w-full overflow-hidden">
          <img
            :src="item.image"
            :alt="item.title?.loc?.source"
            class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div
            class="absolute inset-0 bg-gradient-to-br"
            :class="
              isDark
                ? 'from-night/10 via-night/20 to-accent/30'
                : 'from-white/0 via-white/10 to-accent/30'
            "
          />
          <div
            class="absolute bottom-3 left-3 rounded-full px-3 py-1 text-xs font-semibold"
            :class="
              isDark ? 'bg-white/20 text-night' : 'bg-white/80 text-slate-800'
            "
          >
            {{ categoryLabel(item) }}
          </div>
        </div>
        <div class="flex flex-1 flex-col gap-2 p-5">
          <h4
            class="font-display text-xl font-semibold"
            :class="isDark ? 'text-white' : 'text-slate-900'"
          >
            {{ item.title?.loc?.source }}
          </h4>
          <p :class="isDark ? 'text-slate-300' : 'text-slate-600'">
            {{ item.description?.loc?.source }}
          </p>
        </div>
      </article>
    </div>

    <Teleport to="body">
      <div
        v-if="activeItem"
        class="fixed inset-0 z-[120] flex items-center justify-center px-4 py-8 backdrop-blur-lg"
        :class="isDark ? 'bg-night/80' : 'bg-slate-900/40'"
        @click.self="closeModal"
      >
        <div
          class="relative w-full max-w-3xl overflow-hidden rounded-3xl border p-6 shadow-2xl"
          :class="
            isDark
              ? 'border-white/10 bg-night'
              : 'border-slate-200/70 bg-white/95'
          "
        >
          <button
            class="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border shadow-lg transition hover:-translate-y-0.5"
            :class="
              isDark
                ? 'border-red-500/40 bg-red-500/20 text-red-100 hover:bg-red-500/30'
                : 'border-red-200 bg-red-100 text-red-700 hover:bg-red-200'
            "
            type="button"
            @click="closeModal"
          >
            ✕
          </button>
          <div
            class="relative mt-8 w-full overflow-hidden rounded-2xl border"
            :class="isDark ? 'border-white/10' : 'border-slate-200/70'"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br"
              :class="
                isDark
                  ? 'from-night/20 via-accent/20 to-accent-2/10'
                  : 'from-white/10 via-accent/10 to-accent-2/20'
              "
            />
            <div class="relative z-10 flex w-full justify-center p-2">
              <img
                :src="activeItem.detailImage || activeItem.image"
                :alt="activeItem.title"
                class="max-h-[65vh] w-full object-contain rounded-xl"
              />
            </div>
          </div>
          <div class="mt-4 space-y-2">
            <p
              class="inline-flex rounded-full border px-3 py-1 text-xs font-semibold"
              :class="
                isDark
                  ? 'border-white/10 text-slate-200'
                  : 'border-slate-200 text-slate-700 bg-white/80'
              "
            >
              {{ categoryLabel(activeItem) }}
            </p>
            <h4
              class="font-display text-2xl font-semibold"
              :class="isDark ? 'text-white' : 'text-slate-900'"
            >
              {{ activeItem.title?.loc?.source }}
            </h4>
            <p :class="isDark ? 'text-slate-300' : 'text-slate-600'">
              {{ activeItem.description?.loc?.source }}
            </p>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
const isDark = useState("theme-dark", () => true);
const { t, tm } = useI18n();

type PortfolioItem = {
  title: string;
  description: string;
  image: string;
  detailImage?: string;
  categories: FilterOption[];
};

const asset = (file: string) => `/images/projects/${file}`;

enum FilterOption {
  All = "All",
  Websites = "Websites",
  MobileApps = "Mobile apps",
  InternalSystems = "Internal systems for businesses",
}

const filters: FilterOption[] = [
  FilterOption.All,
  FilterOption.Websites,
  FilterOption.MobileApps,
  FilterOption.InternalSystems,
];

const portfolioBase: PortfolioItem[] = [
  {
    title: "CoSafe Mobile",
    description:
      "Emergency readiness with incident logging, alerts, and offline protocols.",
    image: asset("cosafe.webp"),
    categories: [FilterOption.MobileApps, FilterOption.InternalSystems],
  },
  {
    title: "Senior Care",
    description:
      "Caregiver coordination with assessments, med tracking, and tasks.",
    image: asset("senior.webp"),
    categories: [FilterOption.MobileApps, FilterOption.InternalSystems],
  },
  {
    title: "1Touch Business",
    description:
      "Ride, courier, and wallet flows in one streamlined native experience.",
    image: asset("1touch-buisiness.webp"),
    categories: [FilterOption.MobileApps],
  },
  {
    title: "AppointUs Web",
    description:
      "Scheduling marketplace with vendor storefronts and payment automation.",
    image: asset("appoint-us.webp"),
    categories: [FilterOption.Websites],
  },
  {
    title: "1Touch Client",
    description:
      "Everyday rider app with bookings, loyalty, and payment layers.",
    image: asset("1touch.webp"),
    categories: [FilterOption.MobileApps],
  },
  {
    title: "1Touch Client Web",
    description:
      "Dispatching, billing, and partner controls built for high-volume ops.",
    image: asset("1touch-web.webp"),
    categories: [FilterOption.InternalSystems, FilterOption.Websites],
  },
  {
    title: "AppointUs Admin",
    description:
      "Admin hub for schedules, payouts, and vendor lifecycle management.",
    image: asset("appoint-us-admin.webp"),
    categories: [FilterOption.InternalSystems, FilterOption.Websites],
  },
  {
    title: "Graviti",
    description:
      "Installment checkout with eligibility scoring and merchant insights.",
    image: asset("graviti.webp"),
    categories: [FilterOption.MobileApps, FilterOption.InternalSystems],
  },
  {
    title: "AppointUs Client",
    description:
      "Client-side booking app with messaging, reminders, and loyalty perks.",
    image: asset("appoint-us-client.webp"),
    categories: [FilterOption.MobileApps],
  },
];

const activeItem = ref<PortfolioItem | null>(null);
const activeIndex = ref(0);
const activeFilter = ref<FilterOption>(FilterOption.All);

const portfolio = computed<PortfolioItem[]>(() => {
  const translated = tm("portfolio.items") as unknown;
  const items = Array.isArray(translated) ? translated : [];
  return portfolioBase.map((item, idx) => ({
    ...item,
    title: items[idx]?.title ?? item.title,
    description: items[idx]?.description ?? item.description,
  }));
});

const filteredPortfolio = computed(() =>
  activeFilter.value === FilterOption.All
    ? portfolio.value
    : portfolio.value.filter((item) =>
        item.categories.includes(activeFilter.value)
      )
);

const categoryLabel = (item: PortfolioItem) =>
  item.categories
    .map((cat) => t(`portfolio.filters.${filterKey(cat)}`))
    .join(", ");

const filterKey = (filter: FilterOption) => {
  switch (filter) {
    case FilterOption.Websites:
      return "websites";
    case FilterOption.MobileApps:
      return "mobile";
    case FilterOption.InternalSystems:
      return "internal";
    default:
      return "all";
  }
};

const openModal = (item: PortfolioItem, index: number) => {
  activeItem.value = item;
  activeIndex.value = index;
};

const closeModal = () => {
  activeItem.value = null;
};
</script>
