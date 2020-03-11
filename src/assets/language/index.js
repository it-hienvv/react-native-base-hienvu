import I18nTran from 'i18n-js';
import vi from './vi.json';
import en from './en.json';
const lang = 'vi';
I18nTran.fallbacks = true;
I18nTran.defaultLocale = lang;
I18nTran.locale = lang;
I18nTran.translations = {
	vi: vi,
	'vi-VN': vi,
	'en-GB': en,
	en: en,
};

export default I18nTran;
