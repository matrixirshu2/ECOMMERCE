import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ECOMMERCE | Online Store',
  description: 'Modern online shopping store',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
