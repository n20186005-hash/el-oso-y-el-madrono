import { useTranslations, useMessages } from 'next-intl';
import RichInline from './RichInline';

export default function Intro() {
  const t = useTranslations('intro');
  const tCrumb = useTranslations('breadcrumbs');
  const tOff = useTranslations('officialManagement');
  const messages = useMessages() as any;
  const items: string[] = messages?.intro?.visitGuide?.items || [];
  const alsoKnownAsItems: string[] = messages?.intro?.alsoKnownAs?.items || [];

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <nav
          aria-label="Geographic breadcrumb"
          className="mb-6 text-sm tracking-wide flex flex-wrap items-center gap-2"
          style={{ color: 'var(--text-muted)' }}
        >
          <span style={{ color: 'var(--accent)' }}>{tCrumb('attraction')}</span>
          <span aria-hidden="true"> {tCrumb('separator')} </span>
          <span>{tCrumb('city')}</span>
          <span aria-hidden="true"> {tCrumb('separator')} </span>
          <span>{tCrumb('region')}</span>
          <span aria-hidden="true"> {tCrumb('separator')} </span>
          <span>{tCrumb('country')}</span>
        </nav>

        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <p
          className="text-lg leading-relaxed mb-6 first-letter:font-semibold"
          style={{ color: 'var(--text-secondary)' }}
        >
          <RichInline text={t('equivalenceStatement')} />
        </p>

        <p
          className="text-lg leading-relaxed mb-6"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('description')}
        </p>

        <p
          className="text-lg leading-relaxed mb-12"
          style={{ color: 'var(--text-secondary)' }}
        >
          <RichInline text={t('nearbyCluster')} />
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="rounded-xl p-6 sm:p-8"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <h3
              className="font-display text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('visitGuide.title')}
            </h3>
            <ul className="space-y-3">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-xl p-6 sm:p-8"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <h3
              className="font-display text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('alsoKnownAs.title')}
            </h3>
            <ul className="space-y-3">
              {alsoKnownAsItems.map((keyword, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{keyword}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 p-6 sm:p-8 rounded-xl border border-[var(--accent)]" style={{ background: 'var(--bg-tertiary)' }}>
          <h2 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            {tOff('title')}
          </h2>
          <div className="text-base leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-secondary)' }}>
            {tOff('text')}
          </div>
        </div>
      </div>
    </section>
  );
}
