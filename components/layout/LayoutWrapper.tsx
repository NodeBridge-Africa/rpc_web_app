'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Don't show header/footer on admin, auth, or dashboard pages
  const hideHeaderFooter = pathname.startsWith('/admin') || pathname.startsWith('/auth') || pathname.startsWith('/dashboard');

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main className="flex-1">
        {children}
      </main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}