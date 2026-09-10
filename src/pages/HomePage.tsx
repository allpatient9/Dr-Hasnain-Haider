import React, { useState } from 'react';
import {
  Calendar,
  Phone,
  MessageCircle,
  ShieldCheck,
  Award,
  Stethoscope,
  HeartHandshake,
  UserCheck,
  Activity,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Star,
  Sparkles,
  Ear,
  Volume2,
  Wind,
  Smile,
  Flame,
  Moon,
  Compass,
  AlertCircle,
  ShieldAlert,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Camera,
  UploadCloud,
  Check,
} from 'lucide-react';
import {
  DOCTOR_INFO,
  WHY_CHOOSE_ITEMS,
  ENT_PROBLEMS,
  SERVICES_DATA,
  PATIENT_REVIEWS,
  CLINIC_LOCATIONS,
  FAQS,
} from '../data/medicalData';
import { PageType } from '../types';

interface HomePageProps {
  onNavigate: (page: PageType, serviceId?: string) => void;
  onOpenBooking: (serviceName?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenBooking }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [doctorImg, setDoctorImg] = useState<string>(DOCTOR_INFO.doctorImage);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string>('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setDoctorImg(dataUrl);
        setUploadSuccess(true);
        setSyncMessage('Photo updated in preview');

        // Persist and synchronize to server backend
        try {
          const res = await fetch('/api/upload-doctor-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dataUrl }),
          });
          const data = await res.json();
          if (data.success) {
            setSyncMessage('Synced & saved to server files');
          }
        } catch (err) {
          console.log('Hostinger static mode note:', err);
        }

