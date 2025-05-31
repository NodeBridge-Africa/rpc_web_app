import './globals.css';
import type { Metadata } from 'next';
import { AppProviders } from '@/components/providers/app-providers';
import LayoutWrapper from '@/components/layout/LayoutWrapper';

export const metadata: Metadata = {
  title: 'Nodebridge Africa | Blockchain Infrastructure & RPC Endpoints',
  description: 'Powering the next generation of decentralized applications across Africa with free & paid RPC access, robust node hosting, and expert training.',
  keywords: 'blockchain, node hosting, RPC endpoints, Africa, Ethereum, blockchain infrastructure, node operator, web3',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen flex flex-col font-sans">
        <AppProviders>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </AppProviders>
      </body>
    </html>
  );
}