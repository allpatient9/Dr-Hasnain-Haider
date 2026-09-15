import React, { useState, useEffect } from 'react';
import {
  Ear,
  Wind,
  Sparkles,
  Smile,
  ShieldAlert,
  Compass,
  Moon,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Calendar,
  Phone,
  MessageCircle,
  Activity,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { SERVICES_DATA, DOCTOR_INFO } from '../data/medicalData';
import { ServiceItem, PageType } from '../types';

interface ServicesPageProps {
  initialServiceId?: string;
  onNavigate: (page: PageType, serviceId?: string) => void;
  onOpenBooking: (serviceName?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  initialServiceId,
  onNavigate,
  onOpenBooking,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    if (initialServiceId) {
      const element = document.getElementById(initialServiceId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [initialServiceId]);

  const renderServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Ear': return <Ear className="w-6 h-6 text-blue-600" />;
      case 'Wind': return <Wind className="w-6 h-6 text-blue-600" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-blue-600" />;
      case 'Smile': return <Smile className="w-6 h-6 text-blue-600" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-blue-600" />;
      case 'Compass': return <Compass className="w-6 h-6 text-blue-600" />;
      case 'Moon': return <Moon className="w-6 h-6 text-blue-600" />;
      default: return <Activity className="w-6 h-6 text-blue-600" />;
    }
  };

  const filteredServices = activeFilter === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.id === activeFilter);

  return (
    <div className="space-y-16 sm:space-y-24 py-8">
      {/* ========================================================= */}
      {/* 1. SERVICES PAGE HERO                                     */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-3 p-1.5 pr-4 bg-white border border-slate-200 rounded-full mx-auto shadow-xs">
            <img
              src={DOCTOR_INFO.doctorImage}
              alt="Dr. Hasnain Haider - Best ENT Specialist & Surgeon in Lahore"
              className="w-11 h-11 rounded-full object-cover border-2 border-blue-600 shadow-xs"
              loading="eager"
              referrerPolicy="no-referrer"
            />
            <div className="text-left">
              <p className="text-xs font-bold text-slate-900 leading-tight">All Procedures Performed by {DOCTOR_INFO.name}</p>
              <p className="text-[11px] text-blue-600 font-medium">{DOCTOR_INFO.degrees} • {DOCTOR_INFO.experienceYears} Clinical Experience</p>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            ENT Services by Dr. Hasnain Haider in Lahore
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Providing evidence-guided diagnosis, high-definition nasal endoscopy, microscopic ear treatments, and minimally invasive surgeries for patients across Lahore and Punjab.
          </p>

          <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
            <button
              onClick={() => onOpenBooking()}
              id="services-hero-book-btn"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book ENT Consultation</span>
            </button>
            <a
              href={DOCTOR_INFO.phoneTel}
              id="services-hero-call-btn"
              className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-xl text-sm border border-slate-300 transition-colors shadow-xs"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span>Direct Phone: {DOCTOR_INFO.phone}</span>
            </a>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          <button
            onClick={() => setActiveFilter('all')}
            id="filter-all-services"
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeFilter === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All 7 Services
          </button>
          {SERVICES_DATA.map((srv) => (
            <button
              key={srv.id}
              onClick={() => setActiveFilter(srv.id)}
              id={`filter-${srv.id}`}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeFilter === srv.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {srv.title}
            </button>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. DETAILED INDIVIDUAL SERVICE SECTIONS                   */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {filteredServices.map((service, index) => (
          <div
            key={service.id}
            id={service.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-blue-300 hover:shadow-md transition-all scroll-mt-28"
          >
            {/* Service Header Ribbon */}
            <div className="bg-slate-50 border-b border-slate-100 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 shadow-xs flex items-center justify-center shrink-0">
                  {renderServiceIcon(service.iconName)}
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    {service.category} Specialization
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {service.title}
                  </h2>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <a
                  href={`/services/${service.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('service-detail', service.id);
                  }}
                  id={`service-view-page-btn-${service.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95"
                >
                  <span>View Dedicated Service Page</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  onClick={() => onOpenBooking(service.title)}
                  id={`service-book-btn-${service.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation</span>
                </button>
              </div>
            </div>

            {/* Service Content Body */}
            <div className="p-6 sm:p-8 space-y-8">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                {service.shortDesc}
              </p>

              {/* 3-Column Diagnostic Breakdown: Symptoms, Treatment Approach, When to Consult */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. Symptoms */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm uppercase tracking-wider mb-3">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Common Symptoms</span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                    {service.symptoms.map((symp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5"></span>
                        <span className="leading-snug">{symp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Treatment Approach */}
                <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100">
                  <div className="flex items-center gap-2 text-blue-900 font-bold text-sm uppercase tracking-wider mb-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Treatment Approach</span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                    {service.treatmentApproach.map((treat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5"></span>
                        <span className="leading-snug">{treat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. When to Consult Doctor */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm uppercase tracking-wider mb-3">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>When to Consult Doctor</span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                    {service.whenToConsult.map((when, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5"></span>
                        <span className="leading-snug">{when}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Procedures & Footer Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {service.procedures && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Clinical Procedures:
                    </span>
                    {service.procedures.map((proc, pIdx) => (
                      <span
                        key={pIdx}
                        className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200"
                      >
                        {proc}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onNavigate('service-detail', service.id)}
                    id={`service-footer-view-page-${service.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-blue-600 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors"
                  >
                    <span>Full Service Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={DOCTOR_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3 py-2 rounded-lg transition-colors border border-emerald-200"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Inquiry</span>
                  </a>

                  <button
                    onClick={() => onOpenBooking(service.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-2 rounded-lg transition-colors border border-blue-200"
                  >
                    <span>Schedule Appointment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ========================================================= */}
      {/* 3. DIAGNOSTIC FACILITY ASSURANCE                          */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-left">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                In-Clinic Diagnostic Equipment
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Advanced In-Clinic ENT Diagnostics in Johar Town
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Accurate diagnosis is the foundation of successful treatment. At Dr. Hasnain Haider's clinic, patients receive high-definition video otoscopy, rigid nasal endoscopy, and audiometric screening directly during their consultation.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-200 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>High-Definition Digital Nasal & Sinus Endoscopy</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>Microscopic Ear Suction (Painless Wax & Infection Clear)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>Flexible Fibreoptic Vocal Cord Examination</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>Dix-Hallpike & Epley Repositioning for Instant Vertigo Relief</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-center space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">
                Clinic Timings & Consultation Hours
              </h4>
              <p className="text-xs text-slate-300">
                Monday – Saturday: <strong>5:00 PM – 9:00 PM</strong>
                <br />
                24, 25, 26 Maulana Shaukat Ali Rd, Phase 1 Johar Town, Lahore
              </p>
              <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={() => onOpenBooking()}
                  className="py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors shadow-md active:scale-95"
                >
                  Book Consultation Slot
                </button>
                <a
                  href={DOCTOR_INFO.phoneTel}
                  className="py-2.5 px-5 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl text-xs transition-colors border border-slate-600"
                >
                  Call: {DOCTOR_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
