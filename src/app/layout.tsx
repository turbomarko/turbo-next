import "./globals.css";
import localFont from 'next/font/local';

import Provider from "@/redux/provider";
import { AuthModal, VerifyEmailModal } from "@/containers";

import Header from "./_Header";
import Footer from "./_Footer";

const helvetica = localFont({ src: '../components/text/fonts/HelveticaNeueMedium.otf', variable: '--font-helvetica' });

export const metadata = {
  title: "Turbo next",
  description: "The next.js template",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={helvetica.className}>
      <body>
          <Provider>
            <AuthModal />
            <VerifyEmailModal />
            <Header />
            {children}
            <Footer />
          </Provider>
      </body>
    </html>
  );
}
