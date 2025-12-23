<template>
  <section
    id="contact"
    v-reveal
    class="grid scroll-mt-24 gap-8 rounded-3xl border p-8 backdrop-blur-xl lg:grid-cols-[1fr,1.1fr]"
    :class="
      isDark
        ? 'border-white/5 bg-white/5'
        : 'border-slate-200/80 bg-white/90 shadow-xl'
    "
  >
    <div class="space-y-4">
      <p class="text-sm uppercase tracking-[0.2em] text-slate-400">
        {{ t("nav.contact") }}
      </p>
      <h3
        class="font-display text-3xl font-semibold"
        :class="isDark ? 'text-white' : 'text-slate-900'"
      >
        {{ t("contact.title") }}
      </h3>
      <p :class="isDark ? 'text-slate-300' : 'text-slate-600'">
        {{ t("contact.subtitle") }}
      </p>
      <div
        class="space-y-3 text-sm"
        :class="isDark ? 'text-slate-200' : 'text-slate-700'"
      >
        <div class="flex items-center gap-3">
          <span
            class="flex h-10 w-10 items-center justify-center rounded-xl text-lg"
            :class="isDark ? 'bg-white/10' : 'bg-slate-100 text-slate-700'"
            >📍</span
          >
          <div>
            <p class="font-semibold">{{ t("contact.addressLabel") }}</p>
            <p :class="isDark ? 'text-slate-400' : 'text-slate-500'">
              Rīga, Ausekļu iela 3
            </p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span
            class="flex h-10 w-10 items-center justify-center rounded-xl text-lg"
            :class="isDark ? 'bg-white/10' : 'bg-slate-100 text-slate-700'"
            >📞</span
          >
          <div>
            <p class="font-semibold">{{ t("contact.phoneLabel") }}</p>
            <p :class="isDark ? 'text-slate-400' : 'text-slate-500'">
              +37123234704
            </p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span
            class="flex h-10 w-10 items-center justify-center rounded-xl text-lg"
            :class="isDark ? 'bg-white/10' : 'bg-slate-100 text-slate-700'"
            >✉️</span
          >
          <div>
            <p class="font-semibold">{{ t("contact.emailLabel") }}</p>
            <a
              class="underline-offset-2 hover:underline"
              :class="isDark ? 'text-slate-300' : 'text-slate-700'"
              href="mailto:mobwebtech.latvia@gmail.com"
            >
              mobwebtech.latvia@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
    <div
      class="relative overflow-hidden rounded-2xl p-6 shadow-2xl"
      :class="
        isDark ? 'glass border-white/10' : 'bg-white border border-slate-200/80'
      "
    >
      <form v-if="!sent" class="space-y-4" @submit.prevent="handleSubmit">
        <div>
          <label
            class="text-sm"
            :class="isDark ? 'text-slate-300' : 'text-slate-700'"
            for="name"
            >{{ t("contact.form.name") }}</label
          >
          <input
            id="name"
            v-model="form.name"
            required
            class="mt-2 w-full rounded-xl border px-4 py-3 outline-none transition focus:border-accent"
            :class="
              isDark
                ? 'border-white/10 bg-white/5 text-white'
                : 'border-slate-200 bg-white text-slate-900'
            "
            type="text"
          />
        </div>
        <div>
          <label
            class="text-sm"
            :class="isDark ? 'text-slate-300' : 'text-slate-700'"
            for="email"
            >{{ t("contact.form.email") }}</label
          >
          <input
            id="email"
            v-model="form.email"
            required
            class="mt-2 w-full rounded-xl border px-4 py-3 outline-none transition focus:border-accent"
            :class="
              isDark
                ? 'border-white/10 bg-white/5 text-white'
                : 'border-slate-200 bg-white text-slate-900'
            "
            type="email"
          />
        </div>
        <div>
          <label
            class="text-sm"
            :class="isDark ? 'text-slate-300' : 'text-slate-700'"
            for="message"
            >{{ t("contact.form.message") }}</label
          >
          <textarea
            id="message"
            v-model="form.message"
            required
            rows="4"
            class="mt-2 w-full rounded-xl border px-4 py-3 outline-none transition focus:border-accent"
            :class="
              isDark
                ? 'border-white/10 bg-white/5 text-white'
                : 'border-slate-200 bg-white text-slate-900'
            "
          />
        </div>
        <button
          class="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-4 py-3 font-semibold shadow-glow sendBtn transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
          :class="isDark ? 'text-night' : '!text-white'"
          type="submit"
          :disabled="sending"
        >
          <svg
            v-if="sending"
            class="h-4 w-4 animate-spin text-white/90 -mb-px"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          {{ sending ? t("contact.form.sending") : t("contact.form.submit") }}
        </button>
        <p v-if="submitted" class="text-sm text-accent">
          {{ t("contact.form.success") }}
        </p>
        <p v-if="errorMessage" class="text-sm text-red-500">
          {{ errorMessage }}
        </p>
      </form>

      <div
        v-else
        class="relative flex h-full min-h-[260px] flex-col items-center justify-center gap-4"
      >
        <canvas
          ref="confettiCanvas"
          class="absolute inset-0 pointer-events-none"
        />
        <div class="relative z-10 text-center">
          <p class="text-sm uppercase tracking-[0.2em] text-accent">
            {{ t("contact.form.submit") }}
          </p>
          <p
            class="mt-2 text-2xl font-semibold"
            :class="isDark ? 'text-white' : 'text-slate-900'"
          >
            {{ t("contact.form.success") }}
          </p>
          <button
            class="mt-5 w-full rounded-full bg-gradient-to-r from-accent to-accent-2 px-4 py-3 text-sm font-semibold shadow-glow transition hover:-translate-y-0.5 hover:shadow-lg"
            :class="isDark ? 'text-night' : '!text-white'"
            type="button"
            @click="resetForm"
          >
            {{ t("contact.form.sendAnother") }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const form = reactive({
  name: "",
  email: "",
  message: "",
});

const submitted = ref(false);
const sent = ref(false);
const sending = ref(false);
const errorMessage = ref("");
const confettiCanvas = ref<HTMLCanvasElement | null>(null);
let confettiFrame: number | null = null;
let confettiTimer: number | null = null;
const isDark = useState("theme-dark", () => true);
const { t } = useI18n();

const handleSubmit = async () => {
  if (sending.value) return;
  sending.value = true;
  submitted.value = false;
  errorMessage.value = "";

  try {
    await $fetch("/api/contact", {
      method: "POST",
      body: {
        name: form.name,
        email: form.email,
        message: form.message,
      },
    });
    submitted.value = true;
    form.name = "";
    form.email = "";
    form.message = "";
    startConfetti();
  } catch (error) {
    console.error("Failed to send message", error);
    errorMessage.value = t("contact.form.error");
  } finally {
    sending.value = false;
  }
};

const startConfetti = () => {
  sent.value = true;
  if (confettiTimer) clearTimeout(confettiTimer);

  const canvas = confettiCanvas.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const resize = () => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  };
  resize();

  const colors = ["#52e1e2", "#6f7cff", "#f8fafc", "#fcd34d", "#f472b6"];
  const pieces = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    w: 8 + Math.random() * 6,
    h: 12 + Math.random() * 8,
    velY: 2 + Math.random() * 3,
    velX: -2 + Math.random() * 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * Math.PI,
    rotSpeed: -0.1 + Math.random() * 0.2,
  }));

  const draw = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      p.x += p.velX;
      p.y += p.velY;
      p.rot += p.rotSpeed;

      if (p.y > canvas.height) p.y = -10;
      if (p.x > canvas.width) p.x = -10;
      if (p.x < -10) p.x = canvas.width + 10;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    confettiFrame = requestAnimationFrame(draw);
  };

  if (confettiFrame) cancelAnimationFrame(confettiFrame);
  draw();

  if (confettiTimer) clearTimeout(confettiTimer);
  confettiTimer = window.setTimeout(() => {
    resetForm();
  }, 6000);
};

const resetForm = () => {
  sent.value = false;
  if (confettiFrame) cancelAnimationFrame(confettiFrame);
  confettiFrame = null;
  if (confettiTimer) {
    clearTimeout(confettiTimer);
    confettiTimer = null;
  }
};

onBeforeUnmount(() => {
  if (confettiFrame) cancelAnimationFrame(confettiFrame);
  if (confettiTimer) clearTimeout(confettiTimer);
});
</script>

<style scoped>
.sendBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
</style>
