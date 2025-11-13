import { Env } from '@/libs/Env';
import { routing } from '@/libs/I18nRouting';

export const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_APP_URL || Env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
};

export const getI18nPath = (url: string, locale: string) => {
  if (locale === routing.defaultLocale) {
    return url;
  }

  return `/${locale}${url}`;
};
