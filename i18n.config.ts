import lv from './locales/lv.json';
import en from './locales/en.json';
import ru from './locales/ru.json';

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  locales: [
      { code: 'lv', language: 'lv-LV' },
      { code: 'ru', language: 'ru-RU' },
      { code: 'en', language: 'en-US' }
  ],
  messages: { lv, en, ru },
})); 
