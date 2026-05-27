import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const officialLinks = [
    {
      key: 'spainTourism',
      url: 'https://www.spain.info/',
      labels: { zh: '西班牙国家旅游局', en: 'Spain.info Official Tourism', es: 'Turismo de España' }
    },
    {
      key: 'madridRegion',
      url: 'https://www.comunidad.madrid/',
      labels: { zh: '马德里大区官方旅游局', en: 'Comunidad de Madrid', es: 'Comunidad de Madrid' }
    },
    {
      key: 'madridCity',
      url: 'https://www.esmadrid.com/',
      labels: { zh: '马德里市政府官方旅游局', en: 'Ayuntamiento de Madrid', es: 'Ayuntamiento de Madrid' }
    },
    {
      key: 'madridMemory',
      url: 'https://www.memoriademadrid.es/',
      labels: { zh: '马德里记忆数字档案库', en: 'Memoria de Madrid', es: 'Memoria de Madrid' }
    },
    {
      key: 'madridHeritage',
      url: 'https://monumentamadrid.es/AM_Portada/AM_Portada_WEB/index2.htm',
      labels: { zh: '马德里市议会城市景观与文化遗产总局', en: 'Monumenta Madrid', es: 'Monumenta Madrid' }
    }
  ];

  return (
    <footer
      className="py-12 px-4 sm:px-6"
      style={{ background: 'var(--bg-tertiary)', borderTop: '1px solid var(--border-color)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-8">
          <div className="max-w-md">
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                {t('brandName')}
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {t('brandSubtitle')}
              </p>
            </div>
            <h3 className="font-display text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              {t('officialResourcesTitle')}
            </h3>
            <div className="flex flex-col gap-2">
              {officialLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-sm"
                  style={{ color: 'var(--accent)' }}
                >
                  {link.labels[locale as keyof typeof link.labels] || link.labels.en}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm mt-4 sm:mt-0">
            <a href={`${prefix}/privacy-policy`} style={{ color: 'var(--text-secondary)' }} className="hover:underline">
              {t('privacy')}
            </a>
            <a href={`${prefix}/terms-of-service`} style={{ color: 'var(--text-secondary)' }} className="hover:underline">
              {t('terms')}
            </a>
            <a href={`${prefix}/cookie-settings`} style={{ color: 'var(--text-secondary)' }} className="hover:underline">
              {t('cookies')}
            </a>
          </div>
        </div>

        <div
          className="pt-6 text-center text-sm space-y-4"
          style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
        >
          <p>{t('rights')}</p>
          <p className="text-xs max-w-3xl mx-auto leading-relaxed">{t('disclaimer')}</p>
        </div>
      </div>
    </footer>
  );
}
