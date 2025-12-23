<template>
  <section id="technologies" v-reveal class="space-y-5 scroll-mt-24">
    <div class="flex items-center justify-between gap-4">
      <div>
        <p class="text-sm uppercase tracking-[0.2em] text-slate-400">Stack</p>
        <h3
          class="font-display text-3xl font-semibold"
          :class="isDark ? 'text-white' : 'text-slate-900'"
        >
          {{ t('technologies.title') }}
        </h3>
        <p
          class="text-sm"
          :class="isDark ? 'text-slate-400' : 'text-slate-600'"
        >
          {{ t('technologies.subtitle') }}
        </p>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div
        v-for="tech in technologies"
        :key="tech.label"
        class="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:-translate-y-1"
        :class="
          isDark
            ? 'bg-white/5 border border-white/10 glass hover:border-white/20'
            : 'border border-slate-200/70 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-md hover:border-slate-300'
        "
      >
        <div
          class="flex h-10 w-10 items-center justify-center rounded-lg"
          :class="
            isDark ? 'bg-white/10' : 'bg-white border border-slate-200/70'
          "
        >
          <img
            :src="tech.icon"
            :alt="tech.label"
            class="h-8 w-8 object-contain"
          />
        </div>
        <div>
          <p
            class="font-semibold"
            :class="isDark ? 'text-white' : 'text-slate-900'"
          >
            {{ tech.label }}
          </p>
          <p
            class="text-xs"
            :class="isDark ? 'text-slate-400' : 'text-slate-600'"
          >
            {{ tech.tagline }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const isDark = useState("theme-dark", () => true);
const { t } = useI18n();

const moreIcon =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'><circle cx='12' cy='12' r='11' fill='%23e2e8f0'/><path d='M12 7v10M7 12h10' stroke='%234569eb' stroke-width='2' stroke-linecap='round'/></svg>";

const technologies = [
  { label: "Nuxt 3", icon: iconUrl("nuxtjs") },
  { label: "Vue 3", icon: iconUrl("vuejs") },
  { label: "React", icon: iconUrl("react") },
  { label: "React Native", icon: iconUrl("react") },
  { label: "TypeScript", icon: iconUrl("typescript") },
  { label: "JavaScript", icon: iconUrl("javascript") },
  { label: "HTML5", icon: iconUrl("html5") },
  { label: "CSS3", icon: iconUrl("css3") },
  { label: "Tailwind CSS", icon: iconUrl("tailwindcss") },
  { label: "Three.js", icon: iconUrl("threejs") },
  { label: "Node.js", icon: iconUrl("nodejs") },
  { label: "GraphQL", icon: iconUrl("graphql") },
  { label: "SQL", icon: iconUrl("postgresql") },
  { label: "Firebase", icon: iconUrl("firebase") },
  { label: "Supabase", icon: iconUrl("supabase") },
  { label: "And many more", icon: moreIcon },
];

function iconUrl(slug: string) {
  const deviconBase = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
  switch (slug) {
    case "nuxtjs":
      return `${deviconBase}/nuxtjs/nuxtjs-original.svg`;
    case "vuejs":
      return `${deviconBase}/vuejs/vuejs-original.svg`;
    case "react":
      return `${deviconBase}/react/react-original.svg`;
    case "typescript":
      return `${deviconBase}/typescript/typescript-original.svg`;
    case "javascript":
      return `${deviconBase}/javascript/javascript-original.svg`;
    case "html5":
      return `${deviconBase}/html5/html5-original.svg`;
    case "css3":
      return `${deviconBase}/css3/css3-original.svg`;
    case "tailwindcss":
      return "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg";
    case "threejs":
      return `${deviconBase}/threejs/threejs-original.svg`;
    case "nodejs":
      return `${deviconBase}/nodejs/nodejs-original.svg`;
    case "graphql":
      return `${deviconBase}/graphql/graphql-plain.svg`;
    case "postgresql":
      return `${deviconBase}/postgresql/postgresql-original.svg`;
    case "firebase":
      return `${deviconBase}/firebase/firebase-plain.svg`;
    case "supabase":
      return "https://raw.githubusercontent.com/gilbarbara/logos/master/logos/supabase.svg";
    default:
      return `${deviconBase}/javascript/javascript-original.svg`;
  }
}
</script>
