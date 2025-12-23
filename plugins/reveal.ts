import type { DirectiveBinding } from 'vue';

type RevealDirection = 'up' | 'left' | 'right' | 'down';

export default defineNuxtPlugin((nuxtApp) => {
  const directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding<RevealDirection>) {
      if (!process.client) return;
      const direction = binding.value || 'up';
      el.dataset.reveal = direction;
      el.classList.add('reveal-init');

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              el.classList.add('reveal-visible');
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(el);
    },
    getSSRProps() {
      return {};
    }
  };

  nuxtApp.vueApp.directive('reveal', directive);
});
