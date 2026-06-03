import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ToastContainer } from '@/components/ui/Toast';

export const metadata = {
  title: 'E-Doc-Connect - Book Doctor Appointments Online',
  description: 'Book online appointments with top verified medical specialists. Manage consults, reviews, and health records on our premium dashboard.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
