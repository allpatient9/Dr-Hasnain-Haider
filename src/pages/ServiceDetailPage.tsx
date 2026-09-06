import React, { useState } from 'react';
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
  ArrowLeft,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Stethoscope,
  HelpCircle,
  MapPin,
  Award,
} from 'lucide-react';
import { SERVICES_DATA, DOCTOR_INFO, CLINIC_LOCATIONS } from '../data/medicalData';
import { ServiceItem, PageType } from '../types';

interface ServiceDetailPageProps {
  serviceId?: string;
  onNavigate: (page: PageType, serviceId?: string) => void;
  onOpenBooking: (serviceName?: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  serviceId,
  onNavigate,
  onOpenBooking,
}) => {
  // Find the selected service or default to first
  const currentService: ServiceItem =
    SERVICES_DATA.find((s) => s.id === serviceId) || SERVICES_DATA[0];

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const renderServiceIcon = (iconName: string, className = 'w-6 h-6 text-blue-600') => {
    switch (iconName) {
      case 'Ear':
        return <Ear className={className} />;
      case 'Wind':
        return <Wind className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Smile':
        return <Smile className={className} />;
      case 'ShieldAlert':
        return <ShieldAlert className={className} />;
      case 'Compass':
        return <Compass className={className} />;
      case 'Moon':
        return <Moon className={className} />;
      default:
        return <Activity className={className} />;
    }
  };

  // Other services for the switcher
  const otherServices = SERVICES_DATA.filter((s) => s.id !== currentService.id);

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* ========================================================= */}
      {/* 1. BREADCRUMBS & TOP SUB-BAR                              */}
      {/* ========================================================= */}
      <div className="bg-white border-b border-slate-200 sticky top-16 sm:top-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 sm:gap-2 text-slate-500 font-medium">
            <button
              onClick={() => onNavigate('home')}
              id="breadcrumb-home-btn"
              className="hover:text-blue-600 transition-colors"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => onNavigate('services')}
              id="breadcrumb-services-btn"
              className="hover:text-blue-600 transition-colors"
            >
              Services
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-xs">
              {currentService.title}
            </span>
          </nav>

          <button
            onClick={() => onNavigate('services')}
            id="back-all-services-btn"
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All ENT Services</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. HERO SECTION FOR THIS SEPARATE SERVICE                 */}
      {/* ========================================================= */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/80 pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-100 mb-4">
              {renderServiceIcon(currentService.iconName, 'w-4 h-4 text-blue-600')}
              <span>{currentService.category} Specialization • Dr. Hasnain Haider</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {currentService.title} in Lahore
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              {currentService.shortDesc}
            </p>

            {/* Quick trust metrics */}
            <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Consultant ENT Surgeon Evaluation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Modern High-Definition Diagnostics</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Johar Town Clinic, Lahore</span>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. MAIN CONTENT GRID (CONTENT + SIDEBAR)                  */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Deep Clinical Details */}
          <div className="lg:col-span-8 space-y-10">
            {/* Clinical Overview */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
                <Stethoscope className="w-4 h-4" />
                <span>Clinical Overview & Scope</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Understanding {currentService.title}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {currentService.detailedOverview ||
                  `${currentService.title} requires precise otolaryngology assessment. Under the direct clinical supervision of Dr. Hasnain Haider, patients undergo systematic diagnostic evaluation to determine whether conservative medical management, office-based interventions, or minimally invasive surgical treatment is best suited to resolve symptoms permanently.`}
              </p>
              <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 text-xs sm:text-sm text-slate-700 flex items-start gap-3">
                <Award className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900">Expertise note: </span>
                  Dr. Hasnain Haider (MBBS, FCPS) brings over a decade of specialized surgical experience, ensuring treatments align with international ENT clinical guidelines.
                </div>
              </div>
            </div>

            {/* Symptoms & When To Consult */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary Symptoms */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span>Common Symptoms Reported</span>
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Patients commonly consult for the following manifestations:
                  </p>
                  <ul className="space-y-2.5">
                    {currentService.symptoms.map((symptom, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Red-Flag Urgent Warnings */}
              <div className="bg-red-50/40 rounded-2xl border border-red-200 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-red-900 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                    <span>When to Consult Urgently</span>
                  </h3>
                  <p className="text-xs text-red-700/90 mb-4">
                    Seek prompt consultation if you or your family member experience:
                  </p>
                  <ul className="space-y-2.5">
                    {currentService.whenToConsult.map((warning, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-red-900">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 mt-1.5"></span>
                        <span>{warning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Treatment Approaches & Procedures */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                  Evidence-Guided Care
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Treatment Modalities & Protocols
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Dr. Hasnain Haider emphasizes conservative and non-invasive approaches first, reserving surgical intervention for structural or chronic indications.
                </p>
              </div>

              <div className="space-y-3">
                {currentService.treatmentApproach.map((approach, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3.5 hover:bg-blue-50/40 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                      {approach}
                    </div>
                  </div>
                ))}
              </div>

              {/* Procedures Pill Tags */}
              {currentService.procedures && currentService.procedures.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                    Associated Clinical & Surgical Procedures:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentService.procedures.map((proc, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-xs flex items-center gap-1.5"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                        <span>{proc}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Diagnostic Process */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <span>What Happens During Your Consultation</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 1</span>
                  <h4 className="font-bold text-slate-900 text-sm">Detailed Clinical History</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Reviewing symptom duration, triggers, medication history, and impact on daily breathing, sleep, or hearing.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 2</span>
                  <h4 className="font-bold text-slate-900 text-sm">High-Definition Examination</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Visual examination using microscopic otoscopy or rigid/flexible video endoscopy to view tissues directly on high-res screens.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step 3</span>
                  <h4 className="font-bold text-slate-900 text-sm">Targeted Treatment Plan</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Clear explanation of diagnosis, transparent treatment choices, medication prescriptions, or scheduled minor procedure.
                  </p>
                </div>
              </div>
            </div>

            {/* Service-Specific FAQs */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Patient Questions</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Frequently Asked Questions About {currentService.title}
              </h3>

              <div className="space-y-3">
                {[
                  {
                    q: `How do I know if I need surgery or if medicine is sufficient for ${currentService.title.toLowerCase()}?`,
                    a: `In majority of cases, Dr. Hasnain Haider begins with conservative medical therapy, allergen controls, and targeted ear/nasal medications. Surgery is only advised when there is an anatomical defect (such as severe DNS or nasal polyps) or when chronic symptoms fail to respond to comprehensive medical care.`,
                  },
                  {
                    q: `How long does a consultation for ${currentService.title.toLowerCase()} take?`,
                    a: `A typical detailed consultation takes 15–20 minutes, including complete medical history, digital examination (otoscopy or nasal endoscopy if indicated), and in-depth discussion of your treatment roadmap.`,
                  },
                  {
                    q: `Can I schedule an evening appointment in Johar Town, Lahore?`,
                    a: `Yes, Dr. Hasnain Haider conducts evening clinic hours in Johar Town from 6:00 PM to 9:30 PM (Monday through Saturday). You can reserve your slot online or via direct phone call.`,
                  },
                ].map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full px-5 py-3.5 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          {faq.q}
                        </span>
                        <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600">
                          {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Booking Card & Service Switcher */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-36">
            {/* Consultation Booking Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-3">
                <img
                  src={DOCTOR_INFO.doctorImage}
                  alt={DOCTOR_INFO.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-600 shadow-xs shrink-0"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                    {DOCTOR_INFO.name}
                  </h4>
                  <p className="text-xs text-blue-600 font-semibold">{DOCTOR_INFO.degrees}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Consultant ENT Surgeon</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-3.5 space-y-2 text-xs text-slate-600 border border-slate-100">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span className="font-medium">{DOCTOR_INFO.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Mon – Sat: 6:00 PM – 9:30 PM</span>
                </div>
              </div>

              <button
                onClick={() => onOpenBooking(currentService.title)}
                id="sidebar-book-visit-btn"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Visit for {currentService.title}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={DOCTOR_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="sidebar-whatsapp-btn"
                  className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={DOCTOR_INFO.phoneTel}
                  id="sidebar-call-btn"
                  className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Direct</span>
                </a>
              </div>
            </div>

            {/* Other ENT Services Navigation / Switcher */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Explore Other ENT Services
              </h4>
              <p className="text-xs text-slate-500">
                Browse separate clinical service pages:
              </p>

              <div className="space-y-1.5">
                {SERVICES_DATA.map((srv) => {
                  const isCurrent = srv.id === currentService.id;
                  return (
                    <button
                      key={srv.id}
                      onClick={() => onNavigate('service-detail', srv.id)}
                      id={`sidebar-switch-${srv.id}`}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs transition-all flex items-center justify-between gap-2 ${
                        isCurrent
                          ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200 shadow-2xs'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        {renderServiceIcon(srv.iconName, `w-4 h-4 shrink-0 ${isCurrent ? 'text-blue-600' : 'text-slate-500'}`)}
                        <span className="truncate">{srv.title}</span>
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-blue-600' : 'text-slate-400'}`} />
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('services')}
                  id="sidebar-view-all-services"
                  className="w-full text-center text-xs font-bold text-blue-600 hover:underline pt-1"
                >
                  View All Services Directory →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
