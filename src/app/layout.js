import './globals.css';
import Navbar from '../components/Navbar';
import { Inter, Oswald } from 'next/font/google';
import { FitLogProvider } from '../context/FitLogContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Fit Log',
};

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
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${oswald.variable}`}>
        <FitLogProvider>
          <Navbar />
          {children}
          <ToastContainer
            position="bottom-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="dark"
          />
        </FitLogProvider>
        <Footer />
      </body>
    </html>
  );
}