        setTimeout(() => {
          setUploadSuccess(false);
          setSyncMessage('');
        }, 4000);
      }
    };
    reader.readAsDataURL(file);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  // Map icon strings to Lucide components
  const renderProblemIcon = (iconName: string) => {
    switch (iconName) {
      case 'Ear': return <Ear className="w-5 h-5 text-blue-600" />;
      case 'Volume2': return <Volume2 className="w-5 h-5 text-blue-600" />;
      case 'Wind': return <Wind className="w-5 h-5 text-teal-600" />;
      case 'Flame': return <Flame className="w-5 h-5 text-amber-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-purple-600" />;
      case 'Smile': return <Smile className="w-5 h-5 text-emerald-600" />;
      case 'AlertCircle': return <AlertCircle className="w-5 h-5 text-rose-500" />;
      case 'Moon': return <Moon className="w-5 h-5 text-indigo-600" />;
      case 'Compass': return <Compass className="w-5 h-5 text-purple-600" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-blue-600" />;
      default: return <Stethoscope className="w-5 h-5 text-blue-600" />;
    }
  };

  const renderWhyChooseIcon = (icon: string) => {
    switch (icon) {
      case 'Award': return <Award className="w-5 h-5 text-blue-600" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-blue-600" />;
      case 'Stethoscope': return <Stethoscope className="w-5 h-5 text-blue-600" />;
      case 'UserCheck': return <UserCheck className="w-5 h-5 text-blue-600" />;
      case 'Activity': return <Activity className="w-5 h-5 text-blue-600" />;
      default: return <CheckCircle2 className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* ========================================================= */}
      {/* HERO SECTION - Neat, Clean, and Simple (Matching Reference)*/}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f7fbff] via-white to-white pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 lg:gap-12 items-center">
            {/* Left Content (Cols 1-7) */}
            <div className="md:col-span-7 space-y-6 text-left">
              {/* Trust Badge with 5 Stars */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ebf3ff] text-blue-600 text-xs font-bold tracking-wide w-fit">
                <div className="flex items-center gap-0.5 text-blue-600">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-blue-600 text-blue-600" />
                  ))}
                </div>
                <span className="uppercase text-[11px] font-extrabold tracking-wider ml-1">
                  BEST ENT SPECIALIST IN LAHORE
                </span>
              </div>

              {/* Large High-Contrast Display Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-[3.5rem] font-extrabold text-slate-950 tracking-tight leading-[1.12]">
                Best <span className="text-blue-600">ENT Specialist</span> in Lahore
              </h1>

              {/* Subheading Body Text */}
              <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl">
                Professional <strong className="text-slate-900 font-bold">ENT Specialist in Lahore</strong> offering premium medical care with 9+ years of experience. Finding a trusted, highly accurate <strong className="text-slate-900 font-bold">ENT specialist near me</strong> is now simple and comfortable in Johar Town, Lahore.
              </p>

              {/* Action Buttons: Book Appointment & WhatsApp (Adjusted to single line on mobile) */}
              <div className="grid grid-cols-2 gap-2.5 sm:flex sm:items-center sm:gap-4 pt-1 w-full max-w-sm sm:max-w-none">
                <button
                  onClick={() => onOpenBooking()}
                  id="hero-book-appointment-btn"
                  className="w-full sm:w-auto px-3 sm:px-7 py-3 sm:py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-xs transition-all active:scale-95 text-xs sm:text-base flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap"
                >
                  <span>Book Appointment</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                </button>

                <a
                  href={DOCTOR_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-whatsapp-btn"
                  className="w-full sm:w-auto px-3 sm:px-7 py-3 sm:py-3.5 bg-white hover:bg-slate-50 text-slate-900 font-bold rounded-xl border border-slate-200 shadow-2xs transition-colors text-xs sm:text-base flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap"
                >
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 fill-emerald-50 shrink-0" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Clean Metric Stats Row (Desktop only, moved to lower side of doctor image on mobile) */}
              <div className="hidden md:flex items-center gap-6 sm:gap-10 lg:gap-12 pt-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">9+</div>
                  <div className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">Years Exp</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">10k+</div>
                  <div className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">Patients Treated</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">100%</div>
                  <div className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">PMC Verified</div>
                </div>
              </div>
            </div>

            {/* Right Column: Doctor Portrait in Smooth Rounded Frame with Floating Badge */}
            <div className="md:col-span-5 relative w-full flex flex-col items-center md:items-end">
              <div className="relative w-full max-w-sm sm:max-w-md md:max-w-none mb-2 md:mb-0">
                {/* Doctor Portrait Frame */}
                <div
                  className={`relative rounded-[2.25rem] sm:rounded-[2.75rem] overflow-hidden bg-slate-200/70 border-2 transition-all duration-200 shadow-xl shadow-slate-200/50 aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4] group ${
                    isDraggingOver ? 'border-dashed border-blue-600 ring-4 ring-blue-400/30' : 'border-slate-200/80'
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingOver(true);
                  }}
                  onDragLeave={() => setIsDraggingOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDraggingOver(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handlePhotoUpload(e.dataTransfer.files[0]);
                    }
                  }}
                >
                  <img
                    src={doctorImg}
                    onError={() => {
                      if (doctorImg !== DOCTOR_INFO.doctorImage) {
                        setDoctorImg(DOCTOR_INFO.doctorImage);
                      }
                    }}
                    alt="Dr. Hasnain Haider - Best ENT Specialist in Lahore"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />

                  {/* Hidden native file input for zero-friction upload */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handlePhotoUpload(e.target.files[0]);
                      }
                    }}
                  />

                  {/* Direct Update Photo Action Button */}
                  <div className="absolute top-3.5 right-3.5 z-20 flex flex-col items-end gap-1">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      type="button"
                      title="Click to select and upload Dr. Hasnain Haider's original photo directly"
                      aria-label="Upload actual photograph of Dr. Hasnain Haider"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950/80 hover:bg-blue-600 text-white rounded-full text-xs font-semibold backdrop-blur-md shadow-lg transition-colors border border-white/20 cursor-pointer"
                    >
                      {uploadSuccess ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{syncMessage || 'Photo Updated'}</span>
                        </>
                      ) : (
                        <>
                          <Camera className="w-3.5 h-3.5 text-white" />
                          <span>Update Photo</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Visual Dropzone state when dragging file over image */}
                  {isDraggingOver && (
                    <div className="absolute inset-0 bg-blue-600/80 backdrop-blur-xs flex flex-col items-center justify-center text-white z-30 p-4 text-center">
                      <UploadCloud className="w-10 h-10 mb-2 animate-bounce" />
                      <p className="font-bold text-sm">Drop your photo here</p>
                      <p className="text-xs opacity-90 mt-1">Upload Dr. Hasnain Haider photo directly</p>
                    </div>
                  )}
                </div>

                {/* Floating Doctor Profile Card at Bottom Right */}
                <div className="absolute -bottom-3 right-2 sm:bottom-5 sm:right-5 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 lg:p-5 rounded-2xl shadow-xl border border-slate-100 min-w-[200px] sm:min-w-[220px] text-left z-10">
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                    {DOCTOR_INFO.name}
                  </h4>
                  <p className="text-xs font-bold text-blue-600 mt-0.5">
                    ENT Specialist & Surgeon
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                    {DOCTOR_INFO.degrees}
                  </p>
                </div>
              </div>

              {/* Clean Metric Stats Row (Mobile view: adjusted to lower side of the doctor image) */}
              <div className="flex md:hidden items-center justify-between w-full max-w-sm sm:max-w-md pt-7 mt-6 px-4 border-t border-slate-200/80">
                <div className="text-center flex-1">
                  <div className="text-2xl font-extrabold text-slate-950 tracking-tight">9+</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Years Exp</div>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div className="text-center flex-1">
                  <div className="text-2xl font-extrabold text-slate-950 tracking-tight">10k+</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Patients Treated</div>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div className="text-center flex-1">
                  <div className="text-2xl font-extrabold text-slate-950 tracking-tight">100%</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">PMC Verified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 1. WHY CHOOSE DR. HASNAIN HAIDER                          */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-100">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Excellence in Otolaryngology</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose Dr. Hasnain Haider
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Committed to providing world-class, ethical, and gentle ear, nose, and throat treatments with advanced diagnostic technology in Lahore.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
                {renderWhyChooseIcon(item.icon)}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. ENT PROBLEMS TREATED (Cards)                           */}
      {/* ========================================================= */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
              Specialized Diagnoses
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              ENT Problems Treated by Dr. Hasnain Haider
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              From acute earaches to complex chronic sinus and nasal obstructions, find targeted medical relief and surgical correction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {ENT_PROBLEMS.map((problem) => (
              <div
                key={problem.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                    {renderProblemIcon(problem.iconName)}
                  </div>
                  <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-1">
                    {problem.category}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3">
                    {problem.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 mt-auto">
                  <span className="text-[11px] text-slate-500 block">
                    <strong className="text-slate-700">Signs:</strong> {problem.commonSigns}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. FEATURED SERVICES SECTION                              */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              Clinical Specializations
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              ENT Services
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              Advanced otolaryngology diagnostic and surgical procedures performed using modern medical protocols.
            </p>
          </div>

          <button
            onClick={() => onNavigate('services')}
            id="view-all-services-btn"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>View All Detailed Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.slice(0, 6).map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    {renderProblemIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
                    {service.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                  {service.shortDesc}
                </p>

                <div className="space-y-1.5 mb-4">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Common Key Treatments:
                  </div>
                  {service.treatmentApproach.slice(0, 3).map((treat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{treat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('service-detail', service.id)}
                  id={`home-service-detail-${service.id}`}
                  className="text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors inline-flex items-center gap-1"
                >
                  <span>View Dedicated Service Page</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. PATIENT TRUST SECTION                                  */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
            Patient Trust & Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Patients Feedback
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Read authentic feedback from patients who recovered from chronic sinus issues, ear pain, and breathing obstacles under Dr. Hasnain Haider's care.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PATIENT_REVIEWS.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <div className="text-xs font-bold text-blue-600 mb-1.5">
                  {rev.condition}
                </div>
                <p className="text-sm text-slate-600 italic leading-relaxed mb-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{rev.patientName}</div>
                  <div className="text-slate-500">{rev.location}</div>
                </div>
                <div className="inline-flex items-center gap-1 text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. FAQS SECTION                                           */}
      {/* ========================================================= */}
      <section className="bg-slate-50 py-16 sm:py-20 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider border border-blue-100">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl mx-auto">
              Get answers to common questions about ear, nose, and throat conditions, treatments, and appointments with Dr. Hasnain Haider.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    id={`home-faq-btn-${idx}`}
                    className="w-full px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base pr-2">
                      {faq.question}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600">
                      {isOpen ? <ChevronUp className="w-4 h-4 text-blue-600" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
