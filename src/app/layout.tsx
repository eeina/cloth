import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Elegant Fashion - Saudi Women\'s Clothing',
  description: 'Elegant modest fashion for Saudi women. Shop hijabs, abayas, dresses and accessories.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}