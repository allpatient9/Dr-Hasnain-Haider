import React, { useState } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Calendar,
  CheckCircle,
  ExternalLink,
  User,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { DOCTOR_INFO, SERVICES_DATA } from '../data/medicalData';
import { PageType, AppointmentFormData } from '../types';

interface ContactPageProps {
  onNavigate: (page: PageType) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate: _onNavigate }) => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    service: SERVICES_DATA[0].title,
    preferredDate: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  // Get today's date formatted as YYYY-MM-DD for min date
  const todayString = new Date().toISOString().split('T')[0];

  const buildWhatsAppMessage = (refId: string) => {
    return (
      `*New Appointment Request - Dr. Hasnain Haider ENT Clinic*\n\n` +
      `*Reference Code:* ${refId}\n` +
      `*Patient Name:* ${formData.fullName.trim() || 'Not provided'}\n` +
      `*Phone Number:* ${formData.phoneNumber.trim() || 'Not provided'}\n` +
      (formData.email ? `*Email:* ${formData.email.trim()}\n` : '') +
      `*Service Required:* ${formData.service}\n` +
      `*Preferred Date:* ${formData.preferredDate || 'Earliest Available'}\n` +
      (formData.message ? `*Symptoms / Notes:* ${formData.message.trim()}\n\n` : '\n') +
      `*Clinic Address:* 24, 25, 26 Maulana Shaukat Ali Rd, Johar Town, Lahore\n` +
      `*Consultation Hours:* Mon – Sat: 8:00 AM – 9:30 PM`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = 'ENT-' + Math.floor(100000 + Math.random() * 900000);
    setReferenceId(id);
    setIsSubmitted(true);

    const messageText = buildWhatsAppMessage(id);
    const encoded = encodeURIComponent(messageText);
    window.open(`https://wa.me/923116712017?text=${encoded}`, '_blank');
  };

  const handleWhatsAppBooking = () => {
    const currentId = referenceId || ('ENT-' + Math.floor(100000 + Math.random() * 900000));
    if (!referenceId) setReferenceId(currentId);
    const messageText = buildWhatsAppMessage(currentId);
    const encoded = encodeURIComponent(messageText);
    window.open(`https://wa.me/923116712017?text=${encoded}`, '_blank');
  };

  return (
    <div className="py-8 space-y-10">
      {/* 1. Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Contact Us & Book an Appointment
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Book an in-person consultation with <strong className="text-slate-800">Dr. Hasnain Haider</strong> or contact our clinic directly via phone or WhatsApp.
        </p>
      </section>

      {/* 2. Quick Contact Bar (Phone, WhatsApp, Location, Timings) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Phone */}
          <a
            href={DOCTOR_INFO.phoneTel}
            id="contact-quick-call"
            className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all group flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3.5"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Call Directly</span>
              <span className="text-xs sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors block mt-0.5 truncate">
                {DOCTOR_INFO.phone}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 block truncate">Tap to call clinic</span>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href={DOCTOR_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="contact-quick-whatsapp"
            className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-xs transition-all group flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3.5"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block">WhatsApp Chat</span>
              <span className="text-xs sm:text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors block mt-0.5 truncate">
                0311 6712017
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 block truncate">Instant chat & booking</span>
            </div>
          </a>

          {/* Clinic Hours */}
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3.5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Clinic Hours</span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 block mt-0.5 truncate">
                8:00 AM – 9:30 PM
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 block truncate">Mon – Sat (Sun Closed)</span>
            </div>
          </div>

          {/* Location */}
          <a
            href={DOCTOR_INFO.googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            id="contact-quick-map"
            className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all group flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3.5"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Johar Town Clinic</span>
              <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors block mt-0.5 truncate">
                Maulana Shaukat Ali Rd
              </span>
              <span className="text-[10px] sm:text-xs text-blue-600 font-medium inline-flex items-center gap-1 mt-0.5">
                <span>Google Maps</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* 3. Main Grid: Appointment Booking Form (Left) & Clinic Location/Map (Right) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Appointment Booking Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
                <Calendar className="w-4 h-4" />
                <span>Appointment Form</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Schedule Your ENT Consultation
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Fill in the details below to request your slot. We will confirm your appointment promptly.
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Appointment Request Received!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-800">{formData.fullName}</strong>. Your consultation reference is{' '}
                  <span className="font-mono font-bold text-blue-600">{referenceId}</span>. Our clinic staff will contact{' '}
                  <span className="font-semibold text-slate-800">{formData.phoneNumber}</span> to confirm your time slot.
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 text-left max-w-md mx-auto space-y-1.5">
                  <div className="flex justify-between border-b border-slate-200/60 pb-1">
                    <span className="text-slate-500">Doctor:</span>
                    <span className="font-semibold text-slate-900">Dr. Hasnain Haider</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1">
                    <span className="text-slate-500">Service:</span>
                    <span className="font-semibold text-slate-900">{formData.service}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1">
                    <span className="text-slate-500">Requested Date:</span>
                    <span className="font-semibold text-slate-900">{formData.preferredDate || 'Earliest available'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Clinic Contact:</span>
                    <span className="font-semibold text-emerald-700">0311 6712017 (WhatsApp)</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={handleWhatsAppBooking}
                    id="contact-whatsapp-confirm-btn"
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open in WhatsApp</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        phoneNumber: '',
                        email: '',
                        service: SERVICES_DATA[0].title,
                        preferredDate: '',
                        message: '',
                      });
                    }}
                    className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs sm:text-sm font-semibold transition-colors"
                  >
                    Book Another Slot
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        id="appointment-form-name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Muhammad Ali"
                        className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        id="appointment-form-phone"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        placeholder="03XX XXXXXXX"
                        className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Selection */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Select ENT Service / Concern *
                  </label>
                  <select
                    id="appointment-form-service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
                  >
                    {SERVICES_DATA.map((srv) => (
                      <option key={srv.id} value={srv.title}>
                        {srv.title}
                      </option>
                    ))}
                    <option value="General ENT Consultation">General ENT Consultation</option>
                    <option value="Second Opinion for ENT Surgery">Second Opinion for ENT Surgery</option>
                  </select>
                </div>

                {/* Preferred Date */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Preferred Consultation Date <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      id="appointment-form-date"
                      min={todayString}
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>

                {/* Symptoms / Notes */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Symptoms or Brief Note <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <textarea
                      rows={3}
                      id="appointment-form-message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe what you are experiencing (e.g., ear pain for 3 days, blocked nose, recurring tonsil ache)..."
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    ></textarea>
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="pt-2">
                  <button
                    type="submit"
                    id="appointment-form-submit-btn"
                    className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm sm:text-base shadow-sm hover:shadow transition-all active:scale-98"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Book Appointment via WhatsApp (0311 6712017)</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Your request will open directly on WhatsApp with Dr. Hasnain Haider's clinic desk.</span>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT: Clinic Details & Clean Google Map (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Clinic Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div>
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                  Doctor & Clinic Details
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  Dr. Hasnain Haider
                </h3>
                <p className="text-xs text-slate-600">
                  ENT Specialist & Surgeon • MBBS, FCPS (Oto-Rhino-Laryngology)
                </p>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Address:</strong>
                    <span>{DOCTOR_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Phone:</strong>
                    <a href={DOCTOR_INFO.phoneTel} className="text-blue-600 hover:underline font-semibold">
                      {DOCTOR_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Consultation Hours:</strong>
                    <span>Monday to Saturday: 8:00 AM – 9:30 PM</span>
                    <span className="block text-slate-500 text-[11px]">Sunday: Closed</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={DOCTOR_INFO.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-open-google-maps-btn"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>Open Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-sm overflow-hidden">
              <div className="relative w-full h-72 rounded-xl overflow-hidden bg-slate-100">
                <iframe
                  title="Dr. Hasnain Haider ENT Clinic Johar Town Lahore Map"
                  src={DOCTOR_INFO.googleMapsEmbed}
                  className="w-full h-full border-0"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};

