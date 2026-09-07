import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Heart,
  ShieldCheck,
  Calendar,
  Phone,
  HelpCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { DOCTOR_INFO, FAQS, WHY_CHOOSE_ITEMS } from '../data/medicalData';
import { PageType } from '../types';

interface AboutPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenBooking }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [doctorImg, setDoctorImg] = useState<string>(() => {
    return localStorage.getItem('dr_hasnain_haider_custom_photo') || DOCTOR_INFO.doctorImage;
  });

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const qualifications = [
    {
      degree: 'FCPS (Oto-Rhino-Laryngology)',
      institution: 'College of Physicians and Surgeons Pakistan (CPSP)',
      detail: 'Fellowship specialization in Ear, Nose, Throat, Head & Neck Surgery',
      year: 'Postgraduate Fellowship',
    },
    {
      degree: 'MBBS (Bachelor of Medicine, Bachelor of Surgery)',
      institution: 'Top Medical University of Pakistan',
      detail: 'Registered Medical Practitioner with comprehensive clinical honors',
      year: 'Medical Degree',
    },
    {
      degree: 'Advanced Training in Functional Endoscopic Sinus Surgery (FESS)',
      institution: 'Specialized Rhinology Center',
      detail: 'High-definition micro-endoscopic clearance of complex chronic sinus diseases',
      year: 'Sub-specialty Certification',
    },
    {
      degree: 'PMC & PMDC Verified Specialist Registration',
      institution: 'Pakistan Medical & Dental Council',
      detail: 'Active license to practice otolaryngology and surgical procedures',
      year: 'Official Medical Verification',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-8">
      {/* ========================================================= */}
      {/* 1. DOCTOR INTRODUCTION HERO                               */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl text-white p-8 sm:p-12 lg:p-16 border border-slate-800 relative overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Introduction Text (Left) */}
            <div className="lg:col-span-7 space-y-6 text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                <ShieldCheck className="w-4 h-4" />
                <span>Consultant ENT Surgeon Profile</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Dr. Hasnain Haider
              </h1>

              <p className="text-blue-200 font-medium text-base sm:text-lg">
                MBBS, FCPS (Oto-Rhino-Laryngology) • ENT Specialist & ENT Surgeon
              </p>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  <strong>Dr. Hasnain Haider</strong> is widely regarded as one of the best ENT Specialists and ENT Surgeons in Lahore, dedicated to providing advanced medical diagnosis and precise surgical solutions for disorders of the ear, nose, throat, sinuses, hearing, and balance.
                </p>
                <p>
                  With over 9 years of clinical excellence, Dr. Hasnain combines gentle, compassionate patient care with modern international medical protocols. Whether managing an uncomfortable ear infection, diagnosing complex sinus headaches, performing delicate microscopic eardrum repairs, or correcting a deviated nasal septum, his focus is always on restoring your health, comfort, and quality of life.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={onOpenBooking}
                  id="about-hero-book-btn"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all shadow-md active:scale-95"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation With Dr. Hasnain</span>
                </button>

                <a
                  href={DOCTOR_INFO.phoneTel}
                  id="about-hero-call-btn"
                  className="inline-flex items-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-sm transition-colors border border-white/20"
                >
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>Call: {DOCTOR_INFO.phone}</span>
                </a>
              </div>
            </div>

            {/* Doctor Portrait (Right Side of the Hero) */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="relative mx-auto max-w-sm rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-500/30 bg-slate-800">
                <img
                  src={doctorImg}
                  onError={() => {
                    if (doctorImg !== '/images/Dr. Hasnain Haider ENT Specialist.jpg') {
                      setDoctorImg('/images/Dr. Hasnain Haider ENT Specialist.jpg');
                    }
                  }}
                  alt="Dr. Hasnain Haider ENT Specialist in Lahore"
                  className="w-full aspect-[3/4] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4 bg-slate-950/90 border-t border-slate-700/80">
                  <div className="font-bold text-lg text-white">{DOCTOR_INFO.name}</div>
                  <div className="text-xs text-blue-400 font-semibold">{DOCTOR_INFO.degrees}</div>
                  <div className="text-xs text-slate-400 mt-1">{DOCTOR_INFO.title} • Lahore</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. EDUCATION & QUALIFICATIONS                             */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Academic & Clinical Credentials
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Education & Qualifications
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Rigorous postgraduate medical training and continuous international surgical updates in Otolaryngology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {qualifications.map((q, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                  {q.year}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                  {q.degree}
                </h3>
                <p className="text-xs font-semibold text-slate-700 mb-1">
                  {q.institution}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {q.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. MEDICAL PHILOSOPHY & PATIENT CARE APPROACH             */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider border border-blue-100">
              <Heart className="w-3.5 h-3.5" />
              <span>Compassionate Medicine</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Medical Philosophy & Patient Care Approach
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                <strong>Ethical & Conservative First:</strong> Dr. Hasnain Haider firmly believes in an ethical, conservative treatment philosophy. Surgery is never the first option unless clinically required. Exhaustive medical management, lifestyle optimization, and targeted therapies are prioritized whenever safe and beneficial.
              </p>
              <p>
                <strong>Transparent Patient Communication:</strong> During every clinic visit, patients are shown high-resolution endoscopic imaging on screen so they clearly understand what is happening inside their ear, nasal cavity, or throat. Decisions are made collaboratively with patients and their families.
              </p>
              <p>
                <strong>Gentle, Pain-Free Techniques:</strong> Using delicate micro-instruments, gentle ear suction, and modern local anesthesia methods, every clinical procedure is performed with utmost gentleness, especially for anxious adults and children.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-100 flex-1">
                <div className="text-sm font-bold text-blue-900 mb-1">
                  100% Honest Guidance
                </div>
                <div className="text-xs text-blue-800">
                  No unnecessary tests, procedures, or prescriptions. Pure evidence-based otolaryngology.
                </div>
              </div>

              <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 flex-1">
                <div className="text-sm font-bold text-slate-900 mb-1">
                  Post-Care Follow-up
                </div>
                <div className="text-xs text-slate-700">
                  Continuous guidance during post-operative healing and long-term allergy prevention.
                </div>
              </div>
            </div>
          </div>

          {/* Clinical Experience Metrics Card */}
          <div className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span>Clinical Experience Summary</span>
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-extrabold text-blue-400">9+ Years</div>
                  <div className="text-xs text-slate-300">Dedicated ENT Clinical Practice</div>
                </div>
                <Clock className="w-8 h-8 text-blue-400/50" />
              </div>

              <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-extrabold text-blue-400">4,500+</div>
                  <div className="text-xs text-slate-300">Successful ENT & Sinus Surgeries</div>
                </div>
                <Award className="w-8 h-8 text-blue-400/50" />
              </div>

              <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-extrabold text-blue-400">15,000+</div>
                  <div className="text-xs text-slate-300">Patients Treated Across Punjab</div>
                </div>
                <Heart className="w-8 h-8 text-blue-400/50" />
              </div>
            </div>

            <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 leading-relaxed">
              📍 <strong>Johar Town Clinic:</strong> 24, 25, 26 Maulana Shaukat Ali Rd, Block A Phase 1 Johar Town, Lahore. Timings: 5:00 PM – 9:00 PM (Monday – Saturday).
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. "WHY PATIENTS CHOOSE DR. HASNAIN HAIDER"               */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Patient Confidence
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Why Patients Choose Dr. Hasnain Haider
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Patients and families travel from all sectors of Lahore and surrounding cities because of our clinical precision and reassuring bedside manner.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-3">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-blue-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Patient Standard</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. FAQ SECTION                                            */}
      {/* ========================================================= */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider border border-blue-100">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Patient Questions & Medical FAQs
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Clear medical answers regarding ENT specialists, symptoms, and consultation guidelines in Lahore.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    id={`faq-btn-${idx}`}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      {faq.question}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. BOTTOM CTA                                             */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 border border-slate-800">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Schedule Your Visit with Dr. Hasnain Haider
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Providing expert ENT diagnoses and surgical care at 24, 25, 26 Maulana Shaukat Ali Rd, Block A Phase 1 Johar Town, Lahore, 54782.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all shadow-md active:scale-95"
            >
              Book Clinic Appointment
            </button>
            <a
              href={DOCTOR_INFO.phoneTel}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm border border-slate-700 transition-colors"
            >
              Call: {DOCTOR_INFO.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
