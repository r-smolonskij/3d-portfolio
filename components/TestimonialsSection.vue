<template>
  <section id="testimonials" v-reveal class="space-y-5 scroll-mt-24">
    <p class="text-sm uppercase tracking-[0.2em] text-slate-400">
      {{ t("nav.testimonials") }}
    </p>
    <div
      class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <h3
        class="font-display text-3xl font-semibold"
        :class="isDark ? 'text-white' : 'text-slate-900'"
      >
        {{ t("testimonials.title") }}
      </h3>
      <p class="max-w-xl" :class="isDark ? 'text-slate-300' : 'text-slate-600'">
        {{ t("testimonials.subtitle") }}
      </p>
    </div>

    <div
      class="overflow-hidden rounded-3xl border p-6 backdrop-blur-xl"
      :class="
        isDark
          ? 'border-white/5 bg-white/5'
          : 'border-slate-200/70 bg-white/90 shadow-xl'
      "
    >
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-2xl text-xl"
            :class="isDark ? 'bg-accent/20' : 'bg-accent/30 text-night'"
          >
            ⭐️
          </div>
          <div>
            <p class="text-sm uppercase tracking-[0.15em] text-accent">
              {{ t("testimonials.badge") }}
            </p>
            <p
              class="text-lg font-semibold"
              :class="isDark ? 'text-white' : 'text-slate-900'"
            >
              {{ t("testimonials.highlight") }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            class="rounded-full border p-2 transition hover:-translate-y-0.5"
            :class="
              isDark
                ? 'border-white/10 bg-white/10 text-slate-100 hover:border-white/20'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            "
            type="button"
            @click="prevSlide"
          >
            ‹
          </button>
          <button
            class="rounded-full border p-2 transition hover:-translate-y-0.5"
            :class="
              isDark
                ? 'border-white/10 bg-white/10 text-slate-100 hover:border-white/20'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            "
            type="button"
            @click="nextSlide"
          >
            ›
          </button>
        </div>
      </div>

      <div class="relative mt-6 overflow-hidden">
        <div
          class="flex transition-transform duration-500"
          :style="{
            width: `${slides.length * 100}%`,
            transform: slides.length
              ? `translateX(-${(activeSlide * 100) / slides.length}%)`
              : 'translateX(0)',
          }"
        >
          <div
            v-for="(slide, slideIndex) in slides"
            :key="slideIndex"
            class="shrink-0 px-1"
            :style="{ width: `${100 / slides.length}%` }"
          >
            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <article
                v-for="(testimonial, index) in slide"
                :key="testimonial.name + index"
                class="space-y-4 rounded-2xl p-6 shadow-inner"
                :class="
                  isDark
                    ? 'bg-gradient-to-br from-night-400 via-night to-night-500/70 border border-white/10'
                    : 'bg-gradient-to-br from-slate-100 via-white to-slate-50 border border-slate-200/70 shadow-lg'
                "
              >
                <p
                  class="text-lg"
                  :class="isDark ? 'text-slate-100' : 'text-slate-900'"
                >
                  “{{ testimonial.quote?.loc?.source }}”
                </p>
                <div class="flex items-center gap-3">
                  <div
                    class="flex h-12 w-12 items-center justify-center rounded-full text-xl"
                    :class="
                      isDark
                        ? 'bg-white/10 text-white'
                        : 'bg-accent/30 text-night'
                    "
                  >
                    {{ testimonial.initials?.loc?.source }}
                  </div>
                  <div>
                    <p
                      class="font-semibold"
                      :class="isDark ? 'text-white' : 'text-slate-900'"
                    >
                      {{ testimonial.name?.loc?.source }}
                    </p>
                    <!-- <p
                      class="text-sm"
                      :class="isDark ? 'text-slate-400' : 'text-slate-600'"
                    >
                      {{ testimonial.role }}
                    </p> -->
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 flex items-center justify-center gap-2">
        <button
          v-for="(_, index) in slides"
          :key="index"
          class="h-2.5 w-2.5 rounded-full border transition"
          :class="
            index === activeSlide
              ? isDark
                ? 'border-white bg-white'
                : 'border-slate-700 bg-slate-700'
              : isDark
              ? 'border-white/20 bg-white/10'
              : 'border-slate-200 bg-slate-100'
          "
          type="button"
          @click="goToSlide(index)"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const isDark = useState("theme-dark", () => true);
const { t, tm } = useI18n();

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

const perSlide = 3;

const testimonials = computed<Testimonial[]>(() => {
  const val = tm("testimonials.items") as unknown;
  const items = Array.isArray(val) ? val : [];
  return items.map((item: any) => ({
    quote: item?.quote ?? "",
    name: item?.name ?? "",
    role: item?.role ?? "",
    initials: item?.initials ?? "",
  }));
});

const slides = computed<Testimonial[][]>(() => {
  const chunks: Testimonial[][] = [];
  const all = testimonials.value;
  for (let i = 0; i < all.length; i += perSlide) {
    chunks.push(all.slice(i, i + perSlide));
  }
  return chunks;
});

const activeSlide = ref(0);
const autoplayTimer = ref<ReturnType<typeof setInterval> | null>(null);

const goToSlide = (index: number) => {
  const total = slides.value.length;
  if (!total) return;
  activeSlide.value = ((index % total) + total) % total;
  restartAutoplay();
};

const nextSlide = () => goToSlide(activeSlide.value + 1);
const prevSlide = () => goToSlide(activeSlide.value - 1);

const restartAutoplay = () => {
  if (autoplayTimer.value) clearInterval(autoplayTimer.value);
  const total = slides.value.length;
  if (!total) return;
  autoplayTimer.value = setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % total;
  }, 6500);
};

watch(
  () => slides.value.length,
  (len) => {
    if (!len) return;
    activeSlide.value = 0;
    restartAutoplay();
  }
);

onMounted(() => restartAutoplay());
onBeforeUnmount(() => {
  if (autoplayTimer.value) clearInterval(autoplayTimer.value);
});
</script>
