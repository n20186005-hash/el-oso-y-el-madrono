import { redirect } from 'next/navigation';
import { routing } from '@/i18n/routing';

// For static exports, redirect to the configured default locale.
// For dynamic deployments, the next-intl middleware intercepts `/`
// and redirects to the default locale (e.g. `/es`) at the edge.
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}