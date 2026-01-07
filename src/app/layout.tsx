import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'StudySprout - Join the Beta Waitlist',
  description: 'Join the beta waitlist for StudySprout and be among the first to experience the future of focused study.',
  openGraph: {
    title: 'StudySprout - Join the Beta Waitlist',
    description: 'Join the beta waitlist for StudySprout and be among the first to experience the future of focused study.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>{children}</body>
    </html>
  );
}
