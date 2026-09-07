import React from 'react';
import { Phone, MapPin, Clock, Mail, MessageCircle, ShieldCheck, Award, Stethoscope, ChevronRight } from 'lucide-react';
import { DOCTOR_INFO, SERVICES_DATA } from '../data/medicalData';
import { PageType } from '../types';

interface FooterProps {
  onNavigate: (page: PageType, serviceId?: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const handlePageClick = (page: PageType, serviceId?: string) => {
    onNavigate(page, serviceId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 sm:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Doctor Bio & Trust */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white border border-slate-700 shadow-sm shrink-0 flex items-center justify-center">
                <img
                  src={DOCTOR_INFO.clinicLogo}
                  alt="Dr. Hasnain Haider ENT Specialist Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {DOCTOR_INFO.name}
                </h3>
                <p className="text-xs font-medium text-blue-400">
                  {DOCTOR_INFO.title}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Dr. Hasnain Haider is a recognized and experienced ENT Specialist & ENT Surgeon in Lahore providing precision care for ear, nose, sinus, hearing, and throat disorders.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{DOCTOR_INFO.pmdcNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Award className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{DOCTOR_INFO.experienceYears} Clinical & Surgical Excellence</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links & SEO Pages */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handlePageClick('home')}
                  id="footer-nav-home"
                  className="hover:text-blue-400 flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('about')}
                  id="footer-nav-about"
                  className="hover:text-blue-400 flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>About Dr. Hasnain Haider</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('services')}
                  id="footer-nav-services"
                  className="hover:text-blue-400 flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>ENT Services & Treatments</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageClick('contact')}
                  id="footer-nav-contact"
                  className="hover:text-blue-400 flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Contact Clinic & Map</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  id="footer-book-consult-btn"
                  className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                  <span>Book Consultation</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Treatments / Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Individual ENT Service Pages
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => handlePageClick('service-detail', service.id)}
                    id={`footer-service-${service.id}`}
                    className="hover:text-blue-400 text-left transition-colors flex items-center gap-1.5 text-xs sm:text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                    <span>{service.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Clinic Info & Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Johar Town Clinic
            </h4>

            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{DOCTOR_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={DOCTOR_INFO.phoneTel} className="hover:text-blue-400 font-semibold transition-colors">
                  {DOCTOR_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={DOCTOR_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                >
                  WhatsApp: +92 311 6712017
                </a>
              </div>

              <div className="flex items-start gap-2.5 text-slate-400">
                <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-slate-200">{DOCTOR_INFO.timings}</p>
                  <p className="text-[11px] text-slate-400">Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={DOCTOR_INFO.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-google-map-link"
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 px-3 py-2 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex justify-center items-center text-xs text-slate-500">
          <p className="text-center">
            © {new Date().getFullYear()} Dr. Hasnain Haider. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
