import type { Metadata, Viewport } from 'next';
import { Archivo, Inter } from 'next/font/google';
import { Provider } from '@/components/provider';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Narrow grotesque for display type; the width axis carries the studio voice.
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'VTuber AI Director — You perform. The AI directs.',
    template: '%s — VTuber AI Director',
  },
  description:
    'A local-first AI live director and speech-tracked teleprompter for character-driven VTuber chatting streams.',
};

export const viewport: Viewport = {
  themeColor: '#080a0d',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${archivo.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col font-sans">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
