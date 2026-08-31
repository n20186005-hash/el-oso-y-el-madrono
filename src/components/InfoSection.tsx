import { useTranslations, useMessages } from 'next-intl';
import RichInline from './RichInline';

export default function InfoSection() {
  const t = useTranslations('knowledge');
  const messages = useMessages() as any;
  const sections = (messages?.knowledge?.sections || []) as Array<{ id: string; title: string; content: string }>;
  const sourcesTitle = messages?.knowledge?.sourcesTitle as string | undefined;
  const sources = (messages?.knowledge?.sources || []) as Array<{ id: string; author: string; title: string; pub: string }>;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-12 mx-auto" style={{ background: 'var(--accent)' }} />

        <div className="space-y-12">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={`flex flex-col md:flex-row gap-6 items-start ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="flex-1 w-full bg-white/5 p-8 rounded-2xl border border-white/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg" style={{ background: 'var(--accent)', color: 'white' }}>
                    {index + 1}
                  </div>
                  <h3
                    className="font-display text-2xl font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {section.title}
                  </h3>
                </div>
                <p
                  className="text-lg leading-relaxed ml-14"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <RichInline text={section.content} />
                </p>
              </div>
            </div>
          ))}
        </div>

        {sourcesTitle && sources.length > 0 && (
          <div className="mt-20 pt-10 border-t border-white/10">
            <h3
              className="font-display text-2xl font-semibold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              {sourcesTitle}
            </h3>
            <ul className="space-y-4 list-none pl-0">
              {sources.map((s) => (
                <li
                  key={s.id}
                  className="bg-white/5 p-5 rounded-xl border border-white/10"
                >
                  <div
                    className="text-base leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{s.author}.</span>{' '}
                    <em style={{ color: 'var(--text-primary)' }}>{s.title}</em>.{' '}
                    {s.pub}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
