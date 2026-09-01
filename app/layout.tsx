import type { Metadata } from 'next';
import './globals.css';

const githubPagesUrl = 'https://jho00.github.io/iisit-student-journey';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.GITHUB_PAGES === 'true' ? githubPagesUrl : 'http://localhost:3000');
const socialImageUrl = new URL('og.png', `${siteUrl.replace(/\/$/, '')}/`).toString();

export const dynamic = 'force-static';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Интеллектуальные технологии и системы · маршрут студента',
  description: 'Интерактивная карта семестра по дисциплине «Интеллектуальные технологии и системы» в СГТУ.',
  openGraph: {
    title: 'Интеллектуальные технологии и системы',
    description: 'От первой лабораторной до экзамена.',
    images: [{ url: socialImageUrl, width: 1200, height: 630, alt: 'Интеллектуальные технологии и системы' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Интеллектуальные технологии и системы',
    description: 'От первой лабораторной до экзамена.',
    images: [socialImageUrl],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
