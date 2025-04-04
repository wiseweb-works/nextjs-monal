import './globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ScrollToTop from '@/components/ScrollToTop';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Monal',
  description: 'Monal IM - https://github.com/monal-im/monal',
  authors: [
    {
      name: 'Monal',
      url: 'https://github.com/monal-im',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <>
          <Navbar />
          <main className="container mx-auto w-full max-w-[90dvw] px-4 md:px-0 ">{children}</main>
          <ScrollToTop />
          <Footer />
        </>
      </body>
    </html>
  );
}
