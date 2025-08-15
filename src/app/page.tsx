import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the default locale (Arabic as configured in middleware)
  redirect('/ar');
}