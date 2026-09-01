import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Интеллектуальные технологии и системы · маршрут студента',
  description: 'Интерактивная карта семестра по дисциплине «Интеллектуальные технологии и системы» в СГТУ.',
  openGraph: {
    title: 'Интеллектуальные технологии и системы',
    description: 'От первой лабораторной до экзамена.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Интеллектуальные технологии и системы' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Интеллектуальные технологии и системы',
    description: 'От первой лабораторной до экзамена.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
