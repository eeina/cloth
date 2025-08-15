import { redirect } from 'next/navigation';
import './globals.css';

export const metadata = {
  title: 'Elegant Fashion - Saudi Women\'s Clothing',
  description: 'Elegant modest fashion for Saudi women. Shop hijabs, abayas, dresses and accessories.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Redirect to the default locale
  redirect('/ar');
  
  // This won't be reached due to redirect, but included for TypeScript
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}