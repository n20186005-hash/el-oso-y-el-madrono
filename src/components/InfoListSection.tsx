import { useTranslations, useMessages } from 'next-intl';
import RichInline from './RichInline';

type SectionKey =
  | 'amenities'
  | 'parking'
  | 'foodDrink'
  | 'lodging'
  | 'services'
  | 'photoEtiquette';

type Props = {
  sectionKey: SectionKey;
  alternate?: boolean;
};

export default function InfoListSection({ sectionKey, alternate = false }: Props) {
  const t = useTranslations(sectionKey);
  const messages = useMessages() as any;
  const section = messages?.[sectionKey] as
    | {
        title: string;
        subtitle?: string;
        intro?: string;
        tip?: string;
        items: Array<{ id: string; title: string; desc: string }>;
      }
    | undefined;

  if (!section || !section.items?.length) return null;

  const bgStyle = alternate
    ? { background: 'var(--bg-primary)' }
    : { background: 'var(--bg-secondary)' };

  const tipPrefix: Record<SectionKey, string> = {
    amenities: 'ℹ️  Consejo：',
    parking: 'ℹ️  Recordatorio：',
    foodDrink: 'ℹ️  Sugerencia：',
    lodging: 'ℹ️  Nota：',
    services: '⚠️  En caso de emergencia：',
    photoEtiquette: '🧹  Buenas prácticas：',
  };

  return (
    <section className="section-padding" style={bgStyle}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 text-center">
          <h2
            className="font-display text-3xl sm:text-4xl font-semibold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('title')}
          </h2>
          {section.subtitle && (
            <p
              className="text-base sm:text-lg max-w-3xl mx-auto"
              style={{ color: 'var(--text-muted)' }}
            >
              {t('subtitle')}
            </p>
          )}
          <div className="w-12 h-0.5 mt-6 mx-auto" style={{ background: 'var(--accent)' }} />
        </div>

        {section.intro && (
          <div
            className="mb-10 p-6 rounded-2xl border border-white/10"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              <RichInline text={t('intro')} />
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {section.items.map((item, idx) => (
            <article
              key={item.id}
              className="p-6 rounded-2xl border border-white/10 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              style={{ background: 'var(--bg-tertiary)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center font-bold text-sm"
                  style={{ background: 'var(--accent)', color: 'white' }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h3
                  className="font-display text-xl font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {t(`items.${idx}.title`)}
                </h3>
              </div>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                <RichInline text={t(`items.${idx}.desc`)} />
              </p>
            </article>
          ))}
        </div>

        {section.tip && (
          <div
            className="mt-10 p-5 rounded-xl border-l-4"
            style={{
              background: 'var(--bg-tertiary)',
              borderLeftColor: 'var(--accent)',
            }}
          >
            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              <strong className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                {tipPrefix[sectionKey]}
              </strong>
              <RichInline text={t('tip')} />
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
