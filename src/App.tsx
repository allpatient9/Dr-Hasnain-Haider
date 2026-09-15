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

  // Parse pathname to determine route (Clean HTML5 URL without #)
  const parseRoute = useCallback(() => {
    // 1. Check pathname first (e.g., /about, /services, /services/sinus-treatment, /contact)
    let path = window.location.pathname.replace(/\/+$/, '') || '/';

    // 2. Seamless Migration: If user arrives with a legacy hash URL (e.g. #about, #services/sinus-treatment)
    const rawHash = window.location.hash.replace(/^#\/?/, '').replace(/\/+$/, '');
    if (path === '/' && rawHash) {
      if (rawHash === 'about') path = '/about';
      else if (rawHash === 'services') path = '/services';
      else if (rawHash.startsWith('services/')) path = `/${rawHash}`;
      else if (rawHash === 'contact') path = '/contact';

      // Clean up the address bar immediately without reloading page
      if (path !== '/') {
        window.history.replaceState(null, '', path);
      }
    }

    if (path === '/' || path === '/home') {
      setCurrentPage('home');
      setSelectedServiceId(undefined);
    } else if (path.startsWith('/services/')) {
      const srvId = path.replace('/services/', '');
      setCurrentPage('service-detail');
      setSelectedServiceId(srvId);
    } else if (path === '/services') {
      setCurrentPage('services');
      setSelectedServiceId(undefined);
    } else if (path === '/about') {
      setCurrentPage('about');
      setSelectedServiceId(undefined);
    } else if (path === '/contact') {
      setCurrentPage('contact');
      setSelectedServiceId(undefined);
    } else {
      setCurrentPage('home');
      setSelectedServiceId(undefined);
    }
  }, []);

  useEffect(() => {
    parseRoute();
    const handleLocationChange = () => parseRoute();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [parseRoute]);

  // Update Dynamic SEO & Schema metadata per page
  useEffect(() => {
    const doctorImageUrl = 'https://hasnainent.com/images/dr-hasnain-haider-ent.jpg';
    const clinicLogoUrl = 'https://hasnainent.com/images/ent-clinic-logo.png';
    let title = 'Dr. Hasnain Haider - Best ENT Specialist in Lahore';
    let description =
      'Consult Dr. Hasnain Haider (MBBS, FCPS), leading ENT Specialist and ENT Surgeon in Johar Town, Lahore. Expert treatments for sinus, ear infections, deviated nasal septum, tonsils, vertigo, and hearing loss.';
    let canonicalUrl = 'https://hasnainent.com/';
    let dynamicSchema: Record<string, unknown> | null = null;
    let breadcrumbItems: { '@type': string; position: number; name: string; item: string }[] = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://hasnainent.com/',
      },
    ];

    const SERVICE_SEO_MAP: Record<
      string,
      { title: string; desc: string; procedureName: string; bodyLocation: string }
    > = {
      'sinus-treatment': {
        title: 'Sinus Treatment & FESS Surgery in Lahore | Dr. Hasnain Haider',
        desc: 'Advanced sinus treatment & Functional Endoscopic Sinus Surgery (FESS) in Johar Town, Lahore by Dr. Hasnain Haider. Relief from chronic sinusitis, facial pain & nasal polyps.',
        procedureName: 'Functional Endoscopic Sinus Surgery (FESS) & Sinusitis Care',
        bodyLocation: 'Paranasal Sinuses and Nasal Cavity',
      },
      'nose-disorders': {
        title: 'Septoplasty & Deviated Nasal Septum (DNS) in Lahore | Dr. Hasnain Haider',
        desc: 'Precision Septoplasty, Coblation Turbinoplasty & nasal blockage correction by Dr. Hasnain Haider in Lahore. Safe, painless surgical relief for deviated septum (DNS).',
        procedureName: 'Septoplasty and Turbinate Reduction Surgery',
        bodyLocation: 'Nose and Nasal Septum',
      },
      'ear-treatment': {
        title: 'Ear Infection & Tympanoplasty Treatment in Lahore | Dr. Hasnain Haider',
        desc: 'Comprehensive ear treatment in Lahore: microscopic ear cleaning, eardrum perforation repair (tympanoplasty), ear discharge & otitis media care by Dr. Hasnain Haider.',
        procedureName: 'Microscopic Otologic Examination and Tympanoplasty',
        bodyLocation: 'Ear and Tympanic Membrane',
      },
      'throat-problems': {
        title: 'Coblation Tonsillectomy & Throat Treatment in Lahore | Dr. Hasnain Haider',
        desc: 'Modern Coblation Tonsillectomy, adenoid removal, chronic pharyngitis, and vocal cord hoarseness treatment by Dr. Hasnain Haider in Johar Town, Lahore.',
        procedureName: 'Coblation Tonsillectomy and Laryngopharyngeal Treatment',
        bodyLocation: 'Throat, Tonsils, and Pharynx',
      },
      'allergy-treatment': {
        title: 'ENT Allergy & Allergic Rhinitis Treatment in Lahore | Dr. Hasnain Haider',
        desc: 'Expert allergy specialist in Lahore providing lasting relief for allergic rhinitis, morning sneezing, dust/pollen allergies, and chronic nasal congestion.',
        procedureName: 'Otolaryngologic Allergy Evaluation and Rhinitis Protocol',
        bodyLocation: 'Upper Respiratory Tract and Nasal Mucosa',
      },
      'hearing-balance': {
        title: 'Vertigo (BPPV) & Hearing Loss Treatment in Lahore | Dr. Hasnain Haider',
        desc: 'Specialized inner ear vertigo treatment, bedside Epley canalith repositioning maneuver, tinnitus evaluation, and sudden hearing loss care by Dr. Hasnain Haider in Lahore.',
        procedureName: 'Dix-Hallpike Diagnosis and Epley Canalith Repositioning',
        bodyLocation: 'Inner Ear and Vestibular System',
      },
      'snoring-sleep': {
        title: 'Snoring & Sleep Apnea (OSA) Treatment in Lahore | Dr. Hasnain Haider',
        desc: 'Comprehensive upper airway endoscopy, obstructive sleep apnea (OSA) diagnosis, and surgical airway widening for loud snoring by Dr. Hasnain Haider in Lahore.',
        procedureName: 'Sleep Apnea Upper Airway Assessment and Snoring Surgery',
        bodyLocation: 'Upper Airway and Soft Palate',
      },
    };

    if (currentPage === 'service-detail' && selectedServiceId) {
      const srv = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];
      const customSeo = SERVICE_SEO_MAP[srv.id];
      title = customSeo?.title || `${srv.title} in Lahore | Dr. Hasnain Haider ENT Specialist`;
      description = customSeo?.desc || `${srv.shortDesc} Expert diagnosis, conservative care & modern surgical protocols by Dr. Hasnain Haider in Johar Town, Lahore.`;
      canonicalUrl = `https://hasnainent.com/services/${srv.id}`;

      breadcrumbItems = [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://hasnainent.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'ENT Services',
          item: 'https://hasnainent.com/services',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: srv.title,
          item: canonicalUrl,
        },
      ];

      dynamicSchema = {
        '@context': 'https://schema.org',
        '@type': 'MedicalProcedure',
        name: customSeo?.procedureName || `${srv.title} in Lahore`,
        procedureType: 'https://health-lifesci.schema.org/MedicalProcedure',
        bodyLocation: customSeo?.bodyLocation || 'Ear, Nose and Throat',
        description,
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
          logo: clinicLogoUrl,
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

      breadcrumbItems = [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://hasnainent.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'ENT Services',
          item: 'https://hasnainent.com/services',
        },
      ];

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
          logo: clinicLogoUrl,
          telephone: '+923116712017',
        },
      };
    } else if (currentPage === 'about') {
      title = 'About Dr. Hasnain Haider (MBBS, FCPS) | Best ENT Surgeon in Lahore';
      description =
        'Learn about Dr. Hasnain Haider, Consultant ENT Specialist and Head & Neck Surgeon in Lahore with 9+ years of experience, 4,500+ successful ENT surgeries, and PMC/PMDC verification.';
      canonicalUrl = 'https://hasnainent.com/about';

      breadcrumbItems = [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://hasnainent.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'About Dr. Hasnain Haider',
          item: 'https://hasnainent.com/about',
        },
      ];

      dynamicSchema = {
        '@context': 'https://schema.org',
        '@type': 'Physician',
        name: DOCTOR_INFO.name,
        image: doctorImageUrl,
        logo: clinicLogoUrl,
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
        sameAs: [
          'https://maps.app.goo.gl/zrKWknRjoseQn8GU7',
          'https://www.marham.pk/doctors/lahore/ent-surgeon/dr-hasnain-haider',
          'https://www.farooqhospitals.com/consultant/b717ccf1-1804-4a8a-85c4-8dac1985277f',
        ],
        alumniOf: [
          {
            '@type': 'EducationalOrganization',
            name: 'College of Physicians and Surgeons Pakistan (FCPS Otolaryngology)',
          },
          {
            '@type': 'Hospital',
            name: 'Shaukat Khanum Memorial Cancer Hospital & Research Centre (Department of Surgical Oncology)',
          },
        ],
        hospitalAffiliation: [
          {
            '@type': 'Hospital',
            name: 'Iqra Medical Complex, 24-26 Maulana Shaukat Ali Rd, Johar Town, Lahore',
          },
          {
            '@type': 'MedicalClinic',
            name: 'ENT and GYNAE Associates, Wapda Town, Lahore',
          },
          {
            '@type': 'Hospital',
            name: 'Akhtar Saeed Trust Hospital, Lahore',
          },
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: '24, 25, 26 Maulana Shaukat Ali Rd, Block A Phase 1 Johar Town',
          addressLocality: 'Lahore',
          addressRegion: 'Punjab',
          postalCode: '54782',
          addressCountry: 'PK',
        },
      };
    } else if (currentPage === 'contact') {
      title = 'Contact Clinic & Appointments | Dr. Hasnain Haider ENT Specialist Johar Town';
      description =
        'Visit Dr. Hasnain Haider ENT Clinic at 24-26 Maulana Shaukat Ali Rd, Block A Phase 1 Johar Town, Lahore. Timings: Mon-Sat 8:00 AM - 9:30 PM. Call or WhatsApp 0311 6712017.';
      canonicalUrl = 'https://hasnainent.com/contact';

      breadcrumbItems = [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://hasnainent.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Contact Clinic',
          item: 'https://hasnainent.com/contact',
        },
      ];

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
          logo: clinicLogoUrl,
          telephone: '+923116712017',
          address: {
            '@type': 'PostalAddress',
            streetAddress: DOCTOR_INFO.streetAddress,
            addressLocality: 'Lahore',
            addressCountry: 'PK',
          },
        },
      };
    } else {
      // Home page
      dynamicSchema = {
        '@context': 'https://schema.org',
        '@type': 'MedicalClinic',
        name: 'Dr. Hasnain Haider ENT Clinic Lahore',
        description,
        url: canonicalUrl,
        image: doctorImageUrl,
        logo: {
          '@type': 'ImageObject',
          url: clinicLogoUrl,
          width: 1024,
          height: 1024,
        },
        telephone: '+923116712017',
        medicalSpecialty: 'https://health-lifesci.schema.org/Otolaryngologic',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '24, 25, 26 Maulana Shaukat Ali Rd, Block A Phase 1 Johar Town',
          addressLocality: 'Lahore',
          addressRegion: 'Punjab',
          postalCode: '54782',
          addressCountry: 'PK',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '31.4697',
          longitude: '74.2982',
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

    // Dynamic Per-Page Schema Injection with @graph (Google Recommended)
    let schemaScript = document.getElementById('dynamic-page-schema') as HTMLScriptElement | null;
    if (dynamicSchema) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'dynamic-page-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }

      const breadcrumbSchema = {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems,
      };

      const unifiedGraphSchema = {
        '@context': 'https://schema.org',
        '@graph': [
          dynamicSchema,
          breadcrumbSchema,
        ],
      };

      schemaScript.textContent = JSON.stringify(unifiedGraphSchema);
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
    let targetPath = '/';
    if (page === 'service-detail' && serviceId) {
      targetPath = `/services/${serviceId}`;
      setCurrentPage('service-detail');
      setSelectedServiceId(serviceId);
    } else if (page === 'services') {
      targetPath = '/services';
      setCurrentPage('services');
      setSelectedServiceId(undefined);
    } else if (page === 'about') {
      targetPath = '/about';
      setCurrentPage('about');
      setSelectedServiceId(undefined);
    } else if (page === 'contact') {
      targetPath = '/contact';
      setCurrentPage('contact');
      setSelectedServiceId(undefined);
    } else {
      targetPath = '/';
      setCurrentPage('home');
      setSelectedServiceId(undefined);
    }

    if (window.location.pathname !== targetPath || window.location.hash) {
      window.history.pushState(null, '', targetPath);
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
