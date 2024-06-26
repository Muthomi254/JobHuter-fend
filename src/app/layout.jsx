// These styles apply to every route in the application

import { ThemeModeScript } from 'flowbite-react';
import '../globals.css';
import NavBar from './(components)/NavBar';

import Footer from './(components)/Footer';
import { AuthProvider } from './(context)/authContext';
import { BasicInfoProvider } from './(context)/basicInfoContext';
import { EducationProvider } from './(context)/educationContext';
import { LanguagesProvider } from './(context)/languagesContext';
import { ExperienceProvider } from './(context)/experienceContext';
import { ReferenceProvider } from './(context)/referenceContext'; // Update the import path
import { SkillProvider } from './(context)/skillContext'; // Update the import path
import { ProfileProvider } from './(context)/profileContext'; // Import ProfileProvider from the profile context
import { ContactProvider } from './(context)/contactContext'; // Import ProfileProvider from the profile context



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body>
        <AuthProvider>
          <BasicInfoProvider>
            <EducationProvider>
              <LanguagesProvider>
                <ExperienceProvider>
                  <SkillProvider>
                    <NavBar />
                    <ReferenceProvider>
                      <ProfileProvider>
                        <ContactProvider>
                          
                          {children}
                        </ContactProvider>
                      </ProfileProvider>
                    </ReferenceProvider>
                  </SkillProvider>
                </ExperienceProvider>
              </LanguagesProvider>
              <Footer />
            </EducationProvider>
          </BasicInfoProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
