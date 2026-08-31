import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'El Oso y el Madroño (Madrid) - Guía del visitante',
    short_name: 'El Oso y el Madroño',
    description:
      'Guía completa del visitante para El Oso y el Madroño en Madrid, España.',
    start_url: '/es',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#faf8f4',
    theme_color: '#142d1c',
    lang: 'es',
    categories: ['travel', 'tourism'],
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
