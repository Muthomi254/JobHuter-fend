// These styles apply to every route in the application

import { ThemeModeScript } from 'flowbite-react';
import '../globals.css';
import NavBar from './(components)/NavBar';
import Footer from './(components)/Footer';
import { AuthProvider } from './(context)/authContext';
import { BasicInfoProvider } from './(context)/basicInfoContext';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body>
        <AuthProvider>
          <BasicInfoProvider>
            <NavBar />

            {children}

            <Footer />
          </BasicInfoProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
