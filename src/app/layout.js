import './globals.css';
import Navbar from '../components/Navbar';
import { Inter, Oswald } from 'next/font/google';
import { FitLogProvider } from '../context/FitLogContext';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable}`}>
        <FitLogProvider>
          <Navbar />
          {children}
        </FitLogProvider>
      </body>
    </html>
  );
}
