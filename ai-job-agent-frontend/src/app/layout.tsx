import type { Metadata } from 'next';
// @ts-ignore
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Job Agent - Multi-Agent Resume & Mock Interview Accelerator',
  description: 'AI powered job search, resume matching, and voice mock interview system.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#080C14] text-gray-100">
        {children}
      </body>
    </html>
  );
}