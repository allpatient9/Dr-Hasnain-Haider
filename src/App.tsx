/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { PageType } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { MobileQuickBar } from './components/MobileQuickBar';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ContactPage } from './pages/ContactPage';
import { ArrowUp } from 'lucide-react';
import { SERVICES_DATA, DOCTOR_INFO } from './data/medicalData';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingServicePrefill, setBookingServicePrefill] = useState<string | undefined>(undefined);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Parse hash to determine initial route
  const parseHashRoute = useCallback(() => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash || hash === 'home') {
      setCurrentPage('home');
      setSelectedServiceId(undefined);
    } else if (hash.startsWith('services/')) {
      const srvId = hash.replace('services/', '');
      setCurrentPage('service-detail');
      setSelectedServiceId(srvId);
    } else if (hash === 'services') {
      setCurrentPage('services');
      setSelectedServiceId(undefined);
    } else if (hash === 'about') {
      setCurrentPage('about');
      setSelectedServiceId(undefined);
    } else if (hash === 'contact') {
      setCurrentPage('contact');
      setSelectedServiceId(undefined);
    }
  }, []);

  useEffect(() => {
    parseHashRoute();
    const handleHashChange = () => parseHashRoute();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [parseHashRoute]);

  // Update Dynamic SEO & Schema metadata per page
  useEffect(() => {
    const doctorImageUrl = 'https://hasnainent.com/images/dr-hasnain-haider-ent.jpg';
    let title = 'Dr. Hasnain Haider - Best ENT Specialist in Lahore';
    let description =
      'Consult Dr. Hasnain Haider (MBBS, FCPS), leading ENT Specialist and ENT Surgeon in Johar Town, Lahore. Expert treatments for sinus, ear infections, deviated nasal septum, tonsils, vertigo, and hearing loss.';
    let canonicalUrl = 'https://hasnainent.com/';
    let dynamicSchema: Record<string, unknown> | null = null;

    if (currentPage === 'service-detail' && selectedServiceId) {
      const srv = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];
      title = `${srv.title} in Lahore | Dr. Hasnain Haider ENT Specialist`;
      description = `${srv.shortDesc} Expert diagnosis, conservative care & modern surgical protocols by Dr. Hasnain Haider in Johar Town, Lahore.`;
      canonicalUrl = `https://hasnainent.com/services/${srv.id}`;
      dynamicSchema = {
        '@context': 'https://schema.org',
        '@type': 'MedicalProcedure',
        name: `${srv.title} in Lahore`,
        procedureType: 'https://health-lifesci.schema.org/MedicalProcedure',
        description: srv.shortDesc,
        image: doctorImageUrl,
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: doctorImageUrl,
          caption: `${DOCTOR_INFO.name} - ${srv.title} Specialist in Lahore`,
        },
        provider: {
          '@type': 'Physician',
          name: DOCTOR_INFO.name,
          image: doctorImageUrl,
          medicalSpecialty: 'https://health-lifesci.schema.org/Otolaryngologic',
          telephone: '+923116712017',
          address: {
            '@type': 'PostalAddress',
            streetAddress: DOCTOR_INFO.streetAddress,
            addressLocality: 'Lahore',
            addressCountry: 'PK',
          },
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'PKR',
          availability: 'https://schema.org/InStock',
          url: canonicalUrl,
        },
      };
    } else if (currentPage === 'services') {
      title = 'ENT Services & Surgical Treatments in Lahore | Dr. Hasnain Haider';
      description =
        'Comprehensive otolaryngology services: FESS sinus surgery, septoplasty for DNS, ear microsurgery, coblation tonsillectomy, allergy and vertigo treatments in Lahore.';
      canonicalUrl = 'https://hasnainent.com/services';
      dynamicSchema = {
        '@context': 'https://schema.org',
        '@type': 'MedicalWebPage',
        name: 'ENT Services by Dr. Hasnain Haider in Lahore',
        description,
        url: canonicalUrl,
        image: doctorImageUrl,
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: doctorImageUrl,
          caption: `${DOCTOR_INFO.name} - ENT Services and Surgeries in Lahore`,
        },
        author: {
          '@type': 'Physician',
          name: DOCTOR_INFO.name,
          image: doctorImageUrl,
          telephone: '+923116712017',
        },
      };
    } else if (currentPage === 'about') {
      title = 'About Dr. Hasnain Haider (MBBS, FCPS) | Best ENT Surgeon in Lahore';
      description =
        'Learn about Dr. Hasnain Haider, Consultant ENT Specialist and Head & Neck Surgeon in Lahore with 9+ years of experience, 4,500+ successful ENT surgeries, and PMC/PMDC verification.';
      canonicalUrl = 'https://hasnainent.com/about';
      dynamicSchema = {
        '@context': 'https://schema.org',
        '@type': 'Physician',
        name: DOCTOR_INFO.name,
        image: doctorImageUrl,
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: doctorImageUrl,
          caption: `${DOCTOR_INFO.name} - Best ENT Surgeon in Lahore`,
        },
        medicalSpecialty: 'https://health-lifesci.schema.org/Otolaryngologic',
        jobTitle: DOCTOR_INFO.title,
        honorificPrefix: 'Dr.',
        hasCredential: [
          {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'degree',
            name: 'MBBS',
          },
          {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'fellowship',
            name: 'FCPS (Otolaryngology)',
          },
        ],
        telephone: '+923116712017',
        url: canonicalUrl,
      };
    } else if (currentPage === 'contact') {
      title = 'Contact Clinic & Appointments | Dr. Hasnain Haider ENT Specialist Johar Town';
      description =
        'Visit Dr. Hasnain Haider ENT Clinic at 24-26 Maulana Shaukat Ali Rd, Block A Phase 1 Johar Town, Lahore. Timings: Mon-Sat 8:00 AM - 9:30 PM. Call or WhatsApp 0311 6712017.';
      canonicalUrl = 'https://hasnainent.com/contact';
      dynamicSchema = {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact Dr. Hasnain Haider ENT Clinic Johar Town Lahore',
        description,
        url: canonicalUrl,
        image: doctorImageUrl,
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: doctorImageUrl,
          caption: `${DOCTOR_INFO.name} - ENT Specialist Clinic Johar Town Lahore`,
        },
        mainEntity: {
          '@type': 'Physician',
          name: DOCTOR_INFO.name,
          image: doctorImageUrl,
          telephone: '+923116712017',
          address: {
            '@type': 'PostalAddress',
            streetAddress: DOCTOR_INFO.streetAddress,
            addressLocality: 'Lahore',
            addressCountry: 'PK',
          },
        },
      };
    }

    // Set document title
    document.title = title;

    // Set meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // Set canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // Update OpenGraph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

    // Enforce Doctor Image across OpenGraph & Twitter Cards on every page
    let ogImg = document.querySelector('meta[property="og:image"]');
    if (!ogImg) {
      ogImg = document.createElement('meta');
      ogImg.setAttribute('property', 'og:image');
      document.head.appendChild(ogImg);
    }
    ogImg.setAttribute('content', doctorImageUrl);

    let ogImgAlt = document.querySelector('meta[property="og:image:alt"]');
    if (!ogImgAlt) {
      ogImgAlt = document.createElement('meta');
      ogImgAlt.setAttribute('property', 'og:image:alt');
      document.head.appendChild(ogImgAlt);
    }
    ogImgAlt.setAttribute('content', `${DOCTOR_INFO.name} - Best ENT Specialist & Surgeon in Lahore`);

    let twImg = document.querySelector('meta[name="twitter:image"]');
    if (!twImg) {
      twImg = document.createElement('meta');
      twImg.setAttribute('name', 'twitter:image');
      document.head.appendChild(twImg);
    }
    twImg.setAttribute('content', doctorImageUrl);

    // Dynamic Per-Page Schema Injection
    let schemaScript = document.getElementById('dynamic-page-schema') as HTMLScriptElement | null;
    if (dynamicSchema) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'dynamic-page-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(dynamicSchema);
    } else if (schemaScript) {
      schemaScript.remove();
    }
  }, [currentPage, selectedServiceId]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: PageType, serviceId?: string) => {
    if (page === 'service-detail' || (page === 'services' && serviceId)) {
      setCurrentPage('service-detail');
      setSelectedServiceId(serviceId);
      window.location.hash = serviceId ? `services/${serviceId}` : 'services';
    } else {
      setCurrentPage(page);
      setSelectedServiceId(serviceId);
      window.location.hash = page === 'home' ? '' : page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (serviceName?: string) => {
    setBookingServicePrefill(serviceName);
    setIsBookingOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white antialiased">
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
      />

      {/* Main Content Render based on current page */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            initialServiceId={selectedServiceId}
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentPage === 'service-detail' && (
          <ServiceDetailPage
            serviceId={selectedServiceId}
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Medical Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Mobile Sticky Action Bar */}
      <MobileQuickBar onOpenBooking={() => handleOpenBooking()} />

      {/* Consultation Appointment Booking Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultService={bookingServicePrefill}
      />

      {/* Scroll to Top Floating Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          id="scroll-to-top-btn"
          aria-label="Scroll to top"
          className="fixed bottom-20 sm:bottom-6 right-5 z-20 p-3 rounded-full bg-slate-900 text-white shadow-lg hover:bg-blue-600 transition-all active:scale-90"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
