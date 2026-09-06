import React, { useState } from 'react';
import { X, Calendar, User, Phone, Mail, MessageSquare, CheckCircle, MessageCircle } from 'lucide-react';
import { DOCTOR_INFO, SERVICES_DATA } from '../data/medicalData';
import { AppointmentFormData } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  defaultService = '',
}) => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    service: defaultService || SERVICES_DATA[0].title,
    preferredDate: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  if (!isOpen) return null;

  const buildWhatsAppText = (refCode: string) => {
    return (
      `*New ENT Consultation Request - Dr. Hasnain Haider*\n\n` +
      `*Reference Code:* ${refCode}\n` +
      `*Patient Name:* ${formData.fullName.trim() || 'Not provided'}\n` +
      `*Phone Number:* ${formData.phoneNumber.trim() || 'Not provided'}\n` +
      (formData.email ? `*Email:* ${formData.email.trim()}\n` : '') +
      `*Service Required:* ${formData.service}\n` +
      `*Preferred Date:* ${formData.preferredDate || 'Earliest available'}\n` +
      (formData.message ? `*Symptoms / Notes:* ${formData.message.trim()}\n\n` : '\n') +
      `*Clinic Address:* 24, 25, 26 Maulana Shaukat Ali Rd, Johar Town, Lahore\n` +
      `*Clinic Hours:* Mon – Sat: 8:00 AM – 9:30 PM`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = 'ENT-' + Math.floor(100000 + Math.random() * 900000);
    setReferenceCode(code);
    setSubmitted(true);

    const text = buildWhatsAppText(code);
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/923116712017?text=${encoded}`, '_blank');
  };

  const handleWhatsAppSubmit = () => {
    const currentCode = referenceCode || ('ENT-' + Math.floor(100000 + Math.random() * 900000));
    if (!referenceCode) setReferenceCode(currentCode);
    const text = buildWhatsAppText(currentCode);
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/923116712017?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative border-b border-slate-800">
          <button
            onClick={onClose}
            id="close-appointment-modal-btn"
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4" />
            <span>Consultation Booking</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Schedule Appointment with Dr. Hasnain Haider
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            ENT Specialist & Surgeon • 24 Maulana Shaukat Ali Rd, Johar Town, Lahore
          </p>
        </div>

        {/* Form Body or Success State */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle className="w-9 h-9" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">
                Appointment Request Received!
              </h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-800">{formData.fullName}</strong>. Your reference code is <span className="font-mono font-bold text-blue-600">{referenceCode}</span>. Our clinic coordinator will call or message your number ({formData.phoneNumber}) within 1 hour to finalize your appointment slot.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 text-left space-y-1.5">
                <p><strong>Doctor:</strong> Dr. Hasnain Haider (ENT Specialist)</p>
                <p><strong>Service:</strong> {formData.service}</p>
                <p><strong>Location:</strong> Johar Town, Lahore</p>
                <p><strong>Timings:</strong> 8:00 AM – 9:30 PM (Mon – Sat, Sun Closed)</p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleWhatsAppSubmit}
                  id="modal-confirm-whatsapp-btn"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send to WhatsApp Now</span>
                </button>
                <button
                  onClick={onClose}
                  id="modal-done-btn"
                  className="py-2.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-sm font-semibold transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    id="modal-input-name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Muhammad Ali"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Phone Number (WhatsApp) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      id="modal-input-phone"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      placeholder="03XX XXXXXXX"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      id="modal-input-email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Select ENT Service *
                </label>
                <select
                  value={formData.service}
                  id="modal-select-service"
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                >
                  {SERVICES_DATA.map((srv) => (
                    <option key={srv.id} value={srv.title}>
                      {srv.title}
                    </option>
                  ))}
                  <option value="General ENT Consultation">General ENT Consultation</option>
                  <option value="Surgical Second Opinion">Surgical Second Opinion (DNS / FESS)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Preferred Consultation Date <span className="text-slate-400 font-normal lowercase">(optional)</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="date"
                    id="modal-input-date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Describe Symptoms or Problem
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <textarea
                    rows={2}
                    id="modal-input-message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. Ear pain for 3 days, difficulty breathing through nose..."
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  ></textarea>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  id="modal-submit-request-btn"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Book Appointment via WhatsApp ({DOCTOR_INFO.phone})</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-500 mt-1">
                🔒 Patient privacy guaranteed. Clinic address: 24, 25, 26 Maulana Shaukat Ali Rd, Johar Town, Lahore.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
