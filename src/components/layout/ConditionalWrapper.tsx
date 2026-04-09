'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function ConditionalWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <main className="flex-grow">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
