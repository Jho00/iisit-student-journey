import type { Metadata } from 'next';
import './globals.css';

const githubPagesUrl = 'https://jho00.github.io/iisit-student-journey';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.GITHUB_PAGES === 'true' ? githubPagesUrl : 'http://localhost:3000');
const socialImageUrl = new URL('og-iisit.png', `${siteUrl.replace(/\/$/, '')}/`).toString();

export const dynamic = 'force-static';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'ИИСиТ · Интеллектуальные информационные системы и технологии · маршрут студента',
  description: 'Интерактивная карта семестра по дисциплине «Интеллектуальные информационные системы и технологии» (ИИСиТ) в СГТУ: лабораторные, курсовая, аттестация и условия автомата.',
  openGraph: {
    title: 'ИИСиТ · Интеллектуальные информационные системы и технологии',
    description: 'От первой лабораторной до экзамена.',
    images: [{ url: socialImageUrl, width: 1731, height: 909, alt: 'Интеллектуальные информационные системы и технологии' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ИИСиТ · Интеллектуальные информационные системы и технологии',
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
