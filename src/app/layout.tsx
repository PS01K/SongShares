import './globals.css';
import Navbar from '@/components/shared/Navbar';

export const metadata = {
  title: 'Song Shares',
  description: 'A decentralized music investment platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
