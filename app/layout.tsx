import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Burhan AI | منصة برهان الذكية للرد على الشبهات',
  description: 'منصة ذكية للرد على الشبهات والاستفسارات الشرعية والدعوية بالبراهين الموثقة ومحاكي الحوار التفاعلي',
  openGraph: {
    title: 'Burhan AI | منصة برهان الذكية للرد على الشبهات',
    description: 'منصة ذكية للرد على الشبهات والاستفسارات الشرعية والدعوية بالبراهين الموثقة ومحاكي الحوار التفاعلي',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Burhan AI | منصة برهان الذكية للرد على الشبهات',
    description: 'منصة ذكية للرد على الشبهات والاستفسارات الشرعية والدعوية بالبراهين الموثقة ومحاكي الحوار التفاعلي',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="min-h-screen bg-[#FBF9F4] text-[#1F2937] dark:bg-[#0A1210] dark:text-[#E5E7EB] font-['Cairo',sans-serif] antialiased selection:bg-[#0A3E31] selection:text-white transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
