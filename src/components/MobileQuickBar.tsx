import React from 'react';
import { Phone, Calendar, MessageCircle } from 'lucide-react';
import { DOCTOR_INFO } from '../data/medicalData';

interface MobileQuickBarProps {
  onOpenBooking: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 shadow-2xl p-2 px-3 sm:hidden">
      <div className="grid grid-cols-3 gap-2">
        <a
          href={DOCTOR_INFO.phoneTel}
          id="mobile-quick-call"
          className="flex flex-col items-center justify-center py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
        >
          <Phone className="w-4 h-4 text-blue-600 mb-0.5" />
          <span>Call Doctor</span>
        </a>

        <a
          href={DOCTOR_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="mobile-quick-whatsapp"
          className="flex flex-col items-center justify-center py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onOpenBooking}
          id="mobile-quick-book"
          className="flex flex-col items-center justify-center py-1.5 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs active:scale-95 transition-colors"
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span>Book Visit</span>
        </button>
      </div>
    </div>
  );
};
