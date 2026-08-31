import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

const SITE_CONFIG = {
  domain: 'elosoyelmadrono.com',
  baseUrl: 'https://elosoyelmadrono.com',
  attractionFullName: 'El Oso y el Madroño',
  attractionShortName: 'El Oso y el Madroño',
  cityName: 'Madrid',
  stateProvince: 'Comunidad de Madrid',
  countryName: { es: 'España', en: 'Spain', zh: '西班牙' },
  countryCode: 'ES',
  postalCode: '28013',
  latitude: 40.4170313,
  longitude: -3.7027423,
  mapsShareUrl: 'https://maps.app.goo.gl/6CeTgviM5Pi9HLreA',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.6306979585643!2d-3.7027423000000006!3d40.417031300000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42287e1994e237%3A0xaf820688ee88e2d1!2z54aK5ZKM5qCR6I6T6ZuV5YOP!5e0!3m2!1szh-CN!2s!4v1788147929433!5m2!1szh-CN!2s',
  govtTourismUrl: 'https://www.esmadrid.com/',
  monumentaOfficialUrl:
    'https://patrimonioypaisaje.madrid.es/portales/monumenta/es/Monumentos-y-Edificios-Singulares/Monumentos/Oso-y-Madrono/?vgnextfmt=default&vgnextoid=e608091d1b9c4510091d1b9c45102e085a0aRCRD&vgnextchannel=8fac3cb702aa4510VgnVCM1000008a4a900aRCRD',
  heroImage: 'https://elosoyelmadrono.com/gallery/el-oso-y-el-madrono%20(1).jpg',
  nearby1: { es: 'Puerta del Sol', en: 'Puerta del Sol', zh: '太阳门广场' },
  nearby2: { es: 'Plaza Mayor', en: 'Plaza Mayor', zh: '马约尔广场' },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const baseUrl = SITE_CONFIG.baseUrl;

  const zhUrl = `${baseUrl}/zh`;
  const enUrl = `${baseUrl}/en`;
  const esUrl = `${baseUrl}/es`;
  const selfUrl =
    locale === 'zh' ? zhUrl : locale === 'en' ? enUrl : esUrl;

  const country = SITE_CONFIG.countryName[locale as 'es' | 'en' | 'zh'];
  const nearby1 = SITE_CONFIG.nearby1[locale as 'es' | 'en' | 'zh'];
  const nearby2 = SITE_CONFIG.nearby2[locale as 'es' | 'en' | 'zh'];

  const titles: Record<string, string> = {
    es: `${SITE_CONFIG.attractionFullName} (${SITE_CONFIG.cityName}) - Guía del visitante y ubicación`,
    en: `${SITE_CONFIG.attractionFullName} (${SITE_CONFIG.cityName}) - Visitor Guide & Location`,
    zh: `${SITE_CONFIG.attractionFullName} (${SITE_CONFIG.cityName}) - 游客指南与位置信息`,
  };
  const descriptions: Record<string, string> = {
    es: `Descubre ${SITE_CONFIG.attractionFullName}, el emblemático monumento en ${SITE_CONFIG.cityName}, ${SITE_CONFIG.stateProvince}, ${country}. Consulta el mapa de ubicación, detalles de visita, los alrededores de ${nearby1} y consejos de viaje.`,
    en: `Discover ${SITE_CONFIG.attractionFullName}, the iconic landmark in ${SITE_CONFIG.cityName}, ${SITE_CONFIG.stateProvince}, ${country}. View location map, opening details, nearby ${nearby1}, and travel tips.`,
    zh: `探索 ${SITE_CONFIG.attractionFullName}，位于${country} ${SITE_CONFIG.stateProvince} ${SITE_CONFIG.cityName} 的标志性地标。查看位置地图、参观信息、${nearby1}周边景点及旅行建议。`,
  };
  const ogTitles: Record<string, string> = {
    es: `${SITE_CONFIG.attractionFullName} - Guía de viaje en ${SITE_CONFIG.cityName}`,
    en: `${SITE_CONFIG.attractionFullName} - ${SITE_CONFIG.cityName} Travel Guide`,
    zh: `${SITE_CONFIG.attractionFullName} - ${SITE_CONFIG.cityName} 旅行指南`,
  };
  const ogDescriptions: Record<string, string> = {
    es: `Guía oficial del visitante para ${SITE_CONFIG.attractionFullName} en ${SITE_CONFIG.cityName}, ${SITE_CONFIG.stateProvince}, ${country}.`,
    en: `Official visitor guide to ${SITE_CONFIG.attractionFullName} in ${SITE_CONFIG.cityName}, ${SITE_CONFIG.stateProvince}, ${country}.`,
    zh: `${SITE_CONFIG.attractionFullName} 官方游客指南，位于${country} ${SITE_CONFIG.stateProvince} ${SITE_CONFIG.cityName}。`,
  };
  const ogImageAlts: Record<string, string> = {
    es: `${SITE_CONFIG.attractionFullName} en ${SITE_CONFIG.cityName}`,
    en: `${SITE_CONFIG.attractionFullName} in ${SITE_CONFIG.cityName}`,
    zh: `${SITE_CONFIG.attractionFullName} 位于 ${SITE_CONFIG.cityName}`,
  };

  return {
    metadataBase: new URL(baseUrl),
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      languages: {
        'zh': zhUrl,
        'en': enUrl,
        'es': esUrl,
        'x-default': esUrl,
      },
    },
    openGraph: {
      title: ogTitles[locale],
      description: ogDescriptions[locale],
      url: baseUrl,
      siteName: SITE_CONFIG.attractionFullName,
      locale: locale === 'zh' ? 'zh_CN' : locale === 'en' ? 'en_US' : 'es_ES',
      type: 'website',
      images: [
        {
          url: SITE_CONFIG.heroImage,
          width: 1600,
          height: 900,
          alt: ogImageAlts[locale],
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitles[locale],
      description: ogDescriptions[locale],
      images: [SITE_CONFIG.heroImage],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const country = SITE_CONFIG.countryName[locale as 'es' | 'en' | 'zh'];
  const nearby1 = SITE_CONFIG.nearby1[locale as 'es' | 'en' | 'zh'];
  const nearby2 = SITE_CONFIG.nearby2[locale as 'es' | 'en' | 'zh'];

  const attractionDescriptions: Record<string, string> = {
    es: `Guía completa del visitante para ${SITE_CONFIG.attractionFullName} en ${SITE_CONFIG.cityName}, ${SITE_CONFIG.stateProvince}, ${country}.`,
    en: `Comprehensive visitor guide to ${SITE_CONFIG.attractionFullName} in ${SITE_CONFIG.cityName}, ${SITE_CONFIG.stateProvince}, ${country}.`,
    zh: `${SITE_CONFIG.attractionFullName} 完整游客指南，位于${country} ${SITE_CONFIG.stateProvince} ${SITE_CONFIG.cityName}。`,
  };

  const faqItems = [
    {
      name:
        locale === 'es'
          ? `¿Dónde se encuentra ${SITE_CONFIG.attractionFullName}?`
          : locale === 'en'
            ? `Where is ${SITE_CONFIG.attractionFullName} located?`
            : `${SITE_CONFIG.attractionFullName} 位于哪里？`,
      text:
        locale === 'es'
          ? `${SITE_CONFIG.attractionFullName} se encuentra en ${SITE_CONFIG.cityName}, ${SITE_CONFIG.stateProvince}, ${country}, en la Puerta del Sol.`
          : locale === 'en'
            ? `${SITE_CONFIG.attractionFullName} is located at Puerta del Sol in ${SITE_CONFIG.cityName}, ${SITE_CONFIG.stateProvince}, ${country}.`
            : `${SITE_CONFIG.attractionFullName} 位于${country} ${SITE_CONFIG.stateProvince} ${SITE_CONFIG.cityName} 的太阳门广场。`,
    },
    {
      name:
        locale === 'es'
          ? `¿Es gratuita la visita a ${SITE_CONFIG.attractionShortName}?`
          : locale === 'en'
            ? `Is ${SITE_CONFIG.attractionShortName} free to visit?`
            : `参观 ${SITE_CONFIG.attractionShortName} 是否免费？`,
      text:
        locale === 'es'
          ? `Sí, ${SITE_CONFIG.attractionFullName} es un espacio público y es gratuito para visitar durante todo el año.`
          : locale === 'en'
            ? `Yes, ${SITE_CONFIG.attractionFullName} is a public space and is free to visit year-round.`
            : `是的，${SITE_CONFIG.attractionFullName} 是公共空间，全年免费向公众开放。`,
    },
    {
      name:
        locale === 'es'
          ? `¿Qué hay cerca de ${SITE_CONFIG.attractionFullName}?`
          : locale === 'en'
            ? `What is near ${SITE_CONFIG.attractionFullName}?`
            : `${SITE_CONFIG.attractionFullName} 附近有什么景点？`,
      text:
        locale === 'es'
          ? `Al visitar ${SITE_CONFIG.attractionFullName}, los visitantes pueden explorar fácilmente monumentos históricos y lugares de interés cercanos, incluidos ${nearby1} y ${nearby2}.`
          : locale === 'en'
            ? `When visiting ${SITE_CONFIG.attractionFullName}, visitors can easily explore surrounding historical landmarks and points of interest, including ${nearby1} and ${nearby2}.`
            : `参观 ${SITE_CONFIG.attractionFullName} 时，游客可便捷游览周边的历史地标与景点，包括 ${nearby1} 和 ${nearby2}。`,
    },
  ];

  const touristAttractionLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `https://${SITE_CONFIG.domain}/#attraction`,
    name: SITE_CONFIG.attractionFullName,
    alternateName: [
      SITE_CONFIG.attractionShortName,
      `${SITE_CONFIG.cityName} ${SITE_CONFIG.attractionFullName}`,
    ],
    description: attractionDescriptions[locale],
    url: `https://${SITE_CONFIG.domain}`,
    image: [SITE_CONFIG.heroImage],
    isAccessibleForFree: true,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Puerta del Sol, 1, Centro',
      addressLocality: SITE_CONFIG.cityName,
      addressRegion: SITE_CONFIG.stateProvince,
      postalCode: SITE_CONFIG.postalCode,
      addressCountry: SITE_CONFIG.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.latitude,
      longitude: SITE_CONFIG.longitude,
    },
    hasMap: SITE_CONFIG.mapsShareUrl,
    sameAs: [SITE_CONFIG.mapsShareUrl, SITE_CONFIG.govtTourismUrl, SITE_CONFIG.monumentaOfficialUrl],
  });

  const faqLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.name,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.text,
      },
    })),
  });

  return (
    <html lang={locale === 'zh' ? 'zh-CN' : locale === 'en' ? 'en' : 'es'} suppressHydrationWarning>
      <head>
        <link rel="canonical" href={`https://${SITE_CONFIG.domain}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: touristAttractionLd }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqLd }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-YJTNXGWZNY" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YJTNXGWZNY');
            `,
          }}
        />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous" />
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
