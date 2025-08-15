import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the default locale (English as configured in middleware)
  redirect('/en');
}