import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TechShield Solutions | Reliable IT Services',
  description: 'Reliable IT services for your business.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="circuit-bg">{children}</body>
    </html>
  );
}
